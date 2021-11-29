const { UsuarioEnEquipo } = require('../models');

const checkAuthAndAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user[0].isAdmin) return next();
    return res.status(401).send('Usuario no es admin');
};

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).send('Usuario no está loggeado');
};

const isCoordinatorHere = (req, res, next) => {
    if (req.isAuthenticated()){
        UsuarioEnEquipo.findOne({where: {usuarioId: req.user[0].id, equipoId: req.params.id, roleId: 1}})
        .then(usrEnEquipo => {
            if (usrEnEquipo) return next();
            else return res.status(401).send('Usuario no es coordinador del equipo');
        })
        .catch(() => res.status(500).send("Usuario no encontrado en un equipo"));
    }
    else return res.status(401).send('Usuario no está loggeado');
}

const isCoordinator = (req, res, next) => {
    if (req.isAuthenticated()){
        UsuarioEnEquipo.findOne({where: {usuarioId: req.user[0].id, roleId: 1}})
        .then(usrEnEquipo => {
            if (usrEnEquipo) return next();
            else return res.status(401).send('Usuario no es coordinador en ningun equipo');
        })
        .catch(() => res.status(500).send("Usuario no encontrado en un equipo"));
    }
    else return res.status(401).send('Usuario no está loggeado');
}

module.exports = { checkAuthAndAdmin, checkAuth, isCoordinatorHere, isCoordinator };