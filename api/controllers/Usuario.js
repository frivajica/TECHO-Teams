const { Usuario, Evento, UsuarioEnEquipo } = require("../models");
const superagent = require("superagent");

class UsuarioController {
  static getUsuarios(req, res) {
    Usuario.findAll()
      .then((userList) => res.status(200).send(userList))
      .catch((err) => res.status(500).send(err));
  }

  static getUsuario(req, res) {
    Usuario.findOne({ where: { id: req.params.id } })
      .then((user) => res.send(user))
      .catch((err) => res.status(500).send(err));
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
        }).then((user) =>
          res
            .status(200)
            .send(
              !user
                ? userActivs.user
                : { ...user.dataValues, ...userActivs.user }
            )
        );
      })
      .catch((err) => res.status(401).send(err));
  }

  static editarUsuario(req, res) {
    Usuario.update();
  }

  static getHistorial(req, res) {
    let historiales = [];
    UsuarioEnEquipo.findAll({ where: { usuarioIdPersona: req.params.userId } })
      .then((usrEnEquipos) => {
        for (let i = 0; i < usrEnEquipos.length; i++) {
          Evento.findAll({
            where: {
              usuarioIdPersona: req.params.userId,
              equipoId: usrEnEquipos[i].equipoId,
              tipo: 1,
            },
            order: ["createdAt"],
            attributes: ["createdAt"],
          })
            .then((fechasEntrada) => {
              Evento.findAll({
                where: {
                  usuarioIdPersona: req.params.userId,
                  equipoId: usrEnEquipos[i].equipoId,
                  tipo: -1,
                },
                order: ["createdAt"],
                attributes: ["createdAt"],
              })
                .then((fechasSalida) => {
                  Evento.findAll({
                    where: {
                      usuarioIdPersona: req.params.userId,
                      equipoId: usrEnEquipos[i].equipoId,
                      tipo: 2,
                    },
                    order: ["createdAt"],
                  })
                    .then((rolesEnEquipo) => {
                      let roles = [];
                      for (let event of rolesEnEquipo) {
                        console.log("im innnn", event);
                        roles.push(event.descripcion.slice(16));
                      }
                      return roles;
                    })
                    .then((roles) => {
                      let historialDeEquipo = {
                        entradas: fechasEntrada,
                        salidas: fechasSalida,
                        roles,
                      };
                      historiales.push(historialDeEquipo);
                      if (i === usrEnEquipos.length - 1) res.send(historiales);
                    })
                    .catch((err) => res.status(500).send(err));
                })
                .catch((err) => res.status(500).send(err));
            })
            .catch((err) => res.status(500).send(err));
        }
      })
      .catch((err) => res.status(500).send(err));
  }
}

module.exports = UsuarioController;
