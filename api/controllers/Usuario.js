const { Usuario } = require("../models");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

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
    const formData = new FormData();

    formData.append("mail", "prueba.registro@mail.com");
    formData.append("password", "12345678");
    formData.append("password_confirmation", "12345678");
    formData.append("nombres", "Carlos");
    formData.append("apellidoPaterno", "Bilardo");
    formData.append("fechaNacimiento", "1990-01-01");
    formData.append("telefono", "123451331");
    formData.append("telefonoMovil", "112234454");
    formData.append("dni", "30303668");
    formData.append("recibirMails", 1);
    formData.append("acepta_marketing", 0);
    formData.append("idPais", 1);
    formData.append("idUnidadOrganizacional", 0);

    const formHeaders = formData.getHeaders();

    axios
      .post("https://sandbox.actividades.techo.org/api/register", formData, {
        headers: {
          ...formHeaders,
        },
      })
      .then((rta) => res.send(rta));
    //then((res) => Usuario.create())
  }
}

module.exports = UsuarioController;
