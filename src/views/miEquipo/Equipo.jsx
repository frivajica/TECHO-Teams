import { Conformacion } from "./conformacion/Conformacion.jsx";
import { InfoEquipo } from "./infoEquipo/InfoEquipo.jsx";
import { useDispatch } from "react-redux";
import { getEquipo } from "../../state/equipo.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Equipo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    dispatch(getEquipo(id)).then(({ payload }) => setTrigger(true));
  }, []);

  if (trigger) {
    return (
      <div>
        <InfoEquipo />
        <Conformacion />
      </div>
    );
  } else {
    return <h1>Cargando!</h1>;
  }
};
