import axios from "axios";

const showAuth = async (usr, setAuth) => {
    if (usr.isAdmin) return setAuth(usr.sexo === "Femenino"? "Administradora." : "Administrador")
    else if (usr.isCoordinador) {
      let Auth = usr.sexo === "Femenino"? "Coordinadora." : "Coordinador.";
      if (usr.areaCoord) {
        await axios.get("http://localhost:3001/api/regiones/paises")
        .then(res => res.data.map(pais => { if (pais.id === usr.paisIdCoord) Auth += "\nÁrea: "+usr.areaCoord+" ("+pais.nombre+")."}))
        .catch(err => console.log(err))
      }
      if (usr.sedeIdCoord) {
        await axios.get("http://localhost:3001/api/sedes")
        .then(res => res.data.map(sede => { if (sede.id === usr.sedeIdCoord) Auth += "\nSede: "+sede.nombre+"."}))
        .catch(err => console.log(err))
      }
      return setAuth(Auth);
    }
    return setAuth("Voluntario.")
}

export default showAuth;