import { usuario as u } from "../../utils/mockData";
import ButtonBase from "@mui/material/ButtonBase";
import { CajaDeRoles } from "../cajaDeRoles/CajaDeRoles";
import "./TarjetaUsuario.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import {  useLocation } from 'react-router-dom';
import { BotonMiInfo } from '../../components/botonMiInfo/BotonMiInfo'

export const TarjetaUsuario = () => {
  const usuario = useSelector((state) => state.usuario);
  const navigate = useNavigate();
  const location = useLocation();
  let soyYo = `/${usuario.idPersona}` ===  location.pathname;
  
  return (
    <div className="tarjeta-usuario">
      <div className="grid-usuario">
        <div className="avatar-usuario">
          <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
            <img className="avatar" src={u.avatar} alt="Avatar de Usuario" />
          </ButtonBase>
        </div>
        <h1 className="nombre-usuario">{`${u.nombres} ${u.apellidoPaterno}`}</h1>
        <div className="contenedor-roles">
          <CajaDeRoles />
        </div>
        <h4 className="antiguedad-usuario">{`${`### años`} en TECHO`}</h4>
        {soyYo && <BotonMiInfo id="boton-mi-info" />}
      </div>
    </div>
  );
};
