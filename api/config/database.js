const Sequelize = require("sequelize");

const db = new Sequelize("bwgpm6fqaz25rnk0nnmj", "uglfayeryrkjedwt", "WVymCqqIlnz4sHPY1WNH", {
  host: "bwgpm6fqaz25rnk0nnmj-mysql.services.clever-cloud.com",
  dialect: "mysql",
  logging: false,
  timezone: "-03:00",
});

module.exports = db;
