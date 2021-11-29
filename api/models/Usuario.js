const Sequelize = require("sequelize");
const db = require("../config/database");

class Usuario extends Sequelize.Model { }

Usuario.init(
  {
    idPersona: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    profesion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estudios: {
      type: Sequelize.STRING,
    },
    intereses: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  { sequelize: db, modelName: "usuarios" }
);

module.exports = Usuario;