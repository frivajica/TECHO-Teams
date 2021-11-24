const Sequelize = require("sequelize");

const db = new Sequelize('dbtecho', 'root', 'techoGreatPassword', {
  dialect: 'mysql',
  dialectOptions: {
    // Your mysql2 options here
  }
})

module.exports = db;
