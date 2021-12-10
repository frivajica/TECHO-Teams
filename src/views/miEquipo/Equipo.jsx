import { Conformacion } from "./conformacion/Conformacion.jsx";
import { getUsuariosEnEquipo } from "../../state/usuarios";
import { InfoEquipo } from "./infoEquipo/InfoEquipo.jsx";
import { useDispatch } from "react-redux";
import { getEquipo } from "../../state/equipo.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRoles } from "../../state/rol";

export const Equipo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getEquipo(id));
    dispatch(getRoles());
  }, []);

  return (
    <div>
      <InfoEquipo />
      <Conformacion />
    </div>
  );
};
