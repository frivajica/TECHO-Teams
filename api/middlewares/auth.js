const { UsuarioEnEquipo, Usuario, Equipo } = require('../models');

const checkAdmin = async (req, res, next) => {
    const usuario = await Usuario.findOne({where: {id: req.body.idPersona}})
    if (usuario.isAdmin) return next();
    return res.status(401).send('Usuario no es admin');
};

const checkAuth = (req, res, next) => {
    //esperando endpoint de actividades
};

const isAdminOrCoordinatorHere = async (req, res, next) => {
    const usrEnEquipo = await UsuarioEnEquipo.findOne({where: {usuarioIdPersona: req.body.idPersona, equipoId: req.params.id, roleId: 1}})
    if (usrEnEquipo) return next();
    else {
        const usuario = await Usuario.findOne({where: {idPersona: req.body.idPersona}})
        const equipo = await Equipo.findOne({where: {id: req.params.id}})
        if (
            usuario.isAdmin 
            ||
            (usuario.areaCoord === equipo.area && usuario.paisIdCoord === equipo.paisId) 
            || 
            usuario.sedeIdCoord === equipo.sede
        ) return next();
        else return res.status(401).send("El usuario no tiene acceso como coordinador")
    }
}

const isCoordinator = (req, res, next) => {
    UsuarioEnEquipo.findOne({where: {usuarioIdPersona: req.body.idPersona, roleId: 1}})
    .then(usrEnEquipo => {
        if (usrEnEquipo) return next();
        else return res.status(401).send('El usuario no es coordinador en ningún equipo');
    })
    .catch(() => res.status(401).send("El usuario no pertenece a ningún equipo"));
}

module.exports = { checkAdmin, checkAuth, isAdminOrCoordinatorHere, isCoordinator };