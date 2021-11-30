const superagent = require("superagent");

class RegionesController {
    static paises(req, res) {
        superagent
        .get("https://sandbox.actividades.techo.org/ajax/paises")
        .then(r => res.status(200).send(r.body))
        .catch(err => console.log(err))
    }

    static provincias(req, res) {
        const idPais = req.params.idPais
        superagent
        .get(`https://sandbox.actividades.techo.org/ajax/paises/${idPais}/provincias`)
        .then(r =>  JSON.parse(r.text))
        .then(provincias => res.status(200).send(provincias))
        .catch(err => console.log(err))
    }

    static localidades(req, res) {
        const idPais = req.params.idPais
        const idProv = req.params.idProv
        superagent
        .get(`https://sandbox.actividades.techo.org/ajax/paises/${idPais}/provincias/${idProv}/localidades`)
        .then(r => JSON.parse(r.text))
        .then(localidades => res.status(200).send(localidades))
        .catch(err => console.log(err))
    }
}

module.exports = RegionesController;