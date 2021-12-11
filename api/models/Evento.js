const Sequelize = require("sequelize");
const db = require("../config/database");

class Evento extends Sequelize.Model {}

Evento.init(
  {
    tipo: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nombreEquipo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nombreCoord: Sequelize.STRING,
    nombreUsuario: Sequelize.STRING,
    nombreRol: Sequelize.STRING
  },
  { sequelize: db, modelName: "evento" }
);

module.exports = Evento;
