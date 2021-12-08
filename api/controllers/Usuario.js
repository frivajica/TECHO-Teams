const { Usuario, Evento, UsuarioEnEquipo, Equipo } = require("../models");
const superagent = require("superagent");
const generateAxios = require("../utils/generateAxios")

class UsuarioController {
  static getUsuarios(req, res) {
    Usuario.findAll()
      .then((userList) => res.status(200).send(userList))
      .catch((err) => res.status(500).send(err));
  }

  static getUsuarioById(req, res) {
    const server = generateAxios(req.headers.authorization)
   server
   .get(`/personas/${req.params.id}`)
   .then(res => res.data)
   .then(usuarioActivs => {
     return Usuario.findOne({ where: { idPersona: req.params.id }})
     .then(usuarioEqs => res.status(200).send({...usuarioEqs.dataValues, ...usuarioActivs}))
    })
   .catch((err) => res.status(500).send(err));
  }

  static getUsuarioByMail(req, res) {
    const server = generateAxios(req.headers.authorization)
   server
   .get(`/personas/mail/${req.params.mail}`)
   .then(res => res.data[0])
   .then(usuarioActivs => {
     return Usuario.findOne({where: { idPersona: usuarioActivs.idPersona}})
     .then(usuarioEqs => res.status(200).send({...usuarioEqs.dataValues, ...usuarioActivs}))
    })
   .catch((err) => console.log({err}))
  }

  static crearUsuario(req, res) {
    const {
      idPais,
      idProvincia,
      idLocalidad,
      password,
      password_confirmation,
      idUnidadOrganizacional,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      telefono,
      telefonoMovil,
      sexo,
      dni,
      mail,
      recibirMails,
      acepta_marketing,
      profesion,
      estudios,
      intereses,
    } = req.body;

    superagent
      .post("https://sandbox.actividades.techo.org/api/register")
      .send({
        idPais,
        idProvincia,
        idLocalidad,
        password,
        password_confirmation,
        idUnidadOrganizacional,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        telefono,
        telefonoMovil,
        sexo,
        dni,
        mail,
        recibirMails,
        acepta_marketing,
      })
      .set("X-API-Key", "foobar")
      .set("Accept", "application/json")
      .then((r) => JSON.parse(r.text))
      .then((newUser) => {
        return Usuario.create({
          idPersona: newUser.persona.idPersona,
          profesion,
          estudios,
          intereses,
        }).then((user) => res.status(201).send(user));
      })
      .catch((err) => res.status(500).send(err));
  }

  static crearUsuarioEquipos(req, res) {
    //user es el obj del estado global de usuario, desde front pasarlo en el body del axios
    const { idPersona, profesion, estudios, intereses } = req.body;
    Usuario.create(req.body)
      .then((user) => res.status(201).send(user))
      .catch((err) => res.status(401).send(err));
  }

  static loginInUsuario(req, res) {
    superagent
      .post("https://sandbox.actividades.techo.org/api/login")
      .send(req.body)
      .set("X-API-Key", "foobar")
      .set("Accept", "application/json")
      .then((r) => JSON.parse(r.text))
      .then((userActivs) => {
        return Usuario.findOne({
          where: { idPersona: userActivs.user.idPersona },
        })
          .then((user) =>
            res.status(200).send(
              !user
                ? { ...userActivs.user, token: userActivs.token }
                : !userActivs.user.email_verified_at
                ? { error: "Usuario debe validar mail" }
                : {
                    ...user.dataValues,
                    ...userActivs.user,
                    token: userActivs.token,
                  }
            )
          )
          .catch((err) => console.log("no funcionaaaa pero casi", err));
      })
      .catch((err) => console.log("no funciono imbecciiiil", err));
  }

  static editarUsuario(req, res) {
    const {
      idPais,
      idProvincia,
      idLocalidad,
      nombres,
      apellidoPaterno,
      fechaNacimiento,
      idUnidadOrganizacional,
      telefono,
      dni,
      telefonoMovil,
      mail,
      recibirMails,
      acepta_marketing,
      profesion,
      estudios,
      intereses,
    } = req.body;

    console.log("buenos dias");

    superagent
      .post(
        `https://sandbox.actividades.techo.org/api/editPersona/${req.params.id}`
      )
      .send({
        idPais,
        idProvincia,
        idLocalidad,
        nombres,
        apellidoPaterno,
        fechaNacimiento,
        telefono,
        dni,
        telefonoMovil,
        mail,
        recibirMails,
        acepta_marketing,
        idUnidadOrganizacional,
      })
      .set("X-API-Key", "foobar")
      .set("Accept", "application/json")
      .then((updatedUsr) => ({
        usuarioPromise: Usuario.update(
          { profesion, estudios, intereses },
          { where: { idPersona: req.params.id } }
        ),
        updatedUsr,
      }))
      .then(({ usuarioPromise, updatedUsr }) => {
        return usuarioPromise
          .then(() => Usuario.findOne({ where: { idPersona: req.params.id } }))
          .then((personaUpd) =>
            res
              .status(200)
              .send({ ...personaUpd.dataValues, ...updatedUsr.request._data })
          );
      })
      .catch((err) => console.log({ err }));
  }

  static getHistorial(req, res) {
    let historiales = [];
    UsuarioEnEquipo.findAll({ where: { usuarioIdPersona: req.params.userId } })
      .then(async (usrEnEquipos) => {
        for (let i = 0; i < usrEnEquipos.length; i++) {
          let fechasEntrada = [];
          let fechasSalida = [];
          let rolesEnEquipo = [];
          let equipo = {};
          const findEvents = (tipo, attributes) => {
            return Evento.findAll({
              where: {
                usuarioIdPersona: req.params.userId,
                equipoId: usrEnEquipos[i].equipoId,
                tipo,
              },
              order: ["createdAt"],
              attributes: [attributes],
            });
          };

          fechasEntrada = await findEvents(1, "createdAt");

          fechasSalida = await findEvents(-1, "createdAt");

          rolesEnEquipo = await findEvents(2, "descripcion");

          equipo = await Equipo.findOne({
            where: { id: usrEnEquipos[i].equipoId },
          });

          let historialDeEquipo = {
            entradas: fechasEntrada,
            salidas: fechasSalida,
            roles: rolesEnEquipo,
            activo: usrEnEquipos[i].activo,
            equipo,
          };
          historiales.push(historialDeEquipo);
          if (i === usrEnEquipos.length - 1) res.send(historiales);
        }
      })
      .catch((err) => res.status(500).send(err));
  }

  static getEquipos(req, res) {
    UsuarioEnEquipo.findAll({
      where: {
        usuarioIdPersona: req.params.idPersona,
      },
    })
      .then((usrEquipos) => res.status(200).send(usrEquipos))
      .catch((err) => res.status(500).send({ err }));
  }
}

module.exports = UsuarioController;
