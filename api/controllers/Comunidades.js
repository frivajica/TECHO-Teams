const superagent = require("superagent");

class ComunidadesController {
  static comunidades(req, res) {
    superagent
      .get("https://comunidades.techo.org/comunidades/getComunidades/13")
      .then((r) => res.status(200).send(r))
      .catch((err) => console.log(err));
  }
}

module.exports = ComunidadesController;
