const express = require("express");
const Router = express.Router();
const { EquipoController } = require("../controllers");
const {
  checkAdmin,
  checkAuth,
  isAdminOrCoordinatorHere,
} = require("../middlewares/auth");

Router.post("/", /* checkAuthAndAdmin, */ EquipoController.createEquipo);

Router.get("/", /* checkAuthAndAdmin, */ EquipoController.getEquipos);

Router.get("/:id", /* checkAuth, */ EquipoController.getOneEquipo);

Router.put("/:id", isAdminOrCoordinatorHere, EquipoController.updateEquipo);

Router.put("/desactivar/:id", isAdminOrCoordinatorHere, EquipoController.deactivateEquipo);

Router.put("/activar/:id", isAdminOrCoordinatorHere, EquipoController.activateEquipo);

Router.get("/:id/historial", /* checkAuth, */ EquipoController.getHistory);

Router.get("/:id/usuarios", /* checkAuth, */ EquipoController.getUsers)

Router.get("/cantMiembros/:id", EquipoController.getCantMiembros);

Router.put("/:id/:userId", isAdminOrCoordinatorHere, EquipoController.addUser);

Router.post("/:id/roles", isAdminOrCoordinatorHere, EquipoController.addRole);

Router.delete("/:id/:userId", isAdminOrCoordinatorHere, EquipoController.removeUser);

Router.put("/:id/:userId/:roleId", isAdminOrCoordinatorHere, EquipoController.changeRole);

module.exports = Router;
