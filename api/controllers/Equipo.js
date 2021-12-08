const { Equipo, Usuario, UsuarioEnEquipo, Role, RolEnEquipo } = require('../models');
const generateAxios = require('../utils/generateAxios');
const upsert = require('../utils/upsert');
const Sequelize = require("sequelize");

class EquipoController {

    static createEquipo(req, res) {
        Equipo.create(req.body)
            .then(newTeam => {
                newTeam.createEvento({
                    tipo: 0,
                    nombreEquipo: newTeam.nombre
                })
                    .then(() => res.status(201).send(newTeam))
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    }

    static getEquipos(req, res) {
        Equipo.findAll()
            .then(teamList => {
                let listaEquipos = [];
                for (let team of teamList) {
                    if (team.activo) listaEquipos.push(team)
                }
                return listaEquipos
            })
            .then(listaEquipos => res.status(200).send(listaEquipos))
            .catch(err => res.status(500).send(err));
    }

    static getOneEquipo(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => res.status(200).send(equipo))
            .catch(err => res.status(500).send(err));
    }

    static updateEquipo(req, res) {
        Equipo.update(
            req.body,
            { where: { id: req.params.id } },
        )
            .then(() => Equipo.findOne({ where: { id: req.params.id } }))
            .then(updatedEquipo => res.status(200).send(updatedEquipo))
            .catch(err => res.status(500).send(err));
    }

    static async addUser(req, res) {
        try {
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            if (!equipo.activo) return res.send("el equipo no esta activo")
            const usr = await Usuario.findOne({ where: { idPersona: req.params.userId } })
            const checkUsr = await UsuarioEnEquipo.findOne({
                where: { usuarioIdPersona: usr.idPersona, equipoId: equipo.id },
              });
              if (checkUsr) return res.send("el usuario ya pertenece al equipo");
            await equipo.addUsuario(usr)
            const server = generateAxios(req.body.token)
            const usrInfo = await server.get(`/personas/${req.params.userId}`).then(res => res.data)
            const evento = await equipo.createEvento({//evento para el historial del equipo
                tipo: 1,
                nombreEquipo: equipo.nombre,
                nombreUsuario: usrInfo.nombres
            })
            await usr.addEvento(evento)
            return res.send("usuario agregado")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static getUsers(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => {
                equipo.getUsuarios()
                    .then(listaUsrs => res.send(listaUsrs))
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    }

    static async addRole(req, res) {
        try {
            const equipo = await Equipo.findOne({ where: { id: req.params.id}})
            const rol = await Role.findOrCreate({ where: {nombre: req.body.nombre}})
            const rolEnEquipo = await RolEnEquipo.findOne({ where: { equipoId: equipo.id, roleId: rol.id }})
            if (rolEnEquipo) RolEnEquipo.update(
                    {cantNecesaria: req.body.cantNecesaria}, 
                    {where: { equipoId: equipo.id, roleId: rol.id }})
                    .then(() => res.status(201).send("cantidades necesarias actualizadas: "+req.body.cantNecesaria+" "+req.body.nombre+" necesarios"))
            else equipo.setRole({through: {cantNecesaria: req.body.cantNecesaria}})
                .then(() => res.status(201).send("rol",req.body.nombre,"agregado al equipo.",req.body.cantNecesaria,"necesarios"))
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async getRoles(req, res) {
        try {
            const roles = await equipo.getRoles()
            return res.send(roles);
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async changeRole(req, res) { //Cambiar rol de usuario en un equipo
        try {
            const usrEnEquipo = await UsuarioEnEquipo.findOne({ where: { equipoId: req.params.id, usuarioIdPersona: req.params.userId, activo: true } })
            const oldRoleId = usrEnEquipo.roleId;//guardo el viejo para saber que el equipo ya no tiene este rol
            const rol = await Role.findOne({ where: { id: req.params.roleId, activo: true } })
            await usrEnEquipo.setRole(rol) //relaciono rol con tabla intermedia 

            //info para crear evento:
            const usr = await Usuario.findOne({ where: { idPersona: req.params.userId } })
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            const server = generateAxios(req.body.token)
            const usrInfo = await server.get(`/personas/${req.params.userId}`).then(res => res.data)
            const evento = await equipo.createEvento({
                tipo: 2,
                nombreEquipo: equipo.nombre,
                nombreUsuario: usrInfo.nombres,
                nombreRol: rol.nombre
            })
            await usr.addEvento(evento)// <-- ^^^relaciono el evento con el equipo y con el usuario

            //el equipo ya no tiene el rol viejo pero si tiene el nuevo, sirve para cuando un rol es necesario.
            if (oldRoleId) await RolEnEquipo.update(
                { cantSatisfecha: Sequelize.literal('cantSatisfecha - 1') }, 
                {where: {equipoId: equipo.id, roleId: oldRoleId}})
            await RolEnEquipo.update(
                { cantSatisfecha: Sequelize.literal('cantSatisfecha + 1') }, 
                {where: {equipoId: equipo.id, roleId: rol.id}})
            return res.send("rol changed")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async removeUser(req, res) { //Esto solo lo realiza el coord del equipo
        try {
            await UsuarioEnEquipo.update({ activo: false }, {
                where: {
                    usuarioIdPersona: req.params.userId,
                    equipoId: req.params.id
                }
            })
            const server = generateAxios(req.body.token)
            const usrInfo = await server.get(`/personas/${req.params.userId}`).then(res => res.data)
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            const evento = await equipo.createEvento({
                tipo: -1,
                nombreEquipo: equipo.nombre,
                nombreUsuario: usrInfo.nombres
            })
            const usuario = await Usuario.findOne({ where: { id: req.params.userId } })
            await usuario.addEvento(evento)
            return res.status(201).send("usuario eliminado del equipo")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async deactivateEquipo(req, res) {
        try {
            await Equipo.update({ activo: false }, { where: { id: req.params.id } })
            await UsuarioEnEquipo.update({ activo: false }, { where: { equipoId: req.params.id } })
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
             equipo.createEvento({
                tipo: -2,
                nombreEquipo: equipo.nombre
            }).then(() => res.status(201).send(equipo))
            .catch(err => res.send(err))
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async activateEquipo(req, res) {
        try {
            await Equipo.update({ activo: true }, { where: { id: req.params.id } })
            await UsuarioEnEquipo.update({ activo: true }, { where: { equipoId: req.params.id } })
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            equipo.createEvento({
                tipo: 3,
                nombreEquipo: equipo.nombre
            }).then(() => res.status(200).send(equipo))
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static getHistory(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => equipo.getEventos())
            .then(history => res.send(history))
            .catch(err => res.status(500).send(err))
    }

}

module.exports = EquipoController;