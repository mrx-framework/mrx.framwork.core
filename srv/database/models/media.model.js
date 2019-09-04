const { Model, UUIDV4 } = require("sequelize")

module.exports = class Media extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      originalWidth: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      originalHeight: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      originalSize: {
        type: DataTypes.BIGINT,
        defaultValue: null
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4
      },
      orientation: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return this.get("originalWidth") > this.get("originalHeight") ?
            "landscape" : "portrait"
        }
      }
    }, {
      name: {
        singular: "media",
        plural: "medias"
      },
      sequelize,
      underscored: true,
      modelName: "media",

    })
  }
}
