const express = require("express");
const router = express.Router();
const equipos = require("./equipos");
const usuarios = require("./usuarios");
const roles = require("./roles");
const regiones = require("./regiones")

router.use("/equipos", equipos);
router.use("/usuarios", usuarios);
router.use("/roles", roles);
router.use("/regiones", regiones)

module.exports = router;
