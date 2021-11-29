import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSpring, animated } from "react-spring/";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { CustomHook } from "../../hooks/CustomHook";
import { loginRequest } from "../../state/usuario";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => open && onEnter && onEnter(),
    onRest: () => !open && onExited && onExited(),
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
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const errorAlert = () => {
  swal({
    title: "Login fallido",
    text: "Intentalo nuevamente",
    button: "Aceptar",
    icon: "error",
  });
};

const LoginModal = ({ open, handleClose }) => {
  const mail = CustomHook("");
  const password = CustomHook("");
  const dispatch = useDispatch();

  const handleLoginClick = (e) => {
    e.preventDefault();
    dispatch(
      loginRequest({ mail: mail.value, password: password.value, errorAlert })
    );
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            variant="h6"
            component="h6"
            className="size16"
          >
            BIENVENIDX A TECHO
          </Typography>
          <hr />
          <br />
          <form onSubmit={handleLoginClick}>
            <Box id="formBox">
              <Typography component="h2"> Mail: </Typography>
              <TextField
                size="small"
                fullWidth
                label="Mail"
                id="fullWidth"
                {...mail}
              />
              <br />
              <br />
              <Typography component="h2"> Contraseña: </Typography>
              <TextField
                type="password"
                size="small"
                fullWidth
                label="Contraseña"
                id="fullWidth"
                {...password}
              />
            </Box>
            <br />
            <div className="linksContainter">
              <div>
                <Link
                  className="links size16"
                  href="https://actividades.techo.org/password/reset"
                  underline="hover"
                >
                  {"OLVIDÉ MI CONTRASEÑA"}
                </Link>
                <Link
                  className="links size10"
                  href="https://actividades.techo.org/registro"
                  underline="hover"
                >
                  {"REGISTRATE CON MAIL"}
                </Link>
              </div>
              <Button
                id="ingresar"
                size="medium"
                variant="outlined"
                type="submit"
              >
                INGRESAR
              </Button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
