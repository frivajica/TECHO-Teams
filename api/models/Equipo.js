const Sequelize = require("sequelize");
const db = require("../config/database");

class Equipo extends Sequelize.Model {}

Equipo.init(
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cantMiembros: {
        type: Sequelize.INTEGER,
    },
    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    detalles: {
        type: Sequelize.TEXT
    },
    img: {
        type: Sequelize.STRING
    }
  },
  { sequelize: db, modelName: "equipos" }
  );
  
  module.exports = Equipo;