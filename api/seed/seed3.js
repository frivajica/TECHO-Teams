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

const agregarRoles = (userEq, rol, token) => {
        axios.put(`http://localhost:3001/api/equipos/${usuariosEnEquipos[userEq].equipoId}/${usuariosEnEquipos[userEq].usuarioIdPersona}/${roles[rol].id}`, {token})
        .catch(err => console.log(err))
    }

const login = async () => {
    return await axios.post("http://localhost:3001/api/usuarios/login", {
        mail: "mariana.gutierrez@gmail.com",
        password: "123456789"
        })
        .then(res => res.data.token)
        .catch(err => console.log(err));
}

getUsuarioEnEquipo()
    .then(() => getRoles()
        .then(() => login())
        .then(token => {
            agregarRoles(0, 0, token)
            /* agregarRoles(1, 3, token)
            agregarRoles(2, 5, token)
            agregarRoles(3, 5, token)
            agregarRoles(4, 7, token)
            agregarRoles(5, 2, token)
            agregarRoles(6, 0, token)
            agregarRoles(7, 5, token)
            agregarRoles(8, 2, token)
            agregarRoles(9, 6, token)
            agregarRoles(10, 4, token)
            agregarRoles(11, 5, token)
            agregarRoles(12, 9, token)
            agregarRoles(13, 9, token)
            agregarRoles(14, 1, token)
            agregarRoles(15, 6, token)
            agregarRoles(16, 0, token)
            agregarRoles(17, 4, token)
            agregarRoles(18, 2, token)
            agregarRoles(19, 1, token)
            agregarRoles(20, 6, token) */
        })
    )

