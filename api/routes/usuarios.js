const express = require("express")
const Router = express.Router();
const { UsuarioController } = require("../controllers");

Router.get("/", UsuarioController.getUsuarios)

Router.post("/", UsuarioController.crearUsuario )

Router.get("/", UsuarioController.getUsuario )		//un solo usuario

module.exports = Router;