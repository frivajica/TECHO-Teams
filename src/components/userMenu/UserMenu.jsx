import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./UserMenu.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUsuario } from "../../state/usuario";

export const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector(({ usuario }) => usuario.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAction = () => {
    dispatch(setUsuario({}))
    navigate("/")
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="PERRITO">
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
        id="positioned-menu"
        aria-labelledby="demo-positioned-button"
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
        <MenuItem
          onClick={() =>
            navigate(`/miPerfil`)
          }
        >
          Mi Perfil
        </MenuItem>
        {(usuario.cargo === "Coordinador" || usuario.cargo === "Admin") && (
          <MenuItem onClick={handleClose}>Mis Equipos</MenuItem>
        )}
        {usuario.cargo === "Admin" && (
          <MenuItem onClick={handleClose}>AdminLand</MenuItem>
        )}
        <MenuItem onClick={handleAction} >Cerrar Sesión</MenuItem>
      </Menu>
    </div>
  );
};
