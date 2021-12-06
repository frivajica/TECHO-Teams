//INSTRUCCIONES PARA SEEDAR DB --> En package.json hay un script "seed":
// 1--> Al final de esa linea poner 1 "/seed1" y escribir en la consola npm run seed p/seedear seed1.js
// 2--> Al final de esa linea poner 2 "/seed2" y escribir en la consola npm run seed p/seedear seed2.js
// 3--> Al final de esa linea poner 3 "/seed3" y escribir en la consola npm run seed p/seedear seed3.js
const { UsuarioEnEquipo, Role } = require("../models")
const axios = require("axios")

let usuariosEnEquipos, roles

const getUsuarioEnEquipo = () => {
    return UsuarioEnEquipo.findAll()
        .then(usuarios => usuariosEnEquipos = usuarios)
}

const getRoles = () => {
    return Role.findAll()
        .then(rolesArr => roles = rolesArr)
}

const agregarRoles = (userEq, rol) => {
        //console.log("estoy funcionando", userEq)
        axios.put(`http://localhost:3001/api/equipos/${usuariosEnEquipos[userEq].equipoId}/${usuariosEnEquipos[userEq].usuarioIdPersona}/${roles[rol].id}`)
        .catch(err => console.log(err))
    }

getUsuarioEnEquipo()
    .then(() => getRoles()
        .then(() => {
            agregarRoles(0, 0)
            agregarRoles(1, 3)
            agregarRoles(2, 5)
            agregarRoles(3, 5)
            agregarRoles(4, 7)
            agregarRoles(5, 2)
            agregarRoles(6, 0)
            agregarRoles(7, 5)
            agregarRoles(8, 2)
            agregarRoles(9, 6)
            agregarRoles(10, 4)
            agregarRoles(11, 5)
            agregarRoles(12, 9)
            agregarRoles(13, 9)
            agregarRoles(14, 1)
            agregarRoles(15, 6)
            agregarRoles(16, 0)
            agregarRoles(17, 4)
            agregarRoles(18, 2)
            agregarRoles(19, 1)
            agregarRoles(20, 6)
        })
    )

