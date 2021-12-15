const express = require("express");
const router = express.Router();
const equipos = require("./equipos");
const usuarios = require("./usuarios");
const roles = require("./roles");
const regiones = require("./regiones");
const sedes = require("./sedes");
const comunidades = require("./comunidades");
const areas = require("./areas");

router.use("/equipos", equipos);
router.use("/usuarios", usuarios);
router.use("/roles", roles);
router.use("/regiones", regiones);
router.use("/sedes", sedes);
router.use("/comunidades", comunidades);
router.use("/areas", areas);

module.exports = router;
