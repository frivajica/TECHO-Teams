import { ConvertirAdminBtn } from "../../components/convertirAdminBtn/ConvertirAdminBtn";
import { BotonMiInfo } from "../../components/botonMiInfo/BotonMiInfo";
import { CajaDeRoles } from "../cajaDeRoles/CajaDeRoles";
import { defaultAvatar } from "../../utils/mockData";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeletonn from "@mui/material/Skeleton";
import capitalize from "../../utils/capitalize"
import "./TarjetaUsuario.css";
import moment from "moment";
import "moment/locale/es";
import showAuth from "./showAuth";
import { useEffect, useState } from "react";
moment.locale("es");

export const TarjetaUsuario = () => {
  const yo = useSelector(({ usuario }) => usuario);
  const usuario = useSelector(({ usuarios }) => usuarios);
  const soyYo = yo.idPersona === parseInt(useParams().idPersona);
  const [autoridad, setAutoridad] = useState(<></>)
  const creado = usuario.email_verified_at ? usuario.email_verified_at?.slice(0, 10): usuario.createdAt?.slice(0, 10);
  let momentFromNow = moment(creado, "YYYY-MM-DD").fromNow(true);

  momentFromNow.slice(3, 8) === "horas" && (momentFromNow = "menos de un día");

  useEffect(() => {
    showAuth(usuario, setAutoridad)
  }, [usuario])
  
  return (
    <div className="tarjeta-usuario">
      {console.log(usuario)}
      <div className="grid-usuario">
        <div className="avatar-usuario">
          <div sx={{ width: 200, height: 200 }} id="ripple-avatar">
              <img
                className="avatar"
                src={
                  !usuario.imagen
                    ? defaultAvatar
                    : `${process.env.PUBLIC_URL}/uploads/perfil/${usuario.imagen}`
                }
                alt="Avatar de Usuario"
              />
            </div>
        </div>
        
        <div>
          <h1 className="nombre-usuario">
            {usuario.nombres ? (
              `${capitalize(usuario.nombres)} ${capitalize(usuario.apellidoPaterno)}`
            ) : (
              <Skeletonn />
            )}
          </h1>
          <pre>{autoridad}</pre>
        </div>
        <div className="contenedor-roles">
          <p>Roles actuales:</p>
          <CajaDeRoles />
        </div>

        <h4 className="antiguedad-usuario">
          {usuario.nombres ? ` Antigüedad: ${momentFromNow}` : <Skeletonn />}
        </h4>
        {soyYo ? <BotonMiInfo /> : <ConvertirAdminBtn />}
      </div>
    </div>
  );
};
