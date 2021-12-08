const Sequelize = require("sequelize");

const db = new Sequelize("dbtecho", "root", "password", {
  dialect: "mysql",
  logging: false,
  timezone: "-03:00",
});

module.exports = db;
