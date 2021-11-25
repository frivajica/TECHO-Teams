const Sequelize = require("sequelize");
const db = require("../config/database");

class Actividad extends Sequelize.Model {}

Actividad.init(
  {
    idActividad: { type: Sequelize.INTEGER, allowNull: false },
    nombre: { type: Sequelize.STRING, allowNull: false },
    descripcion: { type: Sequelize.TEXT, allowNull: false },
    tipo: { type: Sequelize.STRING, allowNull: false },
    fechaInicio: { type: Sequelize.STRING, allowNull: false },
    hora: { type: Sequelize.STRING, allowNull: false },
    lugar: { type: Sequelize.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "Actividad" }
);

module.exports = Actividad;
