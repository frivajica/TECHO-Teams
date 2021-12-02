//INSTRUCCIONES PARA SEEDAR DB --> En package.json hay un script "seed":
// 1--> Al final de esa linea poner 1 "/seed1" y escribir en la consola npm run seed p/seedear seed1.js
// 2--> Al final de esa linea poner 2 "/seed2" y escribir en la consola npm run seed p/seedear seed2.js
// 3--> Al final de esa linea poner 3 "/seed3" y escribir en la consola npm run seed p/seedear seed3.js
const db = require("../config/database")
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

db.sync()
    /* .then(() => usuariosEnEquipos[0].setRole(roles[0]))
    .then(() => usuariosEnEquipos[1].setRole(roles[3]))
    .then(() => usuariosEnEquipos[2].setRole(roles[5]))
    .then(() => usuariosEnEquipos[3].setRole(roles[5]))
    .then(() => usuariosEnEquipos[4].setRole(roles[7]))
    .then(() => usuariosEnEquipos[5].setRole(roles[2]))
    .then(() => usuariosEnEquipos[6].setRole(roles[0]))
    .then(() => usuariosEnEquipos[7].setRole(roles[5]))
    .then(() => usuariosEnEquipos[8].setRole(roles[2]))
    .then(() => usuariosEnEquipos[9].setRole(roles[6]))
    .then(() => usuariosEnEquipos[10].setRole(roles[4]))
    .then(() => usuariosEnEquipos[11].setRole(roles[5]))
    .then(() => usuariosEnEquipos[12].setRole(roles[9]))
    .then(() => usuariosEnEquipos[13].setRole(roles[9]))
    .then(() => usuariosEnEquipos[14].setRole(roles[1]))
    .then(() => usuariosEnEquipos[15].setRole(roles[6]))
    .then(() => usuariosEnEquipos[16].setRole(roles[0]))
    .then(() => usuariosEnEquipos[17].setRole(roles[4]))
    .then(() => usuariosEnEquipos[18].setRole(roles[2]))
    .then(() => usuariosEnEquipos[19].setRole(roles[1]))
    .then(() => usuariosEnEquipos[20].setRole(roles[6]))
    .then(() => usuariosEnEquipos[21].setRole(roles[2]))
    .then(() => usuariosEnEquipos[22].setRole(roles[6]))
    .then(() => usuariosEnEquipos[23].setRole(roles[0])) */
    .then(() => process.exit(0))
    .catch((err) => {
        console.log("Algo salió mal en el proceso: ", err.message);
        process.exit(1);
    });


    /* 
    
    
    */