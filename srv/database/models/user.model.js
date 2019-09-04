const { Model } = require("sequelize")
const bcrypt = require("bcrypt")

const hashPassword = async (user) => {
  if (!user.password) return
  try {
    user.password = await bcrypt.hash(user.password, 10)
  } catch (err) {
    console.log(err)
  }
}

module.exports = class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      accountname: {
        type: DataTypes.STRING,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
      }
    }, {
      name: {
        singular: "user",
        plural: "users"
      },
      sequelize,
      underscored: true,
      modelName: "user",
      hooks: {
        beforeCreate: hashPassword
      }
    })
  }

  static associate ({ Role, Permission }) {
    this.belongsToMany(Role, {
      through: "role_users",
      onDelete: "CASCADE"
    })

    this.belongsToMany(Permission, {
      through: "permission_users"
    })
  }
}
