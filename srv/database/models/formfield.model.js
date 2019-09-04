const { Model } = require("sequelize")

module.exports = class FormField extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      label: {
        type: DataTypes.STRING,
        allowNull: false
      },
      inputType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hint: {
        type: DataTypes.STRING
      },
      required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      name: {
        singular: "formfield",
        plural: "formfields"
      },
      sequelize,
      underscored: true,
      modelName: "formfield",
    })
  }

  static associate ({ Form }) {
    this.belongsTo(Form)
  }
}
