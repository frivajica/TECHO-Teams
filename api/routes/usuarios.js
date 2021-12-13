const express = require("express");
const Router = express.Router();
const { UsuarioController } = require("../controllers");

Router.get("/", UsuarioController.getUsuarios);

Router.get("/filtrar/id/:id", UsuarioController.getUsuarioById); //un solo usuario

Router.get("/filtrar/mail/:mail", UsuarioController.getUsuarioByMail)

Router.post("/", UsuarioController.crearUsuarioEquipos);

Router.post("/registrar", UsuarioController.crearUsuario);

Router.post("/login", UsuarioController.loginInUsuario);

Router.post("/logout", UsuarioController.logoutUsuario);

Router.get("/historial/:userId", UsuarioController.getHistorial);

Router.post( "/registrarDesdeActividades", UsuarioController.crearUsuarioEquipos);

Router.put("/editarUsuario/:id", UsuarioController.editarUsuario)
Router.put("/borradoSuave/:id",UsuarioController.borradoSuave)

Router.get("/:idPersona/misEquipos", UsuarioController.getEquipos)

Router.get("/misActividades", UsuarioController.getActividades)

module.exports = Router;
