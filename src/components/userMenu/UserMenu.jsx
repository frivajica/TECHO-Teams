import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { usuario } from "../../utils/mockData";
import "./UserMenu.css";
import { useSelector } from "react-redux";

export const UserMenu = () => {
  const user = useSelector((state) => state.usuario);
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
        {user.user.nombres}
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
        <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
        {(user.user.cargo === "Coordinador" || user.user.cargo === "Admin") && (
          <MenuItem onClick={handleClose}>Mis Equipos</MenuItem>
        )}
        {user.user.cargo === "Admin" && (
          <MenuItem onClick={handleClose}>AdminLand</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
      </Menu>
    </div>
  );
};
