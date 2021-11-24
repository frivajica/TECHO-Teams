const router = require("express").Router();
const equipos = require("./equipos");

router.use("/equipos", equipos);

module.exports = router;
