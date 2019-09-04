const { Model } = require('sequelize')

module.exports = class Settings extends Model{
  static init(sequelize, DataTypes) {
    return super.init({
      key: {
        type: DataTypes.STRING,
        unique: true
      },
      value: {
        type: DataTypes.STRING
      }
    }, {
      name: {
        singular: 'settings',
        plural: 'settings'
      },
      sequelize,
      underscored: true,
      modelName: 'settings',
      tableName: 'settings'
    })
  }
}
