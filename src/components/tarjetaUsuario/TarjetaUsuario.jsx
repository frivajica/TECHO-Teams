import { usuario as u } from "../../utils/mockData";
import ButtonBase from "@mui/material/ButtonBase";
import { CajaDeRoles } from "../cajaDeRoles/CajaDeRoles";
import "./TarjetaUsuario.css";

export const TarjetaUsuario = () => {
  return (
    <div className="tarjeta-usuario">
      <div className="grid-usuario">
        <div className="avatar-usuario">
          <ButtonBase sx={{ width: 200, height: 200 }} id='ripple-avatar'>
            <img className="avatar" src={u.avatar} alt="Avatar de Usuario" />
          </ButtonBase>
        </div>
        <h1 className="nombre-usuario">{`${u.nombres} ${u.apellidoPaterno}`}</h1>
        <div className="contenedor-roles">
          <CajaDeRoles />
        </div>
        <h4 className="antiguedad-usuario">{`${`### años`} en TECHO`}</h4>
      </div>
    </div>
  );
};
