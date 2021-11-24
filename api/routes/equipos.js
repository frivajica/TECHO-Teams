const express = require("express")
const Router = express.Router();
const {EquipoController} = require("../controllers");

Router.post("/nuevo_equipo", EquipoController.crearEquipo )

Router.get("/", EquipoController.getEquipos )

Router.get("/:id", EquipoController.getOneEquipo )

Router.put("/:id", EquipoController.updateEquipo )

module.exports = Router;
