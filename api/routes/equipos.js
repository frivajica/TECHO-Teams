const express = require("express");
const Router = express.Router();
const { EquipoController, uploadEquipo } = require("../controllers");
const {
  belongsToEquipo,
  isAdminOrCoordinator,
  isAdminOrCoordinatorHere,
} = require("../middlewares/auth");

Router.post("/", isAdminOrCoordinator, uploadEquipo, EquipoController.createEquipo);

Router.get("/", EquipoController.getEquipos);

Router.get("/:id", belongsToEquipo, EquipoController.getOneEquipo);

Router.put("/:id", isAdminOrCoordinatorHere, uploadEquipo, EquipoController.updateEquipo);

Router.put("/desactivar/:id", isAdminOrCoordinatorHere, EquipoController.deactivateEquipo);

Router.put("/activar/:id", isAdminOrCoordinatorHere, EquipoController.activateEquipo);

Router.get("/:id/historial", EquipoController.getHistory);

Router.get("/:id/usuarios", EquipoController.getUsers);

Router.get("/cantMiembros/:id", EquipoController.getCantMiembros);

Router.get(
  "/:id/rolesEnEquipo",
  EquipoController.getRolesEnEquipo
);

Router.get(
  "/:id/usuariosDeEquipo",
  EquipoController.getUsuariosDeEquipo
);

Router.get("/:id/checkAdminCoordinator", isAdminOrCoordinatorHere)

Router.get("/:id/roles", EquipoController.getRoles);

Router.post("/:id/agregarRol", EquipoController.addRole);

Router.put("/:id/:userId", isAdminOrCoordinatorHere, EquipoController.addUser);

Router.delete("/:id/:userId", isAdminOrCoordinatorHere, EquipoController.removeUser);

Router.put("/:id/:userId/:roleId", isAdminOrCoordinatorHere, EquipoController.changeRole);

module.exports = Router;
