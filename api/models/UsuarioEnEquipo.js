const Sequelize = require("sequelize");
const db = require("../config/database");

class UsuarioEnEquipo extends Sequelize.Model {}

UsuarioEnEquipo.init(
  {},
  { sequelize: db, modelName: "usuarioenequipo" }
  );
  
  module.exports = UsuarioEnEquipo;