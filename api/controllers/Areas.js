const { Area } = require("../models");

class AreasController {
  static getAreas(req, res) {
    Area.findAll()
      .then((areas) => res.status(200).send(areas))
      .catch((err) => res.status(500).send(err));
  }

  static addAreas(req, res) {
    Area.create(req.body)
      .then((newArea) => res.status(201).send(newArea))
      .catch((err) => res.status(500).send(err));
  }
}

module.exports = AreasController;
