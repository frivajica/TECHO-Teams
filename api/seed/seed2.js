//INSTRUCCIONES PARA SEEDAR DB --> En package.json hay un script "seed":
// 1--> Al final de esa linea poner 1 "/seed1" y escribir en la consola npm run seed p/seedear seed1.js
// 2--> Al final de esa linea poner 2 "/seed2" y escribir en la consola npm run seed p/seedear seed2.js
// 3--> Al final de esa linea poner 3 "/seed3" y escribir en la consola npm run seed p/seedear seed3.js

const db = require("../config/database")
const { Equipo, Usuario } = require("../models")

let equipos, usuarios

const getEquipos = () => {
    Equipo.findAll()
        .then((eqs) => equipos = eqs)
}

const getUsuarios = () => {
    Usuario.findAll()
        .then(usrs => usuarios = usrs)
}

getEquipos()
getUsuarios()

db.sync()
    .then(() => equipos[0].addUsuarios(usuarios))
    .then(() => equipos[1].addUsuarios([usuarios[0], usuarios[1], usuarios[2], usuarios[3], usuarios[4]]))
    .then(() => equipos[2].addUsuarios([usuarios[2], usuarios[4], usuarios[5], usuarios[6]]))
    .then(() => equipos[3].addUsuarios([usuarios[2], usuarios[4], usuarios[5], usuarios[6], usuarios[0], usuarios[1]]))
    .then(() => equipos[4].addUsuarios(usuarios[0], usuarios[6], usuarios[1], usuarios[3]))
    .then(() => equipos[5].addUsuarios(usuarios[0], usuarios[1], usuarios[2], usuarios[5], usuarios[2]))
    .then(() => process.exit(0))
    .catch((err) => {
        console.log("Algo salió mal en el proceso: ", err.message);
        process.exit(1);
    });