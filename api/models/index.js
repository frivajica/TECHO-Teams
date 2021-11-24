const Equipo = require('./Equipo');
const Usuario = require('./Usuario');

//User.belongsToMany(Equipo, {through: "UserRoleInEquipo"})

module.exports = { Usuario, Equipo };
