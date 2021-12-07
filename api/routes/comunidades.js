const express = require("express");
const Router = express.Router();
const { ComunidadesController } = require("../controllers");

Router.get("/", ComunidadesController.comunidades);

module.exports = Router;
