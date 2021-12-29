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
      defaultValue: true,
    },
    detalles: {
      type: Sequelize.TEXT,
    },
    area: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paisId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sedeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoria: {
      type: Sequelize.STRING,
    },
    territorioId: {
      //es el barrio donde trabaja el equipo
      type: Sequelize.INTEGER,
    },
    img: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "equipos" }
);

Equipo.addHook("beforeSave", equipo => equipo.nombre = equipo.nombre.charAt(0).toUpperCase() + equipo.nombre.substring(1))

module.exports = Equipo;
