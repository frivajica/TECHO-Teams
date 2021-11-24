const express = require("express");
const router = express.Router();
const equipos = require("./equipos");
const usuarios = require("./usuarios");

router.use("/equipos", equipos);
// router.use("/equipos", actividades);
router.use("/usuarios", usuarios);
module.exports = router;
