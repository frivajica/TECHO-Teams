import "./HistorialEquipos.css";
import { historial } from "../../utils/mockData";
import { TarjetaEquipo } from "../tarjetaEquipo/TarjetaEquipo";

export const HistorialEquipos = ({ historialDeUsuario }) => {
  const salida = (e) => {
    console.log("probando", e);
    if (e.salidas.length === e.entradas.length)
      return e.salidas[e.salidas.length - 1];
    else if (!e.equipo.activo) return e.equipo.updatedAt;
    else return "actualidad";
  };

  return (
    <div className="contenedor-historial">
      <div className="historial">
        <h2 id="titulo-historia"> Historia </h2>
        <div className="caja-equipos">
          {!historialDeUsuario.length ? (
            <h3 className="participaciones">
              Todavía no pertences a ningún equipo
            </h3>
          ) : (
            historialDeUsuario.map((e, i) => {
              return (
                <TarjetaEquipo
                  key={i}
                  final={salida(e)}
                  roles={e.roles}
                  activo={e.activo}
                  equipo={e.equipo}
                  className="contenedor-equipo"
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
