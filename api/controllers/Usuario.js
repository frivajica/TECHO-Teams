const { Usuario } = require("../models");
const axios = require("axios")
const superagent = require('superagent');

class UsuarioController {
  static crearUsuario(req, res) {
    Usuario.create({ ...req.body })
      .then((newUser) => res.status(201).send(newUser))
      .catch((err) => res.status(500).send(err));
  }

  static getUsuarios(req, res) {
    Usuario.findAll()
      .then((userList) => res.status(200).send(userList))
      .catch((err) => res.status(500).send(err));
  }

  static getUsuario(req, res) {
    Usuario.findOne({ where: { id: req.params.id } })
      .then((user) => res.send(user))
      .catch((err) => res.status(500).send(err));
  }

  static crearUsuarioPrueba(req, res) {
   superagent.post("https://sandbox.actividades.techo.org/api/register")
   .send(req.body)
   .set('X-API-Key', 'foobar')
   .set('Accept', 'application/json')
    .then((r) => JSON.parse(r.text))
    .then(newUser => res.status(201).send(newUser))
    .catch(err => res.status(500).send(err))
  }

  static loginInUsuarioPrueba(req, res) {
    superagent.post("https://sandbox.actividades.techo.org/api/login")
    .send(req.body)
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .then((r) => JSON.parse(r.text))
    .then(user => res.status(200).send(user))
    .catch(err => res.status(401).send("Error de logueo"))
  }
}

module.exports = UsuarioController;
