const { Model } = require("sequelize")

module.exports = class FormData extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      data: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },{
      name: {
        singular: "formdata",
        plural: "formdatas"
      },
      sequelize,
      underscored: true,
      modelName: "formdata",
    })
  }

  static associate ({ Form }) {
    this.belongsTo(Form)
  }

}
