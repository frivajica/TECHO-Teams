const express = require("express");
const Router = express.Router();
const { UsuarioController } = require("../controllers");

Router.get("/", UsuarioController.getUsuarios);

Router.get("/", UsuarioController.getUsuario); //un solo usuario

Router.post("/", UsuarioController.crearUsuarioEquipos);

Router.post("/registrar", UsuarioController.crearUsuario);

Router.post("/login", UsuarioController.loginInUsuario);

Router.get("/historial/:userId", UsuarioController.getHistorial);

Router.post( "/registrarDesdeActividades", UsuarioController.crearUsuarioEquipos);

module.exports = Router;
