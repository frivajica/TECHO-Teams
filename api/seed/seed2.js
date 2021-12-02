//INSTRUCCIONES PARA SEEDAR DB --> En package.json hay un script "seed":
// 1--> Al final de esa linea poner 1 "/seed1" y escribir en la consola npm run seed p/seedear seed1.js
// 2--> Al final de esa linea poner 2 "/seed2" y escribir en la consola npm run seed p/seedear seed2.js
// 3--> Al final de esa linea poner 3 "/seed3" y escribir en la consola npm run seed p/seedear seed3.js

const db = require("../config/database")
const { Equipo, Usuario } = require("../models")
const axios = require("axios")

let equipos, usuarios

const getEquipos = () => {
    return Equipo.findAll()
        .then((eqs) => equipos = eqs)
}

const getUsuarios = () => {
    return Usuario.findAll()
        .then(usrs => usuarios = usrs)
}

const addUserToEquipos = (equipo, num1, num2) => {
    for (let i = num1; i < num2; i++) {
        axios.put(`http://localhost:3001/api/equipos/${equipos[equipo].id}/${usuarios[i].idPersona}`)
    }
}


getEquipos()
    .then(() => getUsuarios()
        .then(() => {
            addUserToEquipos(0, 0, 7)
            addUserToEquipos(1, 2, 7)
            addUserToEquipos(2, 1, 5)
            addUserToEquipos(3, 0, 6)
            addUserToEquipos(4, 3, 7)
            addUserToEquipos(5, 1, 6)
        }))

db.sync()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log("Algo salió mal en el proceso: ", err.message);
        process.exit(1);
    });