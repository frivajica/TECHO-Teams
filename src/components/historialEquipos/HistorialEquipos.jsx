import "./HistorialEquipos.css";
import { TarjetaEquipo } from "../tarjetaEquipo/TarjetaEquipo";
import TarjetaActividad from "../tarjetaActividad/TarjetaActividad";
import Skeleton from "./Skeleton";

export const HistorialEquipos = ({ historialDeUsuario, actividades }) => {
  const seleccionado = historialDeUsuario || actividades;
  const salida = (e) => {
    if (e.salidas.length === e.entradas.length)
      return e.salidas[e.salidas.length - 1];
    else if (!e.equipo.activo) return e.equipo.updatedAt;
    else return "actualidad";
  };

  return (
    <div className="contenedor-historial">
      <div className="historial">
        <h2 id="titulo-historia">
          {" "}
          Historia de {seleccionado === actividades ? "actividades" : "equipos"}
        </h2>
        <div className="caja-equipos">
          {!seleccionado.length ? (
            
            <h3 className="participaciones">
              {seleccionado === historialDeUsuario
                ? "Todavía no pertences a ningún equipo"
                : "Todavía no participaste en ninguna actividad"}
            </h3>
            &&  [1,2,3,4,5,6,7,8,9,10].map((n)=>   <Skeleton key={n}  />)

 
          ) : (
            seleccionado.map((e, i) => {
              return seleccionado === historialDeUsuario ? (
                <TarjetaEquipo
                  key={i}
                  final={salida(e)}
                  roles={e.roles}
                  activo={e.activo}
                  equipo={e.equipo}
                  className="contenedor-equipo"
                />
              ) : (
                e.actividad && (
                  <TarjetaActividad
                    key={i}
                    nombre={e.actividad.nombreActividad}
                    fecha={e.actividad.fechaInicio}
                    lugar={e.actividad.lugar}
                    rol={e.rol}
                  />
                )
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
