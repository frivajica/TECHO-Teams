const { Usuario } = require("../models");
import axios from "axios"

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

  static 
  (req, res) {
    axios.post("https://sandbox.actividades.techo.org/api/register", {
        idPais: 1,
        idUnidadOrganizacional: 0,
        nombres: "Agustín",
        apellidoPaterno: "Vilas",
        fechaNacimiento: "1989-10-19 00:00:00",
        telefono: "11",
        telefonoMovil: "1154915915",
        sexo: "M",
        dni: "34905669",
        mail: "prueba.p5@gmail.com",
        recibirMails: 1,
        acepta_marketing: null,
        email_verified_at: "2021-01-13 13:57:35",
        deleted_at: null
    })
    //then((res) => Usuario.create())
  }

}

module.exports = UsuarioController;
