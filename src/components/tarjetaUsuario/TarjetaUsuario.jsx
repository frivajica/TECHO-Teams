import { usuario as u } from "../../utils/mockData";
import ButtonBase from "@mui/material/ButtonBase";
import { CajaDeRoles } from "../cajaDeRoles/CajaDeRoles";
import "./TarjetaUsuario.css";
import {  useLocation } from 'react-router-dom';
import { BotonMiInfo } from '../../components/botonMiInfo/BotonMiInfo'
import moment from 'moment';
import 'moment/locale/es';
moment.locale("es")

export const TarjetaUsuario = ({usuario}) => {
  
  const location = useLocation();
  let soyYo = `/${usuario.idPersona}` ===  location.pathname;
  
  const creado = usuario.createdAt.slice(0, 10)
  const momentFromNow = moment(creado, "YYYY-MM-DD").fromNow().slice(5)

  return (
    <div className="tarjeta-usuario">
      <div className="grid-usuario">
        <div className="avatar-usuario">
          <ButtonBase sx={{ width: 200, height: 200 }} id='ripple-avatar'>
            <img className="avatar" src={!usuario.imagen ? u.avatar : usuario.imagen} alt="Avatar de Usuario" />
          </ButtonBase>
        </div>
        <h1 className="nombre-usuario">{`${usuario.nombres} ${usuario.apellidoPaterno}`}</h1>
        <div className="contenedor-roles">
          <CajaDeRoles />
        </div>
        <h4 className="antiguedad-usuario">{` Antigüedad: ${momentFromNow}`}</h4>
        {soyYo && <BotonMiInfo id="boton-mi-info" />}
      </div>
    </div>
  );
};