import { usuario as u } from "../../utils/mockData";
import ButtonBase from "@mui/material/ButtonBase";
import { CajaDeRoles } from "../cajaDeRoles/CajaDeRoles";
import "./TarjetaUsuario.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BotonMiInfo } from "../../components/botonMiInfo/BotonMiInfo";
import { ConvertirAdminBtn } from "../../components/convertirAdminBtn/ConvertirAdminBtn";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const TarjetaUsuario = () => {
  const yo = useSelector(({ usuario }) => usuario);
  const usuario = useSelector(({ usuarios }) => usuarios);
  const soyYo = yo.idPersona === parseInt(useParams().idPersona);
  const creado = usuario.createdAt?.slice(0, 10);
  let momentFromNow = moment(creado, "YYYY-MM-DD").fromNow(true);
  momentFromNow.slice(3, 8) === "horas" && (momentFromNow = "menos de un día");

  return (
    <div className="tarjeta-usuario">
      <div className="grid-usuario">
        <div className="avatar-usuario">
          <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
            <img
              className="avatar"
              src={!usuario.imagen ? u.avatar : usuario.imagen}
              alt="Avatar de Usuario"
            />
          </ButtonBase>
        </div>
        <h1 className="nombre-usuario">{`${usuario.nombres} ${usuario.apellidoPaterno}`}</h1>
        <div className="contenedor-roles">
          <CajaDeRoles />
        </div>
        <h4 className="antiguedad-usuario">{` Antigüedad: ${momentFromNow}`}</h4>
        {soyYo ? <BotonMiInfo /> : <ConvertirAdminBtn />}
      </div>
    </div>
  );
};
