const Sequelize = require("sequelize");
const db = require("../config/database");

class RolEnEquipo extends Sequelize.Model {}

RolEnEquipo.init(
  {
    necesario: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    satisfecho: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
  },
  { sequelize: db, modelName: "rolenequipo" }
  );
  
  module.exports = RolEnEquipo;