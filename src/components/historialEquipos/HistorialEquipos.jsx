import "./HistorialEquipos.css";
import { TarjetaEquipo } from "../tarjetaEquipo/TarjetaEquipo";
import TarjetaActividad from "../tarjetaActividad/TarjetaActividad";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

export const HistorialEquipos = ({ historialDeUsuario, actividades }) => {
  const rolesCargados = useSelector(({ cargaDeRoles }) => cargaDeRoles);
  const seleccionado = historialDeUsuario || actividades;
  const salida = (e) => {
    if (e.activo) return "la actualidad";
    else return e.salidas[e.salidas.length - 1]?.createdAt;
  };
  const equipoOActividades = () => {
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

  const filterRoles = (roles) => {
    let obj = {}, arr = [];
    roles.forEach((value, i) => {
      if (!obj[value.nombreRol]) {
        arr.push(value)
        obj[value.nombreRol] = true
      }
    })
    return arr;
  }

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
                    inicio={e.entradas[0]?.createdAt}
                    final={salida(e)}
                    roles={filterRoles(e.roles)}
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
