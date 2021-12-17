const express = require("express");
const Router = express.Router();
const { EquipoController } = require("../controllers");
const {
  checkAdmin,
  checkAuth,
  belongsToEquipo,
  isAdminOrCoordinator,
  isAdminOrCoordinatorHere,
} = require("../middlewares/auth");

Router.post("/", isAdminOrCoordinator, EquipoController.createEquipo);

Router.get("/", /* checkAuthAndAdmin, */ EquipoController.getEquipos);

Router.get("/:id", belongsToEquipo, EquipoController.getOneEquipo);

Router.put("/:id", isAdminOrCoordinatorHere, EquipoController.updateEquipo);

Router.put("/desactivar/:id", isAdminOrCoordinatorHere, EquipoController.deactivateEquipo);

Router.put("/activar/:id", isAdminOrCoordinatorHere, EquipoController.activateEquipo);

Router.get("/:id/historial", /* checkAuth, */ EquipoController.getHistory);

Router.get("/:id/usuarios", /* checkAuth, */ EquipoController.getUsers);

Router.get("/cantMiembros/:id", EquipoController.getCantMiembros);

Router.get(
  "/:id/rolesEnEquipo",
  /* isCoordinatorHere, */ EquipoController.getRolesEnEquipo
);

Router.get(
  "/:id/usuariosDeEquipo",
  /* isCoordinatorHere, */ EquipoController.getUsuariosDeEquipo
);

Router.get("/:id/roles", /* isCoordinatorHere, */ EquipoController.getRoles);

Router.post("/:id/agregarRol", /* isCoordinatorHere, */ EquipoController.addRole);

Router.put("/:id/:userId", isAdminOrCoordinatorHere, EquipoController.addUser);

Router.delete("/:id/:userId", isAdminOrCoordinatorHere, EquipoController.removeUser);

Router.put("/:id/:userId/:roleId", isAdminOrCoordinatorHere, EquipoController.changeRole);

module.exports = Router;
