const express = require("express")
const Router = express.Router();
const { EquipoController } = require("../controllers");
const { checkAuthAndAdmin, checkAuth, isCoordinatorHere } = require("../middlewares/auth");

Router.post("/", /* checkAuthAndAdmin, */ EquipoController.createEquipo )

Router.get("/", /* checkAuthAndAdmin, */ EquipoController.getEquipos )

Router.get("/:id", /* checkAuth, */ EquipoController.getOneEquipo )

Router.put("/:id", /* isCoordinatorHere, */ EquipoController.updateEquipo )

Router.delete("/:id", /* isCoordinatorHere, */ EquipoController.deleteEquipo )

Router.get("/:id/usuarios", /* checkAuth, */ EquipoController.getUsers)

Router.put("/:id/:userId", /* isCoordinatorHere, */  EquipoController.addUser)

Router.delete("/:id/:userId", /* isCoordinatorHere, */ EquipoController.removeUser)

Router.put("/:id/:userId/:roleId", /* isCoordinatorHere, */ EquipoController.changeRole)


module.exports = Router;
