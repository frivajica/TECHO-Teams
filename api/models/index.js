const Equipo = require('./Equipo');
const Usuario = require('./Usuario');
const Role = require('./Role');
const UsuarioEnEquipo = require('./UsuarioEnEquipo');

Usuario.belongsToMany(Equipo, {through: "UsuarioEnEquipo"});
Role.hasMany(UsuarioEnEquipo);


module.exports = { Usuario, Equipo };
