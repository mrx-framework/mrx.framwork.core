const { Model } = require('sequelize')

module.exports = class Role extends Model {
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
          singular: 'role',
          plural: 'roles'
        },
        sequelize,
        tableName: 'roles'
      }
    )
  }

  static associate ({ User, Permission }) {
    this.belongsToMany(User, {
      through: 'role_users'
    });

    this.belongsToMany(Permission, {
      through: 'permission_roles'
    });
  }
}
