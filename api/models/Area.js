const Sequelize = require("sequelize");
const db = require("../config/database");

class Area extends Sequelize.Model {}

Area.init(
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
  },
  { sequelize: db, modelName: "area" }
  );
  
  module.exports = Area;