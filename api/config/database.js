const Sequelize = require("sequelize");

const db = new Sequelize('techo', null, null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = db