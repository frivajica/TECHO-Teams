const { Role, Usuario } = require('../models');

class RoleController {
    static createRole(req, res) {
        Role.create(req.body)
        .then( newRole => res.status(201).send(newRole))
        .catch(err => res.status(500).send(err));
    }

    static getRoles(req, res) {
        Role.findAll()
        .then( roleList => {
            let listaRoles = [];
            for (let role of roleList) {
                if (role.activo) listaRoles.push(role);
            }
            return listaRoles;
        })
        .then( listaRoles => res.status(200).send(listaRoles))
        .catch(err => res.status(500).send(err));
    }

    static borrarRole(req, res) {
        if (req.params.id === "1") return res.status(401).send("el rol coordinador no puede ser eliminado")
        else {
            Role.update({activo: false},{where: {id: req.params.id}})
            .then(() => res.send("rol eliminado"))
        }
    }

    static updateRole(req, res) {
        if (req.params.id === "1") return res.status(401).send("el rol coordinador no puede ser modificado")
        else {
            Role.update(
                req.body,
                {
                    where: {id: req.params.id},
                    activo: true
                },
            )
            .then(() => res.send("rol modificado"))
            .catch(err => res.status(500).send(err));
        }
    }

    static getUsuarios(req, res) {
        Role.findOne({where: {id: req.params.id }})
        .then( rol => rol.getUsrEnEquipo())
        .then( async usrList => {
            let realUsrs = [];
            for (let i=0; i < usrList.length; i++) {
                try {
                    const usrToAdd = await Usuario.findOne({where: {id: usrList[i].usuarioId}})
                    realUsrs.push(usrToAdd);
                } catch (error) {
                    return res.status(500).send(error)
                }
            }
            return res.status(201).send(realUsrs)
        })
        .catch(err => res.status(500).send(err));
    }
}

module.exports = RoleController;