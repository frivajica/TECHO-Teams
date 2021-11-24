const express = require("express")
const router = express.Router();
const equipos = require("./equipos");

router.use("/equipos", equipos);

module.exports = router;
