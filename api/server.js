const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./config/database")

app.use(express.json());

app.use(morgan("combined"));

db.sync({})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);