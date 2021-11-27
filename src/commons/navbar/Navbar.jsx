import { useState } from "react";
import { Link } from "react-router-dom"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/imagenes/navbar/logo.png";
import LoginModal from "./LoginModal";
import { usuario } from "../../utils/mockData"
import { UserMenu } from "../../components/userMenu/UserMenu"

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="navbar" position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1, ml: 5 }}>
            <Link to="/">
              <img id="logo" src={logo} alt="logo" />
            </Link>
          </Box>
          {usuario && (<UserMenu />)}
              <Button onClick={handleOpen} color="inherit" sx={{ mr: 5 }}>
                INGRESAR
              </Button>
                <LoginModal open={open} handleClose={handleClose} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;