const { Equipo, Usuario, UsuarioEnEquipo, Role } = require('../models');

class EquipoController {

    static createEquipo(req, res) {
        Equipo.create({...req.body})
        .then( newTeam => res.status(201).send(newTeam))
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
            Usuario.findOne({where: {id: req.params.userId}})
            .then(usr => {
                equipo.addUsuario(usr)
                .then(usrEnEquipo => res.send(usrEnEquipo))
                .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }

    static getUsers(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then(team => team.getUsuarios())
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send(err));
    }

    static changeRole(req, res){
        UsuarioEnEquipo.findAll({where: {equipoId: req.params.id, usuarioId: req.params.userId}})
        .then(team => {
            Role.findOne({where: {id: req.params.roleId}})
            .then(rol => rol.addUsrEnEquipo(team) )
            .then(() => res.status(201).send("rol modificado"))
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }

    static removeUser(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then( equipo => {
            Usuario.findOne({where: {id: req.params.userId}})
            .then(usr => {
                equipo.removeUsuario(usr)
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


}

module.exports = EquipoController;