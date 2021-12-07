const { Equipo, Usuario, UsuarioEnEquipo, Role } = require('../models');
const generateAxios = require('../utils/generateAxios');

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
            .then(equipo => equipo.activo ? res.send(equipo) : res.send("el equipo no esta activo"))
            .catch(err => res.status(500).send(err));
    }

    static updateEquipo(req, res) {
        Equipo.update(
            req.body,
            {
                where: { id: req.params.id },
                activo: true
            },
        )
            .then(() => res.send("equipo modificado"))
            .catch(err => res.status(500).send(err));
    }

    static async addUser(req, res) {
        try {
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            if (!equipo.activo) return res.send("el equipo no esta activo")
            const usr = await Usuario.findOne({ where: { idPersona: req.params.userId } })
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

    static async changeRole(req, res) { //Cambiar rol de usuario en un equipo
        try {
            console.log("im in!!!")
            const usrEnEquipo = await UsuarioEnEquipo.findOne({ where: { equipoId: req.params.id, usuarioIdPersona: req.params.userId, activo: true } })
            const rol = await Role.findOne({ where: { id: req.params.roleId, activo: true } })
            await usrEnEquipo.setRole(rol) //relaciono rol con tabla intermedia 
            const usr = await Usuario.findOne({ where: { idPersona: req.params.userId } })
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            console.log("i'll generate the axios", req.body.token)
            const server = generateAxios(req.body.token)
            const usrInfo = await server.get(`/personas/${req.params.userId}`).then(res => res.data)
            console.log("user info recived", usrInfo)
            const evento = await equipo.createEvento({
                tipo: 2,
                nombreEquipo: equipo.nombre,
                nombreUsuario: usrInfo.nombres,
                nombreRol: rol.nombre
            })
            console.log("event created")
            await usr.addEvento(evento)
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
            const usuario = await Usuario.findOne({ where: { id: req.params.userId }})
            await usuario.addEvento(evento)
            return res.status(201).send("usuario eliminado del equipo")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async deleteEquipo(req, res) {
        try {
            await Equipo.update({ activo: false }, { where: { id: req.params.id } })
            await UsuarioEnEquipo.update({ activo: false }, { where: { equipoId: req.params.id } })
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            equipo.createEvento({
                tipo: -2,
                nombreEquipo: equipo.nombre
            }).then(() => res.status(201).send("equipo desactivado"))
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