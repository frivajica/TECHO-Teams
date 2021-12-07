const superagent = require("superagent");

class SedesController {
  static sedes(req, res) {
    superagent
      .get("https://sandbox.actividades.techo.org/api/sedes")
      .then((r) => res.status(200).send(r.body))
      .catch((err) => console.log(err));
  }
}

module.exports = SedesController;
