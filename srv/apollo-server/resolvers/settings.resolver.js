const { Op } = require('sequelize')

module.exports = {
  Query: {
    settings: (parent, { key }, { Settings }) => Settings.findAll({
      where: {
        key: {
          [Op.like]: `%${key}%`
        }
      }
    })
  }
}
