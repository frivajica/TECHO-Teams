const express = require("express");
const Router = express.Router();
const { UsuarioController } = require("../controllers");

Router.get("/", UsuarioController.getUsuarios);

Router.get("/filtrar/id/:id", UsuarioController.getUsuarioById); //un solo usuario

Router.get("/filtrar/mail/:mail", UsuarioController.getUsuarioByMail)

Router.post("/", UsuarioController.crearUsuarioEquipos);

Router.post("/registrar", UsuarioController.crearUsuario);

Router.post("/login", UsuarioController.loginInUsuario);

Router.get("/historial/:userId", UsuarioController.getHistorial);

Router.post( "/registrarDesdeActividades", UsuarioController.crearUsuarioEquipos);

Router.put("/editarUsuario/:id", UsuarioController.editarUsuario)

Router.get("/:idPersona/misEquipos", UsuarioController.getEquipos)

module.exports = Router;
