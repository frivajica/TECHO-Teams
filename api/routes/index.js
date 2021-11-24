const router = require("express").Router();
const equipos = require("../models/Equipo");
// const actividades = require("../models/Actividades");

router.use("/equipos", equipos);
// router.use("/equipos", actividades);

module.exports = router;
