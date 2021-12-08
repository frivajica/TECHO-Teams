const Sequelize = require("sequelize");
const db = require("../config/database");

class RolEnEquipo extends Sequelize.Model {}

RolEnEquipo.init(
  {
    cantNecesaria: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    cantSatisfecha: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
  },
  { sequelize: db, modelName: "rolenequipo" }
  );
  
  module.exports = RolEnEquipo;