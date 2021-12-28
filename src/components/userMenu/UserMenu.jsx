import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SecurityIcon from "@mui/icons-material/Security";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import "./UserMenu.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutRequest, setUsuario } from "../../state/usuario";

export const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAction = () => {
    dispatch(logoutRequest());
    navigate("/");
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {usuario && usuario.nombres}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => navigate(`/${usuario.idPersona}`)}>
          <AccountCircleIcon className="color" />Mi Perfil
        </MenuItem>
        {/* {(usuario.cargo === "Coordinador" || usuario.cargo === "Admin") && (
          <MenuItem onClick={handleClose}>Mis Equipos</MenuItem> ------>ESTO VA?????
        )} */}
        {(usuario.isAdmin || usuario.isCoordinador) && (
          <div>
          <MenuItem onClick={() => navigate("/buscarEquipos")}>
            <SearchIcon className="color" />Equipos
          </MenuItem>
          {usuario.isAdmin && <MenuItem onClick={() => navigate("/admin")}>
            <SecurityIcon className="color" />
            AdminLand
          </MenuItem>}
          <MenuItem onClick={() => navigate("/crearEquipo")}> 
          <GroupAddIcon className="color" /> Crear Equipo
          </MenuItem>
          </div>
        )}
        <MenuItem onClick={handleAction}><LogoutIcon className="color" />Cerrar Sesión</MenuItem>
      </Menu>
    </div>
  );
};
