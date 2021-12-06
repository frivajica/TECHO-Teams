const Sequelize = require("sequelize");
const db = require("../config/database");

class Equipo extends Sequelize.Model { }

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
    area: {
      type: Sequelize.STRING,
      allowNull: false
    },
    paisId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sedeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    territorioId: { //es el barrio donde trabaja el equipo
      type: Sequelize.INTEGER
    },
    img: {
      type: Sequelize.STRING
    }
  },
  { sequelize: db, modelName: "equipos" }
);

module.exports = Equipo;