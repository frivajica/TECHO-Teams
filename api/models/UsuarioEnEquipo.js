const Sequelize = require("sequelize");
const db = require("../config/database");

class UsuarioEnEquipo extends Sequelize.Model {}

UsuarioEnEquipo.init(
  {
    activo: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  { sequelize: db, modelName: "usuarioenequipo" }
  );
  
  module.exports = UsuarioEnEquipo;