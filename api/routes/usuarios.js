const express = require("express");
const Router = express.Router();
const { UsuarioController } = require("../controllers");

Router.get("/", UsuarioController.getUsuarios);

Router.post("/registrar", UsuarioController.crearUsuario);

Router.get("/", UsuarioController.getUsuario); //un solo usuario

Router.post("/login", UsuarioController.loginInUsuario);

Router.post( "/registrarDesdeActividades", UsuarioController.crearUsuarioEquipos);

module.exports = Router;
