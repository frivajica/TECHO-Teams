const Sequelize = require("sequelize");

const db = new Sequelize("dbtecho", "root", "Martin.1234", {
  dialect: "mysql",
  logging: false,
});

module.exports = db;
