const Sequelize = require("sequelize");

const db = new Sequelize("dbtecho", "root", "Martin.1234", {
  dialect: "mysql",
  logging: false,
  timezone: '-03:00'
});

module.exports = db;
