const express = require("express");
const Router = express.Router();
const { AreasController } = require("../controllers");

Router.get("/", AreasController.getAreas);
Router.post("/create", AreasController.addAreas);

module.exports = Router;
