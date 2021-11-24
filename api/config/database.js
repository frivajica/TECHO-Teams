const Sequelize = require('sequelize');

const db = new Sequelize('dbtecho', 'root', 'techoGreatPassword', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})

module.exports = db;