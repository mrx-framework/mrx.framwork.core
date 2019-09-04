const { Model } = require("sequelize")

module.exports = class NavLocation extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      name: {
        singular: "navlocation",
        plural: "navlocations"
      },
      sequelize,
      underscored: true,
      modelName: "navlocation"
    })
  }

  static associate ({ Navigation }) {
    this.hasMany(Navigation)
  }
}
