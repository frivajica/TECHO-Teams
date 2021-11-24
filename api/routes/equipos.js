const express = require("express")
const Router = express.Router();
const {EquipoController} = require("../controllers");

Router.post("/", EquipoController.crearEquipo )

Router.get("/", EquipoController.getEquipos )

Router.get("/:id", EquipoController.getOneEquipo )

Router.put("/:id", EquipoController.updateEquipo )

Router.put("/:id/:userId", EquipoController.addUserToEquipo)

Router.get("/:id/actividades", EquipoController.getActividades)

module.exports = Router;
