const Sequelize = require("sequelize");
const db = require("../config/database");

class Usuario extends Sequelize.Model {}

Usuario.init(
  {
    idPersona: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isCoordinador: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    // alcance de coordinacion:
    sedeIdCoord: Sequelize.INTEGER, 
    paisIdCoord: Sequelize.INTEGER, 
    areaCoord: Sequelize.STRING, 
    profesion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estudios: {
      type: Sequelize.STRING,
    },
    intereses: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imagen: {
      type: Sequelize.STRING
    }
  },
  { sequelize: db, modelName: "usuarios"}
);

module.exports = Usuario;