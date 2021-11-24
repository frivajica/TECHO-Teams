const { Equipo, Usuario } = require('../models');
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

    static getActividades(req, res) {
        axios.get("https://actividades.techo.org/seleccionar-pais/13")
        .then(()=>{
            axios.get("https://actividades.techo.org/ajax/actividades")
            .then(res => res.data)
            .then(activ => res.status(200).send(activ));
        })
    }

    static addUserToEquipo(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then( equipo => {
            Usuario.findOne({where: {id: req.params.userId}})
            .then(usr => usr.addEquipo(equipo))
            .then(() => res.sendStatus(204))
        })
        .then()
        .catch(err => res.status(500).send(err));
    }


}

module.exports = EquipoController;