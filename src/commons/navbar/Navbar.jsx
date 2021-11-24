import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/imagenes/navbar/logo.png";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: "#0092dd" }} position="static">
        <Toolbar sx={{ justifyContent: "space-around"}}>
          <Link to="/">
            <img src={logo} width="122px" height="37.6px" alt="logo" />
          </Link>
            <Button color="inherit">
              INGRESAR
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
