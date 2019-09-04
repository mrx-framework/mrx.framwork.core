const { Model } = require("sequelize")

module.exports = class Form extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      name: {
        singular: "form",
        plural: "forms"
      },
      sequelize,
      underscored: true,
      modelName: "form",
    })
  }

  static associate ({ FormField, FormData }) {
    this.hasMany(FormField)
    this.hasMany(FormData)
  }
}
