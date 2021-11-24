const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./config/database");
const routes = require("./routes/index");

app.use(express.json());

app.use(morgan("combined"));

app.use("/", routes);

db.sync({ force: false }).then(() => {
  app.listen(3001, () =>
    console.log(
      "BACKEND HERE!! db sync done \nServidor escuchando en el puerto 3001 :D"
    )
  );
});
