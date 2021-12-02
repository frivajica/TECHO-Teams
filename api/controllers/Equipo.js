const { Equipo, Usuario, UsuarioEnEquipo, Role } = require('../models');

class EquipoController {

    static createEquipo(req, res) {
        Equipo.create(req.body)
            .then(newTeam => {
                newTeam.createEvento({
                    descripcion: "se creo el equipo " + newTeam.nombre,
                    tipo: 0
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

    static addUser(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => {
                if (!equipo.activo) return res.send("el equipo no esta activo")
                Usuario.findOne({ where: { idPersona: req.params.userId } })
                    .then(usr => {
                        equipo.addUsuario(usr)
                            .then(() => {
                                equipo.createEvento({//evento para el historial del equipo
                                    descripcion: "nuevo voluntario en el equipo",
                                    tipo: 1
                                })
                                    .then(event => usr.addEvento(event)) //el evento tambien se vincula con el historial del usuario
                                    .then(() => res.send("usuario agregado"))
                                    .catch(err => res.status(500).send(err))
                            })
                            .catch(err => res.status(500).send(err));
                    })
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
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

    static changeRole(req, res) {
        UsuarioEnEquipo.findOne({ where: { equipoId: req.params.id, usuarioIdPersona: req.params.userId, activo: true } })
            .then(usrEnEquipo => {
                Role.findOne({ where: { id: req.params.roleId, activo: true } })
                    .then(rol => {
                        usrEnEquipo.setRole(rol) //relaciono rol con tabla intermedia 
                        return rol
                    })
                    .then(rol => {
                        //busco el usuario para asociar su evento
                        Usuario.findOne({ where: { idPersona: req.params.userId } })
                            .then(usr => {
                                //busco el equipo para asociar su evento
                                Equipo.findOne({ where: { id: req.params.id } })
                                    .then(equipo => {
                                        equipo.createEvento({
                                            descripcion: "cambió su rol a " + rol.nombre,
                                            tipo: 2
                                        })
                                            .then(event => usr.addEvento(event))
                                            .then(() => res.send("rol changed"))
                                            .catch(err => res.status(500).send(err))
                                    })
                                    .catch(err => res.status(500).send(err))
                            })
                            .catch(err => res.status(500).send(err))
                    })
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    }

    static removeUser(req, res) {
        UsuarioEnEquipo.update({
            activo: false
        }, {
            where: {
                usuarioIdPersona: req.params.userId,
                equipoId: req.params.id
            }
        })
            .then(() => {
                Equipo.findOne({ where: { id: req.params.id } })
                    .then(equipo => {
                        equipo.createEvento({
                            descripcion: "se elimino al usuario del equipo " + equipo.nombre,
                            tipo: -1
                        })
                            .then(() => res.status(201).send("usuario eliminado del equipo"))
                            .catch(() => res.status(500).send(err));
                    })
                    .catch(() => res.status(500).send(err));
            })
            .catch(() => res.status(500).send(err));
    }

    static deleteEquipo(req, res) {
        Equipo.update({ activo: false }, { where: { id: req.params.id } })
            .then(() => UsuarioEnEquipo.update({ activo: false }, { where: { equipoId: req.params.id } })
                .then(() => res.send("equipo desactivado")))
            .catch(() => res.status(500).send(err));
    }

    static getHistory(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => equipo.getEventos())
            .then(history => res.send(history))
            .catch(err => res.status(500).send(err))
    }

    static createRole(req, res) {
        Role.create(req.body)
            .then(newRole => {
                Equipo.findOne({ where: { id: req.params.id } })
                    .then(equipo => equipo.addRole(newRole))
                    .then(() => res.status(201).send(newRole))
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    }

    static getRoles(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => equipo.getRoles())
            .then(roles => res.status(201).send(roles))
    }


}

module.exports = EquipoController;