const { Model } = require("sequelize")

module.exports = class Navigation extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      text: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
      path: {
        type: DataTypes.STRING
      },
      icon: {
        type: DataTypes.STRING,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      name: {
        singular: "navigation",
        plural: "navigations"
      },
      sequelize,
      underscored: true,
      modelName: "navigation"
    })
  }

  static associate ({ Navigation, Page, NavLocation }) {
    this.hasMany(Navigation, {
      as: "childs"
    })

    this.belongsTo(NavLocation)

    this.belongsTo(Page)
  }
}
