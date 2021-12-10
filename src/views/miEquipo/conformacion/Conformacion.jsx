import { TarjetaRoles } from "../../../components/tarjetaRoles/TarjetaRoles";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { defaultAvatar } from "../../../utils/mockData";
import { useParams } from "react-router-dom";
import getToken from "../../../utils/getToken";
import { handlePersonas } from "../../../hooks/handlePersonas";
import "./Conformacion.css";
import axios from "axios";

export const Conformacion = () => {
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const roles = useSelector(({ rol }) => rol);
  const [infoEquipo, setInfoEquipo] = useState({});
  const idEquipo = useParams().id;
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/api/equipos/${idEquipo}/usuarios`,
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
              key={e.usuarioIdPersona}
              id={idEquipo}
              state={infoEquipo}
              setState={setInfoEquipo}
              rol={e.role}
              persona={e.nombreApellido}
              opcPersns={handlePersonas(infoEquipo)}
              opcRoles={roles}
              necesario={e.necesario}
              img={e.imagenUsr || defaultAvatar}
            />
          ))}
        </div>
      )}
      <Divider variant="middle" className="divisor" />
      <div id="agregar-roles">
        <div id="titulo-nuevo">
          <h2>Añadir rol</h2>
          {mostrarNuevo ? (
            <ButtonBase
              onClick={() => setMostrarNuevo(!mostrarNuevo)}
              id="item-icon"
            >
              <RemoveIcon color="action" />
            </ButtonBase>
          ) : (
            <ButtonBase
              onClick={() => setMostrarNuevo(!mostrarNuevo)}
              id="item-icon"
            >
              <AddIcon color="action" />
            </ButtonBase>
          )}
        </div>
        {mostrarNuevo && <TarjetaRoles />}
      </div>
    </div>
  );
};
