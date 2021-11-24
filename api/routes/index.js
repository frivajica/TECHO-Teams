const express = require("express");
const router = express.Router();
const equipos = require("./equipos");

router.use("/equipos", equipos);
// router.use("/equipos", actividades);

module.exports = router;
