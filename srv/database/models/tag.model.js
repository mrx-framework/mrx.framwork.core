const { Model } = require("sequelize")

module.exports = class Tag extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      name: {
        singular: "tag",
        plural: "tags"
      },
      sequelize,
      underscored: true,
      modelName: "tag"
    })
  }

  static associate ({ BlogPost }) {
    this.belongsToMany(BlogPost , {
      through: "blog_tags"
    })
  }
}
