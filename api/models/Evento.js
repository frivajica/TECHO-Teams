const Sequelize = require("sequelize");
const db = require("../config/database");

class Evento extends Sequelize.Model {}

Evento.init(
  {
    descripcion: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    tipo: Sequelize.INTEGER,
  },
  { sequelize: db, modelName: "evento" }
);

module.exports = Evento;
