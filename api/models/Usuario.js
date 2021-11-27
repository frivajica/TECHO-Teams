const Sequelize = require("sequelize");
const db = require("../config/database");

class Usuario extends Sequelize.Model { }

Usuario.init(
  {
    idPersona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    profesion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estudios: {
      type: Sequelize.STRING,
    },
   // intereses: { type: }
  },
  { sequelize: db, modelName: "usuarios" }
);

module.exports = Usuario;

/*
 mail: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email ya en uso!",
      },
    },
    dni: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idPais: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idProvincia: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idLocalidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idUnidadOrganizacional: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidoPaterno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidoMaterno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefono: {
      type: Sequelize.INTEGER,
    },
    sexo: {
      type: Sequelize.STRING,
    },
    fecha_nacimiento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    bio: {
      type: Sequelize.TEXT,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    nivel: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

*/