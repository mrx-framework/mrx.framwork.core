const { Model } = require("sequelize")

module.exports = class BlogCategory extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      name: {
        singular: "blogcategory",
        plural: "blogcategories"
      },
      sequelize,
      underscored: true,
      modelName: "blogcategory"
    })
  }

  static associate ({ BlogPost }) {
    this.hasMany(BlogPost)
  }
}
