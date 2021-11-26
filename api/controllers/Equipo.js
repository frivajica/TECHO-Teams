const { Equipo, Usuario, UsuarioEnEquipo, Role } = require('../models');
const axios = require('axios');

class EquipoController {

    static crearEquipo(req, res) {
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
        .then( () => {
            Equipo.findOne({where: {id: req.params.id}})
            .then(res => res.dataValues)
            .then( updatedTeam => res.status(204).send(updatedTeam))//todavia no puedo hacer que lo devuelva 
            .catch(err => res.status(500).send(err));
        })
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
            .then(() => res.status(204).send("rol added"))
        })
        .catch(err => res.status(500).send(err));
    }

    static deleteUser(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then( equipo => {
            Usuario.findOne({where: {id: req.params.userId}})
            .then(usr => {
                equipo.removeUsuario(usr)
                .then(() => res.sendStatus(204))
                .catch(err => res.status(500).send("not removed",err))
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }


}

module.exports = EquipoController;