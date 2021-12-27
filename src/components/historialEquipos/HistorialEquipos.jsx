import "./HistorialEquipos.css";
import { TarjetaEquipo } from "../tarjetaEquipo/TarjetaEquipo";
import TarjetaActividad from "../tarjetaActividad/TarjetaActividad";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "./Skeleton";

export const HistorialEquipos = ({ historialDeUsuario, actividades }) => {
  const rolesCargados = useSelector(({ cargaDeRoles }) => cargaDeRoles);
  const datosDeUsuario = useSelector(({ usuarios }) => usuarios);
  const seleccionado = historialDeUsuario || actividades;
  const idPersona = parseInt(useParams().idPersona);
  const salida = (e) => {
    if (e.salidas.length === e.entradas.length) return e.salidas[e.salidas.length - 1];
    //else if (!e.equipo.activo) return e.equipo.updatedAt;
    else return "la actualidad";
  };
  let equipoOActividades = () => {
    if (seleccionado === actividades && actividades.length === 0) {
      return "Todavía no participaste en ninguna actividad";
    }
    if (
      seleccionado === historialDeUsuario &&
      historialDeUsuario.length === 0
    ) {
      return "Todavía no pertences a ningún equipo";
    }
    return false;
  };

  return (
    <div className="contenedor-historial">
      <div className="historial">
        <h2 id="titulo-historia">
          {" "}
          Historia de {seleccionado === actividades ? "actividades" : "equipos"}
        </h2>
        <div className="caja-equipos">
          {!rolesCargados
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <Skeleton key={n} />)
            : equipoOActividades() || seleccionado.map((e, i) => {
                return seleccionado === historialDeUsuario ? (
                  <TarjetaEquipo
                    key={i}
                    final={salida(e)}
                    roles={e.roles}
                    puedeVer={e.activo}
                    activo={e.equipo?.activo}
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
              })}
        </div>
      </div>
    </div>
  );
};
