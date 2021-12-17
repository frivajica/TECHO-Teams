const express = require("express");
const Router = express.Router();
const { UsuarioController, upload } = require("../controllers");
const { checkAdmin } = require("../middlewares/auth");

Router.get("/", UsuarioController.getUsuarios);

Router.get("/filtrar/id/:id", UsuarioController.getUsuarioById); //un solo usuario

Router.get("/filtrar/mail/:mail", UsuarioController.getUsuarioByMail);

Router.post("/", UsuarioController.crearUsuarioEquipos);

Router.post("/registrar", /*upload*/ UsuarioController.crearUsuario);

Router.post("/login", UsuarioController.loginInUsuario);

Router.post("/logout", UsuarioController.logoutUsuario);

Router.put(
  "/:idPersona/toggleAdmin",
  checkAdmin,
  UsuarioController.toggleAdmin
);

Router.get("/historial/:userId", UsuarioController.getHistorial);

Router.post(
  "/registrarDesdeActividades",
  UsuarioController.crearUsuarioEquipos
);

Router.put("/editarUsuario/:id", UsuarioController.editarUsuario);

Router.put("/setCoord/:id", checkAdmin, UsuarioController.changeCoordAuth);

Router.get("/:idPersona/misEquipos", UsuarioController.getEquipos);

Router.get("/misActividades", UsuarioController.getActividades);

module.exports = Router;
