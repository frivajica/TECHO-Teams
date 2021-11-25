import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/imagenes/navbar/logo.png";
import theme from "../../views/themeConfig"
import { ThemeProvider } from '@mui/material/styles';

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: "#0092dd" }} >
        <Toolbar >
          <Box sx={{flexGrow:1, ml:5}}> 
          <Link to="/">
            <img src={logo} width="122px" height="37.6px" alt="logo"  />
          </Link>
          </Box>
            <Button color="inherit" sx={{mr:5}}>
              INGRESAR
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
};

export default Navbar;
