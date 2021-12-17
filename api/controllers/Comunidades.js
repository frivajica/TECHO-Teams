const generateAxios = require("../utils/generateAxios");

class ComunidadesController {
  static async comunidades(req, res) {
    const server = generateAxios(req.headers.authorization);
    const { data } = await server.get(
      "https://comunidades.techo.org/comunidades/getComunidades/13"
    );
    try {
      const fixingData = data
        .replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f")
        .replaceAll(" ", "")
        .replaceAll("\n", "");

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
