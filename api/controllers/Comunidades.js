const generateAxios = require("../utils/generateAxios");

class ComunidadesController {
  static async comunidades(req, res) {
    console.log("---------------> ACAAAA", req.headers.pais);
    const server = generateAxios(req.headers.authorization);
    const { data } = await server.get(
      `https://comunidades.techo.org/comunidades/getComunidades/${req.headers.pais}`
    );
    try {
      const fixingData = data
        .replace(/ /g, "")
        .replace(/\n/g, "");

      const fixedJSON = fixingData.slice(0, fixingData.length - 2) + "]";
      const finalData = JSON.parse(fixedJSON);
      return res.status(200).send(finalData);
    } catch (err) {
      console.log({ err });
      return res.status(500).send(err);
    }
  }
}

module.exports = ComunidadesController;
