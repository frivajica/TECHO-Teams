const express = require("express")
const Router = express.Router();
const { RoleController } = require("../controllers");

Router.get("/", RoleController.getRoles)

Router.post("/", RoleController.crearRoles )

module.exports = Router;