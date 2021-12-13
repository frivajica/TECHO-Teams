import { TarjetaRoles } from "../../../components/tarjetaRoles/TarjetaRoles";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../../../utils/getToken";
import { handlePersonas } from "../../../hooks/handlePersonas";
import "./Conformacion.css";
import axios from "axios";

export const Conformacion = () => {
  const [infoEquipo, setInfoEquipo] = useState({});
  const roles = useSelector(({ rol }) => rol);
  const idEquipo = useParams().id;
  
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/api/equipos/${idEquipo}/rolesEnEquipo`,
      headers: { authorization: getToken() },
    })
      .then((res) => setInfoEquipo(res.data))
      .catch((err) => console.log(err));
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
      {infoEquipo.map && (
        <div id="modificar-roles">
          {infoEquipo?.map((e) => (
            <TarjetaRoles
              data={e}
              disabled
              key={`${idEquipo}${e.usuarioIdPersona}${e.role}`}
              id={idEquipo}
              state={infoEquipo}
              setState={setInfoEquipo}
              opcPersns={handlePersonas(infoEquipo)}
              opcRoles={roles}
            />
          ))}
        </div>
      )}
      <Divider variant="middle" className="divisor" />
    </div>
  );
};
