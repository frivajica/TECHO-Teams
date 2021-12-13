const { Equipo, Usuario, UsuarioEnEquipo, Role, RolEnEquipo } = require('../models');
const generateAxios = require('../utils/generateAxios');
const Sequelize = require("sequelize");

class EquipoController {

    static async createEquipo(req, res) {
        try {
            const coordinador = await Usuario.findOne({ where: { id: req.params.userId }})
            const newTeam = await Equipo.create(req.body)

            const usrEnEquipo = await newTeam.addUsuario(coordinador) //<-- agrego el usuario al equipo
            const coordRol = await Role.findOne({ where: { id: 1}})//<-- busco el rol para crear la relacion
            await usrEnEquipo.setRole(coordRol)//<-- le asigno el rol "coordinador"

            //pedido a actividades para info(nombre) del coordinador :/
            const server = generateAxios(req.headers.authorization)
            const coordInfo = await server.get(`/personas/${req.headers.idpersona}`).then(res => res.data)

            await newTeam.createEvento({//éste evento solo se utiliza en el historial del equipo
                tipo: 0,
                nombreEquipo: newTeam.nombre,
                nombreCoord: coordInfo.nombres
            })

            //creo otro evento para guardar el rol en el historial del usuario
            //también se mostrará en el historial del equipo
            const evento = await coordinador.createEvento({ 
                tipo: 2,
                nombreEquipo: newTeam.nombre,
                nombreUsuario: coordInfo.nombres,
                nombreRol: coordRol.nombre
            })
            await newTeam.addEvento(evento)//necesitamos saber en qué equipo cumplió el rol de coordinador

            return res.status(201).send(newTeam)
        } catch (error) {
            return res.status(500).send(error)
        }
        
    }

    static getEquipos(req, res) {
        Equipo.findAll()
            .then(teamList => {
                let listaEquipos = [];
                for (let team of teamList) {
                    if (team.activo) listaEquipos.push(team)
                }
                return listaEquipos
            })
            .then(listaEquipos => res.status(200).send(listaEquipos))
            .catch(err => res.status(500).send(err));
    }

    static getOneEquipo(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => res.status(200).send(equipo))
            .catch(err => res.status(500).send(err));
    }

    static updateEquipo(req, res) {
        Equipo.update(
            req.body,
            { where: { id: req.params.id } },
        )
            .then(() => Equipo.findOne({ where: { id: req.params.id } }))
            .then(updatedEquipo => res.status(200).send(updatedEquipo))
            .catch(err => res.status(500).send(err));
    }

    static async addUser(req, res) {
        try {
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            if (!equipo.activo) return res.send("el equipo no esta activo")
            const usr = await Usuario.findOne({ where: { idPersona: req.params.userId } })

            const checkUsr = await UsuarioEnEquipo.findOne({
                where: { usuarioIdPersona: usr.idPersona, equipoId: equipo.id },
              }); 
            if (checkUsr) { //si el usuario ya está en el equipo...
                if(checkUsr.activo === false) await UsuarioEnEquipo.update({activo: true}, {where: { usuarioIdPersona: usr.idPersona, equipoId: equipo.id }}) 
                else return res.status(401).send("el usuario ya pertenece al equipo")
            }
            else await equipo.addUsuario(usr)

            const server = generateAxios(req.headers.authorization)
            const usrInfo = await server.get(`/personas/${req.params.userId}`).then(res => res.data)
            const coordInfo = await server.get(`/personas/${req.headers.idpersona}`).then(res => res.data) 

            const evento = await equipo.createEvento({//evento para el historial del equipo
                tipo: 1,
                nombreEquipo: equipo.nombre,
                nombreUsuario: usrInfo.nombres,
                nombreCoord: coordInfo.nombres
            })
            await usr.addEvento(evento)//para historial de usuario
            return res.send("usuario agregado")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async getUsers (req, res) {
        const server = generateAxios(req.headers.authorization)
        try {
            let usuariosYRol = await UsuarioEnEquipo.findAll({
                where: { equipoId: req.params.id }, 
                include: [Role],
            });
            const necesarios = await RolEnEquipo.findAll({
                where: {equipoId: req.params.id},
                include: [Role],
            });
            for (let i = 0; i < usuariosYRol.length; i++) {     //Itera los usuarios para asignarles su información consultada de la api de actividades
                await server.get(`/personas/${usuariosYRol[i].usuarioIdPersona}`)
                    .then(res => usuariosYRol[i].dataValues.usr = res.data)
                    .catch(err => res.send(err));
            };
            const info = { usuariosYRol, necesarios }
            return res.send(...info);
        } catch (error) {
            return res.status(500).send(error)
        };
    };

    static getCantMiembros(req, res) {
        UsuarioEnEquipo.findAll({ where: { equipoId: req.params.id, activo: true } })
            .then(usrEnEquipo => res.send(usrEnEquipo))
            .catch(err => res.status(500).send(err));
    }

    static async addRole(req, res) {
        try {
            const equipo = await Equipo.findOne({ where: { id: req.params.id}})
            const rol = await Role.findOrCreate({ where: {nombre: req.body.nombre}})
            const rolEnEquipo = await RolEnEquipo.findOne({ where: { equipoId: equipo.id, roleId: rol.id }})
            if (rolEnEquipo) RolEnEquipo.update(
                    {cantNecesaria: req.body.cantNecesaria}, 
                    {where: { equipoId: equipo.id, roleId: rol.id }})
                    .then(() => res.status(201).send("cantidades necesarias actualizadas: "+req.body.cantNecesaria+" "+req.body.nombre+" necesarios"))
            else equipo.setRole(rol, {through: {cantNecesaria: req.body.cantNecesaria}})
                .then(() => res.status(201).send("rol",req.body.nombre,"agregado al equipo.",req.body.cantNecesaria,"necesarios"))
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async changeRole(req, res) { //Cambiar rol de usuario en un equipo
        try {
            const usrEnEquipo = await UsuarioEnEquipo.findOne({ where: { equipoId: req.params.id, usuarioIdPersona: req.params.userId, activo: true } })
            /* const oldRoleId = usrEnEquipo.roleId;//guardo el viejo para saber que el equipo ya no tiene este rol */
            //verificar que el rol pertenezca al equipo:
            /* const rolesEnEquipo = await RolEnEquipo.findOne({ where: {equipoId: req.params.id, roleId: req.params.roleId}})
            if (!rolesEnEquipo) return res.status(401).send("primero debes agregar el rol al equipo") */
            const rol = await Role.findOne({ where: { id: req.params.roleId, activo: true } })
            const usr = await Usuario.findOne({ where: { idPersona: req.params.userId } })
            
            if (rol.id === 1 && !usr.isAdmin && !usr.isCoordinador) return res.status(401).send("el usuario no tiene autoridad para ser coordinador")
            await usrEnEquipo.setRole(rol) //asigno el rol al usuario en el equipo

            //info para crear evento:
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            const server = generateAxios(req.headers.authorization)
            const usrInfo = await server.get(`/personas/${req.params.userId}`).then(res => res.data)
            const coordInfo = await server.get(`/personas/${req.headers.idpersona}`).then(res => res.data)
            const evento = await equipo.createEvento({
                tipo: 2,
                nombreCoord: coordInfo.nombres,
                nombreEquipo: equipo.nombre,
                nombreUsuario: usrInfo.nombres,
                nombreRol: rol.nombre
            })
            await usr.addEvento(evento)// <-- ^^^relaciono el evento con el equipo y con el usuario

            //el equipo ya no tiene el rol viejo pero si tiene el nuevo, sirve para cuando un rol es necesario.
            /* if (oldRoleId) await RolEnEquipo.update(
                { cantSatisfecha: Sequelize.literal('cantSatisfecha - 1') }, 
                { where: { equipoId: equipo.id, roleId: oldRoleId } })
            await RolEnEquipo.update(
                { cantSatisfecha: Sequelize.literal('cantSatisfecha + 1') }, 
                { where: { equipoId: equipo.id, roleId: rol.id } }) */
            return res.status(201).send("rol changed")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async removeUser(req, res) { //Esto solo lo realiza el coord del equipo
        try {
            await UsuarioEnEquipo.update({ activo: false }, {
                where: {
                    usuarioIdPersona: req.params.userId,
                    equipoId: req.params.id
                }
            })
            const server = generateAxios(req.headers.authorization)
            const usrInfo = await server.get(`/personas/${req.params.userId}`).then(res => res.data)
            const coordInfo = await server.get(`/personas/${req.headers.idpersona}`).then(res => res.data)
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            const evento = await equipo.createEvento({
                tipo: -1,
                nombreCoord: coordInfo.nombres,
                nombreEquipo: equipo.nombre,
                nombreUsuario: usrInfo.nombres
            })
            const usuario = await Usuario.findOne({ where: { id: req.params.userId } })
            await usuario.addEvento(evento)
            return res.status(201).send("usuario eliminado del equipo")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async deactivateEquipo(req, res) {
        try {
            await Equipo.update({ activo: false }, { where: { id: req.params.id } })
            await UsuarioEnEquipo.update({ activo: false }, { where: { equipoId: req.params.id } })
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            const server = generateAxios(req.headers.authorization)
            const coordInfo = await server.get(`/personas/${req.headers.idpersona}`).then(res => res.data)
            equipo.createEvento({
                tipo: -2,
                nombreCoord: coordInfo.nombres,
                nombreEquipo: equipo.nombre
            }).then(() => res.status(201).send(equipo))
            .catch(err => res.send(err))
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static async activateEquipo(req, res) {
        try {
            await Equipo.update({ activo: true }, { where: { id: req.params.id } })
            const equipo = await Equipo.findOne({ where: { id: req.params.id } })
            const server = generateAxios(req.headers.authorization)
            const coordInfo = await server.get(`/personas/${req.headers.idpersona}`).then(res => res.data)
            equipo.createEvento({
                tipo: 3,
                nombreCoord: coordInfo.nombres,
                nombreEquipo: equipo.nombre
            })
            .then(() => res.status(200).send(equipo))
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    static getHistory(req, res) {
        Equipo.findOne({ where: { id: req.params.id } })
            .then(equipo => equipo.getEventos())
            .then(history => res.send(history))
            .catch(err => res.status(500).send(err))
    }

}

module.exports = EquipoController;