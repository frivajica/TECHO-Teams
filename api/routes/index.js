const express = require("express");
const router = express.Router();
const equipos = require("./equipos");
const usuarios = require("./usuarios");
const roles = require("./roles");

router.use("/equipos", equipos);
// router.use("/equipos", actividades);
router.use("/usuarios", usuarios);
router.use("/roles", roles);

module.exports = router;
