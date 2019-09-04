const { Model } = require("sequelize")

module.exports = class Permission extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          unique: true
        },
        slug: {
          type: DataTypes.STRING,
          unique: true
        },
        description: {
          type: DataTypes.TEXT,
        },
        protected: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0
        }
      },
      {
        name: {
          singular: "permission",
          plural: "permissions"
        },
        sequelize,
        tableName: "permissions"
      }
    )
  }

  static associate ({ User, Role }) {
    this.belongsToMany(User, {
      through: "permission_users"
    })

    this.belongsToMany(Role, {
      through: "permission_roles"
    })
  }
}
