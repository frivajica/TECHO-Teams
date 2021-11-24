const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./config/database");

app.use(express.json());

app.use(morgan("combined"));

db.sync({ force: true }).then(() => {
    app.listen(3001, () => console.log("BACKEND HERE!! db sync done \nServidor escuchando en el puerto 3001 :D"));
  });
