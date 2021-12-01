import "./HistorialEquipos.css";
import { historial } from "../../utils/mockData";
import { TarjetaEquipo } from "../tarjetaEquipo/TarjetaEquipo";

export const HistorialEquipos = () => {
  return (
    <div className="contenedor-historial">
      <div className="historial">
        <h2 id="titulo-historia"> Historia </h2>
        <div className="caja-equipos">
          {historial.map((e, i) => {
            return (
              <TarjetaEquipo
								key={i}
                nombre={e.nombre}
                inicio={e.fecha_inicio}
                final={e.fecha_final}
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
