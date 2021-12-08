const generateAxios = require("../utils/generateAxios")

class ComunidadesController {
  static comunidades(req, res) {
    const server = generateAxios(req.headers.authorization)
    server
      .get("https://comunidades.techo.org/comunidades/getComunidades/13")
      .then((r) => res.status(200).send(r))
      .catch((err) => console.log(err));
  }
}

module.exports = ComunidadesController;
