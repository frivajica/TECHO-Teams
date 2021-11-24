const router = require("express").Router();
const equipos = require("../models/equipos");

router.use("/equipos", equipos);

module.exports = router;
