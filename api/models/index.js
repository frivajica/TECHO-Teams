const Equipo = require("./Equipo");
const Usuario = require("./Usuario");
// const Actividad = require("./Actividades");

Equipo.hasMany(Actividad);

module.exports = { Usuario, Equipo };
