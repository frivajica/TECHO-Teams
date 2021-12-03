import "./HistorialEquipos.css";
import { historial } from "../../utils/mockData";
import { TarjetaEquipo } from "../tarjetaEquipo/TarjetaEquipo";

export const HistorialEquipos = ({historialDeUsuario}) => {

  const salida = (e) => {
    console.log("probando", e)
    if (e.salidas.length === e.entradas.length) return e.salidas[e.salidas.length - 1]
    else if(!e.equipo.activo) return e.equipo.updatedAt
      else return "actualidad"
  }
  
  return (
    <div className="contenedor-historial">
      <div className="historial">
        <h2 id="titulo-historia"> Historia </h2>
        <div className="caja-equipos">
          {historialDeUsuario.map((e, i) => {
            return (
              <TarjetaEquipo
								key={i}
                nombre={e.equipo.nombre}
                inicio={e.equipo.createdAt}
                final={salida(e)}
                roles={e.roles}
                className='contenedor-equipo'
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
