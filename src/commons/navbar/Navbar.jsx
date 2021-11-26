import React from "react";
 import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/imagenes/navbar/logo.png";
import theme from "../../views/themeConfig";
import { ThemeProvider } from "@mui/material/styles";
import { useSpring, animated } from "react-spring/";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link  from "@mui/material/Link";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ background: "#0092dd" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, ml: 5 }}>
              <Link to="/">
                <img src={logo} width="122px" height="37.6px" alt="logo" />
              </Link>
            </Box>
            <Button onClick={handleOpen} color="inherit" sx={{ mr: 5 }}>
              INGRESAR
            </Button>
            <Modal
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id="spring-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    BIENVENIDX A TECHO
                  </Typography>
                  <form>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <Typography component="h2"> Mail: </Typography>

                      <TextField fullWidth label="Mail" id="fullWidth" />
                      <Typography component="h2"> Contraseña: </Typography>
                      <TextField fullWidth label="Contraseña" id="fullWidth" />
                      
                     
                    </Box>
                    <Link href="https://actividades.techo.org/password/reset" underline="hover">
                        {'OLVIDÉ MI CONTRASEÑA'}
                      </Link>
                       
                      <Link href="https://actividades.techo.org/registro" underline="hover">
                        {'registrate con email'}
                      </Link>
                  </form>
                </Box>
              </Fade>
            </Modal>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
