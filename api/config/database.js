const Sequelize = require('sequelize');

const db = new Sequelize('dbtecho', 'root', 'password', {
  dialect: 'mysql',
  logging: false,
})

module.exports = db;