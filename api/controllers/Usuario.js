const { Usuario } = require('../models');

class UsuarioController {
    static crearUsuario(req, res) {
        Usuario.create({...req.body})
        .then( newUser => res.status(201).send(newUser))
        .catch(err => res.status(500).send(err));
    }

    static getUsuarios(req, res) {
        Usuario.findAll()
        .then( userList => res.status(200).send(userList))
        .catch(err => res.status(500).send(err));
    }
}

module.exports = UsuarioController;