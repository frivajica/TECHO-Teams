import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { usuario } from "../../utils/mockData";
import "./UserMenu.css";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
        {usuario.nombre}
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
          onClick={() => navigate(`/miPerfil/${usuario.id}`, { replace: false })}
        >
          Mi Perfil
        </MenuItem>
        {(usuario.cargo === "Coordinador" || usuario.cargo === "Admin") && (
          <MenuItem onClick={handleClose}>Mis Equipos</MenuItem>
        )}
        {usuario.cargo === "Admin" && (
          <MenuItem onClick={handleClose}>AdminLand</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
      </Menu>
    </div>
  );
};
