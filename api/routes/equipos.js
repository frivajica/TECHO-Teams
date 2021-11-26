const express = require("express")
const Router = express.Router();
const {EquipoController} = require("../controllers");

Router.post("/", EquipoController.crearEquipo )

Router.get("/", EquipoController.getEquipos )

Router.get("/:id", EquipoController.getOneEquipo )

Router.put("/:id", EquipoController.updateEquipo )

Router.get("/:id/usuarios", EquipoController.getUsers)

Router.put("/:id/:userId", EquipoController.addUser)

Router.put("/:id/:userId/:roleId", EquipoController.changeRole)

Router.delete("/:id/:userId", EquipoController.deleteUser)


module.exports = Router;
