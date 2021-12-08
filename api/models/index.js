const Equipo = require("./Equipo");
const Usuario = require("./Usuario");
const Role = require("./Role");
const Evento = require("./Evento");
const UsuarioEnEquipo = require("./UsuarioEnEquipo");
const RolEnEquipo = require("./RolEnEquipo")

Usuario.belongsToMany(Equipo, {through: UsuarioEnEquipo});
Equipo.belongsToMany(Usuario, {through: UsuarioEnEquipo});

Role.belongsToMany(Equipo, {through: RolEnEquipo});
Equipo.belongsToMany(Role, {through: RolEnEquipo});

Role.hasMany(UsuarioEnEquipo, {as: "usrEnEquipo"});
UsuarioEnEquipo.belongsTo(Role);

Equipo.hasMany(Evento);
Evento.belongsTo(Equipo);

Usuario.hasMany(Evento);
Evento.belongsTo(Usuario);

module.exports = { Usuario, Equipo, Role, Evento, RolEnEquipo, UsuarioEnEquipo };
