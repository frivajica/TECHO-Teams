const { fabClasses } = require("@mui/material");
const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./config/database");
const routes = require("./routes");
const cors = require("cors");
const Role = require("./models/Role");
const upsert = require("./utils/upsert");

app.use(cors());

app.use(express.json());

app.use(morgan("combined"));

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  upsert(Role, { id: 1 }, { nombre: "coordinador", id: "1" }) //el id de coordinador siempre debe ser 1
    .then(() => {
      app.listen(3001, () =>
        console.log(
          "BACKEND HERE!! db sync done \nServidor escuchando en el puerto 3001 :D"
        )
      );
    })
    .catch((err) => console.log(err));
});
