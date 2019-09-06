const { Model } = require("sequelize")
const uuidv4 = require("uuid/v4")


module.exports = class Page extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      component: {
        type: DataTypes.STRING
      },
      layout: {
        type: DataTypes.STRING
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
      },
      isStatic: {
        type: DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["component"]),
        get: function () {
          return !!this.get("component")
        }
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      name: {
        singular: "page",
        plural: "pages"
      },
      sequelize,
      underscored: true,
      modelName: "page",
      hooks: {
        beforeCreate: async (page) =>  {
          const { uuid } = page

          if (uuid) {
            const lastVersion = await this.findOne({
              where: {
                uuid
              },
              attributes: ["version", "authorId"],
              order: [["updatedAt", "DESC"]],
              raw: true
            })
            if (lastVersion) {
              const { version } = lastVersion
              /* eslint-disable-next-line */
              page.version = page.isDraft ?
                (version + .1) :
                Math.floor(version + 1)

                page.authorId = lastVersion.authorId
            }
          }
          else {
            page.uuid = uuidv4()
            page.version = 1
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

  static associate ({ Navigation, User, Component }) {
    this.hasMany(Navigation, {
      as: "navigations",
      allowNull: true,
      defaultValue: null
    })
    this.belongsTo(User, {
      as: "author"
    })
    this.belongsTo(User, {
      as: "editor"
    })

    this.hasMany(Component)
  }
}
