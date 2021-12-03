const { Usuario, Evento, UsuarioEnEquipo, Equipo } = require("../models");
const superagent = require("superagent");
const axios = require("axios")

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
      .catch((err) => res.status(401).send({ err }));
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

    console.log("buenos dias")

    superagent
      .post(`https://sandbox.actividades.techo.org/api/editPersona/${req.params.id}`)
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
        idUnidadOrganizacional
      })
      .set("X-API-Key", "foobar")
      .set("Accept", "application/json")
      .then(updatedUsr => ({
        usuarioPromise: Usuario.update({ profesion, estudios, intereses },
         { where: { idPersona: req.params.id }}),
        updatedUsr
      }))
      .then(({ usuarioPromise, updatedUsr }) => {
        return usuarioPromise
          .then(() => Usuario.findOne({where: {idPersona: req.params.id}}))
          .then(personaUpd => 
            res.status(200).send({ ...personaUpd.dataValues, ...updatedUsr.request._data }))
      })
      .catch(err => console.log({ err }))

  }

  static getHistorial(req, res) {
    let historiales = [];
    UsuarioEnEquipo.findAll({ where: { usuarioIdPersona: req.params.userId } })
      .then(async (usrEnEquipos) => {
        for (let i = 0; i < usrEnEquipos.length; i++) {
          let fechasEntrada = [];
          let fechasSalida = [];
          let rolesEnEquipo = [];
          let equipo = {}
          const findEvents = (tipo, attributes) => {
            return Evento.findAll({
              where: {
                usuarioIdPersona: req.params.userId,
                equipoId: usrEnEquipos[i].equipoId,
                tipo
              },
              order: ["createdAt"],
              attributes: [attributes]
            })
          }

          fechasEntrada = await findEvents(1, "createdAt")

          fechasSalida = await findEvents(-1, "createdAt")

          rolesEnEquipo = await findEvents(2, "descripcion")

          equipo = await Equipo.findOne({ where: { id: usrEnEquipos[i].equipoId } })

          console.log("im looping", i)
          let historialDeEquipo = {
            entradas: fechasEntrada,
            salidas: fechasSalida,
            roles: rolesEnEquipo,
            activo: usrEnEquipos[i].activo,
            equipo
          }
          historiales.push(historialDeEquipo);
          if (i === usrEnEquipos.length - 1) res.send(historiales);
        }
      })
      .catch((err) => res.status(500).send(err))
  }

  static getEquipos(req, res) {
    UsuarioEnEquipo.findAll({
      where: {
        usuarioIdPersona: req.params.idPersona
      }
    })
      .then(usrEquipos => res.status(200).send(usrEquipos))
      .catch((err) => res.status(500).send({ err }))
  }
}

module.exports = UsuarioController;


/*
superagent
    .put(`https://sandbox.actividades.techo.org/api/editPersona/${req.params.id}`)
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .send({
      idPais,
      idProvincia,
      idLocalidad,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      telefono,
      dni,
      telefonoMovil,
      sexo,
      mail,
      recibirMails,
      acepta_marketing})
      .then(updatedUsr => res.status(200).send(updatedUsr))
*/