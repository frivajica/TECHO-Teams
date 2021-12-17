const EquipoController = require("./Equipo");
const {UsuarioController, upload} = require("./Usuario");
const RoleController = require("./Role");
const RegionesController = require("./Regiones");
const SedesController = require("./Sedes");
const ComunidadesController = require("./Comunidades");
const AreasController = require("./Areas");

module.exports = {
  EquipoController,
  UsuarioController,
  RoleController,
  RegionesController,
  SedesController,
  ComunidadesController,
  AreasController,
  upload
};
