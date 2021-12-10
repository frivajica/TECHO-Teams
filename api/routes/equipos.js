const express = require("express")
const Router = express.Router();
const { EquipoController } = require("../controllers");
const { checkAuthAndAdmin, checkAuth, isCoordinatorHere } = require("../middlewares/auth");

Router.post("/", /* checkAuthAndAdmin, */ EquipoController.createEquipo )

Router.get("/", /* checkAuthAndAdmin, */ EquipoController.getEquipos )

Router.get("/:id", /* checkAuth, */ EquipoController.getOneEquipo )

Router.put("/:id", /* isCoordinatorHere, */ EquipoController.updateEquipo )

Router.put("/desactivar/:id", /* isCoordinatorHere, */ EquipoController.deactivateEquipo )

Router.put("/activar/:id", /* isCoordinatorHere, */ EquipoController.activateEquipo )

Router.get("/:id/historial", /* checkAuth, */ EquipoController.getHistory )

Router.get("/:id/usuarios", /* checkAuth, */ EquipoController.getUsers)

Router.get("/cantMiembros/:id", EquipoController.getCantMiembros)

Router.put("/:id/:userId", /* isCoordinatorHere, */  EquipoController.addUser)

Router.post("/:id/roles", /* isCoordinatorHere, */  EquipoController.addRole)

Router.delete("/:id/:userId", /* isCoordinatorHere, */ EquipoController.removeUser)

Router.put("/:id/:userId/:roleId", /* isCoordinatorHere, */ EquipoController.changeRole)


module.exports = Router;
