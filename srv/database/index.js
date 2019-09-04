'use strict'
const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const { database } = require('../../config')
const { connection } = database

let models = {}
const sequelize = new Sequelize(connection.database, connection.username, connection.password, connection)

fs.readdirSync(path.join(__dirname, 'models'))
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function(fileName) {
    const filePath = path.join(__dirname, 'models', fileName)
    const model = require(filePath)
    const modelName = model.name.charAt(0).toUpperCase() + model.name.slice(1)
    models[modelName] = model.init(sequelize, Sequelize)
  })

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

if ( database.migrate === 'auto' ) {
  sequelize.sync({ force: true })
    .then(() => {
      if (database.seeding === 'auto') {
        require('./seeds/settings.seed')(models)
        require('./seeds/navigation.seed')(models)
        require('./seeds/user.seed')(models)
        require('./seeds/page.seed')(models)
        require('./seeds/media.seed')(models)
      }
    })
}

module.exports = {
  sequelize,
  Sequelize,
  models
}
