const Equipo = require("./Equipo");
const Usuario = require("./Usuario");
const Role = require("./Role");
const UsuarioEnEquipo = require("./UsuarioEnEquipo");
const Evento = require("./Evento");

Usuario.belongsToMany(Equipo, {through: UsuarioEnEquipo});
Equipo.belongsToMany(Usuario, {through: UsuarioEnEquipo});

Role.hasMany(UsuarioEnEquipo, {as: "usrEnEquipo"});
UsuarioEnEquipo.belongsTo(Role);

Equipo.hasMany(Evento);
Evento.belongsTo(Equipo);


module.exports = { Usuario, Equipo, Role, UsuarioEnEquipo };
