const { Model } = require("sequelize")
const uuidv4 = require("uuid/v4")

module.exports = class BlogPost extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT
      },
      version: {
        type: DataTypes.DOUBLE(5,3)
      },
      uuid: {
        type: DataTypes.STRING
      },
      publishingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      isDraft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isPublished: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return !this.get("isDraft") && this.get("publishingDate") <= Date.now()
        }
      }
    }, {
      name: {
        singular: "blogpost",
        plural: "blogposts"
      },
      sequelize,
      underscored: true,
      modelName: "blogpost",
      hooks: {
        beforeCreate: async (blogpost) =>  {
          const { uuid } = blogpost

          if (uuid) {
            const lastVersion = await this.findOne({
              where: {
                uuid
              },
              attributes: ["version"],
              order: [["updatedAt", "DESC"]],
              raw: true
            })
            if (lastVersion) {
              const { version } = lastVersion
              /* eslint-disable-next-line */
              blogpost.version = blogpost.isDraft ?
                (version + .1) :
                Math.floor(version + 1)
            }
          }
          else {
            blogpost.uuid = uuidv4()
            blogpost.version = 1
          }
        }
      },
      scopes: {
        isPublished: {
          where: {
            isPublished: true
          }
        }
      }
    })
  }

  static associate ({ BlogCategory, User, Tag }) {
    this.belongsTo(BlogCategory)
    this.belongsTo(User)
    this.belongsToMany(Tag, {
      through: "blog_tags"
    })
  }
}
