const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());

app.use(morgan("combined"));
