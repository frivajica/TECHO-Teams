import axios from "axios";

const showAuth = async (usr, setAuth) => {
    if (usr.isAdmin) return setAuth(<em style={{color: '#0092dd'}}>Administrador/a</em>)
    else if (usr.isCoordinador) {
      if (usr.areaCoord) {
        return axios.get("http://localhost:3001/api/regiones/paises")
        .then(res => res.data.forEach(pais => { 
          
          if (pais.id === usr.paisIdCoord){
            if (usr.sedeIdCoord) {
              axios.get("http://localhost:3001/api/sedes")
              .then(res => res.data.forEach(sede => { 
                if (sede.id === usr.sedeIdCoord) {
                  setAuth(
                    <>
                      <em style={{color: '#0092dd'}}>Coordinador/a</em>
                      <p><span style={{color: '#0092dd'}}>Área:</span> {usr.areaCoord} ({pais.nombre})</p>
                      <p><span style={{color: '#0092dd'}}>Sede:</span> {sede.nombre}</p>
                    </>
                  );
                }
              }))
              .catch(err => console.log(err))
            }
            else setAuth(
            <>
              <em style={{color: '#0092dd'}}>Coordinador/a</em>
              <p><span style={{color: '#0092dd'}}>Área:</span> {usr.areaCoord} ({pais.nombre})</p>
            </>
            );
          }
        }))
        .catch(err => console.log(err))
      }
      else if (usr.sedeIdCoord) {
        return axios.get("http://localhost:3001/api/sedes")
        .then(res => {
          res.data.forEach(sede => { 
            if (sede.id === usr.sedeIdCoord) setAuth(<><em style={{color: '#0092dd'}}>Coordinador/a</em><p><span style={{color: '#0092dd'}}>Sede:</span> {sede.nombre}</p></>)
          })
        })
        .catch(err => console.log(err))
      }
      else return setAuth(<em style={{color: '#0092dd'}}>Coordinador/a</em>)
    }
    return setAuth(<em style={{color: '#0092dd'}}>Voluntario/a</em>)
}

export default showAuth;