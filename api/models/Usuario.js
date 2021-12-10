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
    areaCoord: Sequelize.INTEGER,  // id de sede
    paisCoord: Sequelize.INTEGER, //
    tipoDeArea: Sequelize.STRING, // sede/area?
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
