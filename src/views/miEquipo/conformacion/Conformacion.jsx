import { TarjetaRoles } from "../../../components/tarjetaRoles/TarjetaRoles";
import Divider from "@mui/material/Divider";
import { getUsuarios } from "../../../state/equipo";
import { getRolesInfo } from "../../../state/rol";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Conformacion.css";

export const Conformacion = () => {
  const dispatch = useDispatch();
  const roles = useSelector(({ rol }) => rol);
  useEffect(() => {
    dispatch(getUsuarios("teamId"));
    dispatch(getRolesInfo("teamId"));
  }, []);
  return (
    <div className="conformacion">
      <div className="presentacion-seccion">
        <h2>Conformación</h2>
        <p>
          Definí la composición de tu equipo, indicando los roles y si es
          fundamental para el funcionamiento del mismo.
        </p>
      </div>
      <div id="modificar-roles">
        {roles?.map((e) => (
          <TarjetaRoles
            key={e.id}
            id={e.id}
            rol={e.rol}
            persona={e.persona}
            necesario={e.necesario}
            img={e.img}
          />
        ))}
      </div>
      <Divider variant="middle" className="divisor" />
      <div id="agregar-roles">
        <h2>Añadir rol</h2>
        <TarjetaRoles />
      </div>
    </div>
  );
};
