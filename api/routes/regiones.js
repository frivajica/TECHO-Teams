const express = require("express")
const Router = express.Router();
const { RegionesController } = require("../controllers")

Router.get("/paises", RegionesController.paises)
Router.get("/paises/:idPais/provincias", RegionesController.provincias)
Router.get("/paises/:idPais/provincias/:idProv/localidades", RegionesController.localidades)

module.exports = Router;