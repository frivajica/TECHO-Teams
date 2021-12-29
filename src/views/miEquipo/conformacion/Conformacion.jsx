import { TarjetaRoles } from "../../../components/tarjetaRoles/TarjetaRoles";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { infoRolesEquipo } from '../../../state/cargaDeRoles'
import { useParams } from "react-router-dom";
import { handlePersonas } from "../../../hooks/handlePersonas";
import { Skeleton } from "../../../components/tarjetaRoles/Skeleton"
import "./Conformacion.css";

export const Conformacion = () => {
  const infoEquipo = useSelector(({ cargaDeRoles }) => cargaDeRoles);
  const roles = useSelector(({ rol }) => rol);
  const idEquipo = useParams().id;
  const yo = useSelector(({usuario}) => usuario);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(infoRolesEquipo(idEquipo));
    }, []);

  return (
    <div className="conformacion">
      <div className="presentacion-seccion">
        <h2>Conformación</h2>
        {(yo.isAdmin || yo.isCoordinador) && (
          <p>
            Definí la composición de tu equipo, indicando los roles y si es
            fundamental para el funcionamiento del mismo.
          </p>
        )}
      </div>
      {infoEquipo.map ? (
        <div id="modificar-roles">
          {infoEquipo?.map((e) => (
            <TarjetaRoles
              data={e}
              disabled
              key={`${idEquipo}${e.usuarioIdPersona}${e.role}`}
              id={idEquipo}
              state={infoEquipo}
              opcPersns={handlePersonas(infoEquipo)}
              opcRoles={roles}
            />
          ))}
        </div>
      ) : ([1, 2, 3, 4, 5].map((e, i) => <Skeleton key={`sk-${i}`} />))}
      <Divider variant="middle" className="divisor" />
    </div>
  );
};
