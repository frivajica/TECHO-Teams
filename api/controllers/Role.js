const { Role } = require('../models');

class RoleController {
    static crearRoles(req, res) {
        Role.create(req.body)
        .then( newRole => res.status(201).send(newRole))
        .catch(err => res.status(500).send(err));
    }

    static getRoles(req, res) {
        Role.findAll()
        .then( roleList => res.status(200).send(roleList))
        .catch(err => res.status(500).send(err));
    }
}

module.exports = RoleController;