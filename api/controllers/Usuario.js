const { Usuario, Evento, UsuarioEnEquipo, Equipo } = require("../models");
const generateAxios = require("../utils/generateAxios");
const superagent = require("superagent");
const Sequelize = require("sequelize");
const multer  = require('multer')
let fs = require('fs-extra');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/perfil");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
const upload = multer({ storage: storage })

class UsuarioController {
  static async getUsuarios(req, res) {
    Usuario.findAll(/* {offset: 4, limit: 6} */) //<-- not working
      .then(async (usersList) => {
        let usersInfo = []
        let i=0
        usersList = usersList.slice(req.headers.offset,req.headers.limit);
        const server = generateAxios(req.headers.authorization);
        for (i; i<usersList.length; i++) {
          await server.get(`/personas/${usersList[i].idPersona}`)
          .then(res => res.data)
          .then(usrInfo => usersInfo.push({...usersList[i].dataValues, ...usrInfo}))
        }
        return res.send(usersInfo)
      })
      .catch((err) => console.log(err));
  }

  static getUsuarioById(req, res) {
    const server = generateAxios(req.headers.authorization);
    server
      .get(`/personas/${req.params.id}`)
      .then((res) => res.data)
      .then((usuarioActivs) => {
        return Usuario.findOne({ where: { idPersona: req.params.id } }).then(
          (usuarioEqs) =>
            res.status(200).send({
              ...usuarioEqs.dataValues,
              ...usuarioActivs,
            })
        );
      })
      .catch((err) => res.status(500).send(err));
  }

  static getUsuarioByMail(req, res) {
    const server = generateAxios(req.headers.authorization);
    server
      .get(`/personas/mail/${req.params.mail}`)
      .then((res) => res.data[0])
      .then((usuarioActivs) => {
        return Usuario.findOne({
          where: { idPersona: usuarioActivs.idPersona },
        }).then((usuarioEqs) =>
          res.status(200).send({
            ...usuarioEqs.dataValues,
            ...usuarioActivs,
          })
        );
      })
      .catch((err) => res.status(500).send(err));
  }

  static toggleAdmin(req, res) {
    Usuario.update({ isAdmin: Sequelize.literal('NOT isAdmin') }, 
      { where: { idPersona: req.params.idPersona }, }
    ).then(() => res.status(200).send('Se cambió el status de admin'));
  };

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

    console.log("---->", req.file)

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
          imagen: req.file.filename
        }).then((user) => res.status(201).send(user));
      })
      .catch((err) => {
        console.log({err})
        res.status(500).send(err)});
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
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.status(500).send(err));
  }

  static logoutUsuario(req, res) {
    const server = generateAxios(req.headers.authorization);
    server
    .post("/logout")
    .then(r => res.status(200).send({ success: true, mensaje: 'Sesión Cerrada' }))
    .catch((err) => res.status(500).send({err}));
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
      .set("Authorization", `Bearer ${req.headers.authorization}`)
      .then((updatedUsr) => ({
        usuarioPromise: Usuario.update(
          { profesion, estudios, intereses },
          { where: { idPersona: req.params.id } }
        ),
        updatedUsr: JSON.parse(updatedUsr.text),
      }))
      .then(({ usuarioPromise, updatedUsr }) => {
        return usuarioPromise
          .then(() => Usuario.findOne({ where: { idPersona: req.params.id } }))
          .then((personaUpd) =>
            res
              .status(200)
              .send({ ...personaUpd.dataValues, ...updatedUsr.persona, token: req.headers.authorization})
          );
      })
      .catch((err) => console.log({ err }));
  }

  static changeCoordAuth(req, res) {
    Usuario.update(
      { 
        isCoordinador: req.body.isCoordinador, 
        sedeIdCoord: req.body.sedeCoord || null, 
        paisIdCoord: req.body.paisIdCoord || null,
        areaCoord: req.body.areaCoord || null
      }, 
      { where: { idPersona: req.params.id } }
    )
    .then(() => res.send("autoridades de coordinador actualizadas"))
    .catch(err => res.status(500).send(err))
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
          const findEvents = (tipo) => {
            return Evento.findAll({
              where: {
                usuarioIdPersona: req.params.userId,
                equipoId: usrEnEquipos[i].equipoId,
                tipo,
              },
              order: ["createdAt"],
            });
          };

          fechasEntrada = await findEvents(1);

          fechasSalida = await findEvents(-1);

          rolesEnEquipo = await findEvents(2);

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

  static getActividades(req, res) {
    const server = generateAxios(req.headers.authorization);
    server
    .get("/inscripciones")
    .then(inscripciones => inscripciones.data.inscripciones)
    .then(actividades => res.status(200).send(actividades)) //arr con actividades
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

module.exports = {UsuarioController, upload: upload.single("fotoDePerfil")}
