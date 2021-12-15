const { UsuarioEnEquipo, Usuario, Equipo } = require("../models");

const checkAdmin = async (req, res, next) => {
    const usuario = await Usuario.findOne({where: {idPersona: req.headers.idpersona}})
    if (usuario.isAdmin) return next();
    return res.status(401).send('Usuario no es admin');
};

const checkAuth = (req, res, next) => {
  //esperando endpoint de actividades
};

const isAdminOrCoordinatorHere = async (req, res, next) => {
  const usrEnEquipo = await UsuarioEnEquipo.findOne({
    where: {
      usuarioIdPersona: req.headers.idpersona,
      equipoId: req.params.id,
      roleId: 1,
    },
  });
  if (usrEnEquipo) return next();
  else {
    const usuario = await Usuario.findOne({
      where: { idPersona: req.headers.idpersona },
    });
    const equipo = await Equipo.findOne({ where: { id: req.params.id } });
    if (
      usuario.isAdmin ||
      (usuario.areaCoord === equipo.area &&
        usuario.paisIdCoord === equipo.paisId) ||
      usuario.sedeIdCoord === equipo.sede
    )
      return next();
    else
      return res
        .status(401)
        .send("El usuario no tiene acceso como coordinador");
  }
};

const isAdminOrCoordinator = (req, res, next) => {
  Usuario.findOne({ where: { idPersona: req.headers.idpersona } }).then(
    (usuario) => {
      if (usuario.isAdmin || usuario.isCoordinador) return next();
      else return res.status(401).send("El usuario no es coordinador ni admin");
    }
  );
};

module.exports = {
  checkAdmin,
  checkAuth,
  isAdminOrCoordinatorHere,
  isAdminOrCoordinator,
};
