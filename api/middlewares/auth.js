const { UsuarioEnEquipo, Usuario, Equipo } = require("../models");

const checkAdmin = async (req, res, next) => {
    const usuario = await Usuario.findOne({where: {idPersona: req.headers.idpersona}})
    if (usuario.isAdmin) return next();
    return res.status(401).send('Usuario no es admin');
};

const isAdminOrCoordinatorHere = async (req, res, next) => {
  const isMiddleware = req.route.path !== "/:id/checkAdminCoordinator"
  try {
    const usrEnEquipo = await UsuarioEnEquipo.findOne({
      where: {
        usuarioIdPersona: req.headers.idpersona,
        equipoId: req.params.id,
        roleId: 1,
      },
    });
    if (usrEnEquipo && usrEnEquipo?.activo) {
      return isMiddleware? next() : res.send(true); 
    } else {
      const usuario = await Usuario.findOne({
        where: { idPersona: req.headers.idpersona },
      });
      const equipo = await Equipo.findOne({ where: { id: req.params.id } });
      if (
        usuario.isAdmin ||
        (usuario.areaCoord === equipo.area &&
          usuario.paisIdCoord === equipo.paisId) ||
          usuario.sedeIdCoord === equipo.sedeId
          ) {
        return isMiddleware? next() : res.send(true);
      } else {
        return res.status(401).send("El usuario no tiene acceso como coordinador");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error)
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

const belongsToEquipo = (req, res, next) => {
  UsuarioEnEquipo.findOne({ where: { usuarioIdPersona: req.headers.idpersona, equipoId: req.params.id } })
  .then(usrEnEquipo => {
      if (usrEnEquipo?.activo) return next();
      else isAdminOrCoordinatorHere(req, res, next);
    }
  );
};

module.exports = {
  checkAdmin,
  isAdminOrCoordinatorHere,
  isAdminOrCoordinator,
  belongsToEquipo
};
