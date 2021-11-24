const { Equipo } = require('../models');

class EquipoController {

    static async crearEquipo(req, res) {
        Equipo.create({...req.body})
        .then( newTeam => res.status(201).send(newTeam))
        .catch(err => res.status(500).send(err));
    }

    static async getEquipos(req, res) {
        Equipo.findAll()
        .then( newTeam => res.status(200).send(newTeam))
        .catch(err => res.status(500).send(err));
    }

    static async getOneEquipo(req, res) {
        Equipo.findOne({where: {id: req.params.id}})
        .then( equipo => res.status(200).send(equipo))
        .catch(err => res.status(500).send(err));
    }

    static async updateEquipo(req, res) {
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



}

module.exports = EquipoController;