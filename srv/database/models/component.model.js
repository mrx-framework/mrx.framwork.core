const { Model } = require("sequelize")

module.exports = class Component extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      name: { //Name of the component <component :is="name" /> - e.g. v-container
        type: DataTypes.STRING,
        allowNull: false
      },
      title: { // title of the component (What is shown in PageBuilder) - e.g. Container #1
        type: DataTypes.STRING,
        allowNull: false
      },
      properties: { // all props of the component stored as stringified json. <component v-bind="JSON.parse(props)" />
        type: DataTypes.TEXT
      },
      content: { // if component has content and no childs => <component v-html="content" />
        type: DataTypes.TEXT
      },
      order: { // the order of the component
        type: DataTypes.INTEGER
      },
      hidden: { // if its shown or not
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      name: {
        singular: "component",
        plural: "components"
      },
      sequelize,
      underscored: true,
      modelName: "component"
    })
  }

  static associate ({ Page, Component }) {
    this.belongsTo(Page)

    this.hasMany(Component, {
      as: "childs",
      allowNull: true,
      defaultValue: null
    })
  }
}
