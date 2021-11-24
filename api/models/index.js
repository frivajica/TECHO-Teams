const Equipo = require('./Equipo');
const Usuario = require('./Usuario');
const Role = require('./Role');
const UsuarioEnEquipo = require('./UsuarioEnEquipo');
// const Actividad = require("./Actividades");

//Equipo.hasMany(Actividad);
Usuario.belongsToMany(Equipo, {through: "UsuarioEnEquipo"});
Role.hasMany(UsuarioEnEquipo, {as: "Usuario"});


module.exports = { Usuario, Equipo, Role, UsuarioEnEquipo };
