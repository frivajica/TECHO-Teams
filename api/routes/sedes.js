const express = require("express");
const Router = express.Router();
const { SedesController } = require("../controllers");

Router.get("/", SedesController.sedes);

module.exports = Router;
