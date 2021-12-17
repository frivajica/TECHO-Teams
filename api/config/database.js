const Sequelize = require("sequelize");

const db = new Sequelize("dbtecho", "root", "password", {
  //host: "bwgpm6fqaz25rnk0nnmj-mysql.services.clever-cloud.com",
  dialect: "mysql",
  logging: false,
  timezone: "-03:00",
});


module.exports = db;
