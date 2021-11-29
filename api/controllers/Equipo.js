const { Equipo, Usuario, UsuarioEnEquipo, Role } = require('../models');

class EquipoController {

    static createEquipo(req, res) {
        Equipo.create(req.body)
        .then( newTeam => {
            newTeam.createEvento({
                descripcion: "se creo el equipo "+newTeam.nombre
            })
            .then( () => res.status(201).send(newTeam))
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }

    static getEquipos(req, res) {
        Equipo.findAll()
        .then( teamList => res.status(200).send(teamList))
        .catch(err => res.status(500).send(err));
    }

    static getOneEquipo(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then( equipo => res.status(200).send(equipo))
        .catch(err => res.status(500).send(err));
    }

    static updateEquipo(req, res) {
        Equipo.update(
            req.body,
            {
                where: {id: req.params.id}
            },
        )
        .then(() => res.send("equipo modificado"))
        .catch(err => res.status(500).send(err));
    }

    static addUser(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then( equipo => {
            Usuario.findOne({where: {idPersona: req.params.userId}})
            .then(usr => {
                equipo.addUsuario(usr)
                .then(usrEnEquipo => {
                    console.log("this is user!!!",usr)
                    equipo.createEvento({
                        descripcion: usr.nombre+" se unió al equipo, bienvenido! :)"
                    })
                    .then(() => res.send(usrEnEquipo))
                })
                .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }

    static getUsers(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then(equipo => equipo.getUsuarios())
        .then(users => res.send(users))
        .catch(err => res.status(500).send(err));
    }

    static changeRole(req, res){
        UsuarioEnEquipo.findAll({where: {equipoId: req.params.id, usuarioId: req.params.userId}})
        .then(equipo => {
            Role.findOne({where: {id: req.params.roleId}})
            .then(rol => {
                rol.addUsrEnEquipo(equipo); 
                return rol
            })
            .then( rol => {
                Usuario.findOne({where: {idPersona: req.params.userId}})
                .then(usr => {
                    equipo.createEvento({
                        descripcion: usr.nombre+" cambió su rol a "+rol.nombre
                    })
                    .then(()=> res.send("rol changed"))
                    .catch(err => res.status(500).send(err))
                })
                .catch(err => res.status(500).send(err))
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }

    static removeUser(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then( equipo => {
            Usuario.findOne({where: {idPersona: req.params.userId}})
            .then(usr => {
                equipo.removeUsuario(usr)
                .then(() => equipo.createEvento({
                       descripcion: "se elimino al usuario "+usr.nombre+" del equipo "+equipo.nombre
                    }
                ))
                .then(() => res.status(201).send("usuario eliminado del equipo"))
                .catch(() => res.status(500).send("no eliminado"));
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }

    static deleteEquipo(req, res) {
        Equipo.destroy({where: {id: req.params.id}})
        .then( () => res.send("equipo eliminado"))
        .catch(() => res.status(500).send("no eliminado"));
    }

    static getHistory(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then(equipo => equipo.getEventos())
        .then(history => res.send(history))
        .catch(err => res.status(500).send(err))
    }


}

module.exports = EquipoController;