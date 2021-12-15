const {
  Equipo,
  Usuario,
  UsuarioEnEquipo,
  Role,
  RolEnEquipo,
} = require("../models");
const generateAxios = require("../utils/generateAxios");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class EquipoController {
  static async createEquipo(req, res) {
    try {
      const coordinador = await Usuario.findOne({
        where: { idPersona: req.headers.idpersona },
      });
      const newTeam = await Equipo.create(req.body);

      const usrEnEquipo = await newTeam
        .addUsuario(coordinador)
        .then((res) => res[0]); //<-- agrego el usuario al equipo
      const coordRol = await Role.findOne({ where: { id: 1 } }); //<-- busco el rol para crear la relacion
      await usrEnEquipo.setRole(coordRol); //<-- le asigno el rol "coordinador"

      //pedido a actividades para info(nombre) del coordinador :/
      const server = generateAxios(req.headers.authorization);
      const coordInfo = await server
        .get(`/personas/${req.headers.idpersona}`)
        .then((res) => res.data);

      await newTeam.createEvento({
        //éste evento solo se utiliza en el historial del equipo
        tipo: 0,
        nombreEquipo: newTeam.nombre,
        nombreCoord: coordInfo.nombres,
      });

      //creo otro evento para guardar el rol en el historial del usuario
      //también se mostrará en el historial del equipo
      const evento = await coordinador.createEvento({
        tipo: 2,
        nombreEquipo: newTeam.nombre,
        nombreUsuario: coordInfo.nombres,
        nombreRol: coordRol.nombre,
      });
      await newTeam.addEvento(evento); //necesitamos saber en qué equipo cumplió el rol de coordinador

      return res.status(201).send(newTeam);
    } catch (error) {
      return console.log("ACAAAA ----->", error);
      //res.status(500).send(error);
    }
  }

  static getEquipos(req, res) {
    Equipo.findAll()
      .then((teamList) => {
        let listaEquipos = [];
        for (let team of teamList) {
          if (team.activo) listaEquipos.push(team);
        }
        return listaEquipos;
      })
      .then((listaEquipos) => res.status(200).send(listaEquipos))
      .catch((err) => res.status(500).send(err));
  }

  static getOneEquipo(req, res) {
    Equipo.findOne({ where: { id: req.params.id } })
      .then((equipo) => res.status(200).send(equipo))
      .catch((err) => res.status(500).send(err));
  }

  static updateEquipo(req, res) {
    Equipo.update(req.body, { where: { id: req.params.id } })
      .then(() => Equipo.findOne({ where: { id: req.params.id } }))
      .then((updatedEquipo) => res.status(200).send(updatedEquipo))
      .catch((err) => res.status(500).send(err));
  }

  static async addUser(req, res) {
    try {
      const equipo = await Equipo.findOne({ where: { id: req.params.id } });
      if (!equipo.activo) return res.send("el equipo no esta activo");
      const usr = await Usuario.findOne({
        where: { idPersona: req.params.userId },
      });

      const checkUsr = await UsuarioEnEquipo.findOne({
        where: { usuarioIdPersona: usr.idPersona, equipoId: equipo.id },
      });
      if (checkUsr) {
        //si el usuario ya está en el equipo...
        if (checkUsr.activo === false)
          await UsuarioEnEquipo.update(
            { activo: true },
            { where: { usuarioIdPersona: usr.idPersona, equipoId: equipo.id } }
          );
        else return res.status(401).send("el usuario ya pertenece al equipo");
      } else await equipo.addUsuario(usr);

      const server = generateAxios(req.headers.authorization);
      const usrInfo = await server
        .get(`/personas/${req.params.userId}`)
        .then((res) => res.data);
      const coordInfo = await server
        .get(`/personas/${req.headers.idpersona}`)
        .then((res) => res.data);

      const evento = await equipo.createEvento({
        //evento para el historial del equipo
        tipo: 1,
        nombreEquipo: equipo.nombre,
        nombreUsuario: usrInfo.nombres,
        nombreCoord: coordInfo.nombres,
      });
      await usr.addEvento(evento); //para historial de usuario
      return res.send("usuario agregado");
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getUsers(req, res) {
    const server = generateAxios(req.headers.authorization);
    try {
      let usuariosYRol = await UsuarioEnEquipo.findAll({
        where: { equipoId: req.params.id },
        include: [Role],
      });
      const necesarios = await RolEnEquipo.findAll({
        where: { equipoId: req.params.id },
        include: [Role],
      });
      for (let i = 0; i < usuariosYRol.length; i++) {
        //Itera los usuarios para asignarles su información consultada de la api de actividades
        await server
          .get(`/personas/${usuariosYRol[i].usuarioIdPersona}`)
          .then((res) => (usuariosYRol[i].dataValues.usr = res.data))
          .catch((err) => res.send(err));
      }
      const info = { usuariosYRol, necesarios };
      return res.send(...info);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getRolesEnEquipo(req, res) {
    const server = generateAxios(req.headers.authorization);
    try {
      let usuariosYRol = await UsuarioEnEquipo.findAll({
        //toDo debería poder refactorizarse con magic methods de sequelize
        where: { equipoId: req.params.id, activo: true },
        include: [Role, Usuario],
      });
      let i = 0;
      while (i < usuariosYRol.length) {
        //Itera los usuarios para asignarles su información consultada de la api de actividades
        await server
          .get(`/personas/${usuariosYRol[i].usuarioIdPersona}`)
          .then((res) => {
            usuariosYRol[i].dataValues = {
              //genera nuevo objeto con la data requerida
              nombres: res.data.nombres,
              nombreApellido: `${res.data.nombres} ${res.data.apellidoPaterno}`,
              apellidoPaterno: res.data.apellidoPaterno,
              apellidoMaterno: res.data.apellidoMaterno,
              imagenUsr: usuariosYRol[i].dataValues.usuario.imagen,
              ...usuariosYRol[i].dataValues,
            };
          })
          .catch((err) => res.send(err));
        i++;
      }
      return res.send(usuariosYRol);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getUsuariosDeEquipo(req, res) {
    const server = generateAxios(req.headers.authorization);
    try {
      let usuariosYRol = await UsuarioEnEquipo.findAll({
        //toDo debería poder refactorizarse con magic methods de sequelize
        where: { equipoId: req.params.id, activo: true },
        include: [Role, Usuario],
      });
      let i = 0;
      while (i < usuariosYRol.length) {
        //Itera los usuarios para asignarles su información consultada de la api de actividades
        await server
          .get(`/personas/${usuariosYRol[i].usuarioIdPersona}`)
          .then((res) => {
            usuariosYRol[i].dataValues = {
              //genera nuevo objeto con la data requerida
              nombres: res.data.nombres,
              nombreApellido: `${res.data.nombres} ${res.data.apellidoPaterno}`,
              apellidoPaterno: res.data.apellidoPaterno,
              apellidoMaterno: res.data.apellidoMaterno,
              imagenUsr: usuariosYRol[i].dataValues.usuario.imagen,
              ...usuariosYRol[i].dataValues,
            };
          })
          .catch((err) => res.send(err));
        i++;
      }
      return res.send(usuariosYRol);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getRoles(req, res) {
    try {
      const roles = await equipo.getRoles();
      return res.send(roles);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async changeRole(req, res) {
    //Cambiar rol de usuario en un equipo
    try {
      const usrEnEquipo = await UsuarioEnEquipo.findOne({
        where: {
          equipoId: req.params.id,
          usuarioIdPersona: req.params.userId,
          activo: true,
        },
      });
      const oldRoleId = usrEnEquipo.roleId; //guardo el viejo para saber que el equipo ya no tiene este rol
      const rol = await Role.findOne({
        where: { nombre: req.body.rol, activo: true },
      });
      await usrEnEquipo.setRole(rol); //relaciono rol con tabla intermedia

      //info para crear evento:
      const usr = await Usuario.findOne({
        where: { idPersona: req.params.userId },
      });
      const equipo = await Equipo.findOne({ where: { id: req.params.id } });
      const server = generateAxios(req.body.token);
      const usrInfo = await server
        .get(`/personas/${req.params.userId}`)
        .then((res) => res.data);
      const coordInfo = await server
        .get(`/personas/${req.headers.idpersona}`)
        .then((res) => res.data);
      const evento = await equipo.createEvento({
        tipo: 2,
        nombreEquipo: equipo.nombre,
        nombreUsuario: usrInfo.nombres,
        nombreCoord: coordInfo.nombres,
        nombreRol: rol.nombre,
      });
      await usr.addEvento(evento); // <-- ^^^relaciono el evento con el equipo y con el usuario

      //el equipo ya no tiene el rol viejo pero si tiene el nuevo, sirve para cuando un rol es necesario.
      if (oldRoleId)
        await RolEnEquipo.update(
          { cantSatisfecha: Sequelize.literal("cantSatisfecha - 1") },
          { where: { equipoId: equipo.id, roleId: oldRoleId } }
        );
      await RolEnEquipo.update(
        { cantSatisfecha: Sequelize.literal("cantSatisfecha + 1") },
        { where: { equipoId: equipo.id, roleId: rol.id } }
      );
      return res.send("rol changed");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static getCantMiembros(req, res) {
    UsuarioEnEquipo.findAll({
      where: { equipoId: req.params.id, activo: true },
    })
      .then((usrEnEquipo) => res.send(usrEnEquipo))
      .catch((err) => res.status(500).send(err));
  }

  static async addRole(req, res) {
    try {
      console.log("entra");
      const equipo = await Equipo.findOne({ where: { id: req.params.id } });
      const rol = await Role.findOrCreate({
        where: { nombre: req.body.nombre },
      });
      const rolEnEquipo = await RolEnEquipo.findOne({
        where: { equipoId: req.params.id, roleId: rol[0].dataValues.id },
      });

      if (rolEnEquipo)
        RolEnEquipo.update(
          { cantNecesaria: req.body.cantNecesaria },
          { where: { equipoId: req.params.id, roleId: rol[0].dataValues.id } }
        ).then(() =>
          res
            .status(201)
            .send(
              "cantidades necesarias actualizadas: " +
                req.body.cantNecesaria +
                " " +
                req.body.nombre +
                " necesarios"
            )
        );
      else {
        rol
          .addEquipo(equipo)
          .then(() =>
            res
              .status(201)
              .send(
                "rol",
                req.body.nombre,
                "agregado al equipo.",
                req.body.cantNecesaria,
                "necesarios"
              )
          );
        console.log("mitad", rol[0].dataValues.id);
      }
      console.log("end");
    } catch (error) {
      console.log("fails");
      return res.status(500).send(error);
    }
  }

  static async removeUser(req, res) {
    //Esto solo lo realiza el coord del equipo
    try {
      await UsuarioEnEquipo.update(
        { activo: false },
        {
          where: {
            usuarioIdPersona: req.params.userId,
            equipoId: req.params.id,
          },
        }
      );
      const server = generateAxios(req.body.token);
      const usrInfo = await server
        .get(`/personas/${req.params.userId}`)
        .then((res) => res.data);
      const coordInfo = await server
        .get(`/personas/${req.headers.idpersona}`)
        .then((res) => res.data);
      const equipo = await Equipo.findOne({ where: { id: req.params.id } });
      const evento = await equipo.createEvento({
        tipo: -1,
        nombreEquipo: equipo.nombre,
        nombreUsuario: usrInfo.nombres,
        nombreCoord: coordInfo.nombres
      });
      const usuario = await Usuario.findOne({
        where: { idPersona: req.params.userId },
      });
      await usuario.addEvento(evento);
      return res.status(201).send("usuario eliminado del equipo");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async deactivateEquipo(req, res) {
    try {
      await Equipo.update({ activo: false }, { where: { id: req.params.id } });
      await UsuarioEnEquipo.update(
        { activo: false },
        {
          where: { equipoId: req.params.id },
        }
      );
      const equipo = await Equipo.findOne({ where: { id: req.params.id } });
      const server = generateAxios(req.headers.authorization);
      const coordInfo = await server
        .get(`/personas/${req.headers.idpersona}`)
        .then((res) => res.data);
      equipo
        .createEvento({
          tipo: -2,
          nombreCoord: coordInfo.nombres,
          nombreEquipo: equipo.nombre,
        })
        .then(() => res.status(201).send(equipo))
        .catch((err) => res.send(err));
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async activateEquipo(req, res) {
    try {
      await Equipo.update({ activo: true }, { where: { id: req.params.id } });
      await UsuarioEnEquipo.update(
        { activo: true },
        {
          where: {
            equipoId: req.params.id,
            usuarioIdPersona: req.headers.idpersona,
          },
        }
      );
      const equipo = await Equipo.findOne({ where: { id: req.params.id } });
      const server = generateAxios(req.headers.authorization);
      const coordInfo = await server
        .get(`/personas/${req.headers.idpersona}`)
        .then((res) => res.data);
      equipo
        .createEvento({
          tipo: 3,
          nombreCoord: coordInfo.nombres,
          nombreEquipo: equipo.nombre,
        })
        .then(() => res.status(200).send(equipo));
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static getHistory(req, res) {
    Equipo.findOne({ where: { id: req.params.id } })
      .then((equipo) => equipo.getEventos())
      .then((history) => res.send(history))
      .catch((err) => res.status(500).send(err));
  }
}

module.exports = EquipoController;
