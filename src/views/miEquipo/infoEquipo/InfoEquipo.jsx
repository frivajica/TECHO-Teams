import React from "react";
import "../conformacion/Conformacion.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import CardInfoEquipo from "./CardInfoEquipo";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deactivateEquipo, activateEquipo } from "../../../state/equipo";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useNavigate } from "react-router-dom"

export const InfoEquipo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const equipo = useSelector(({ equipo }) => equipo);
  const usuario = useSelector(({ usuario }) => usuario);

  function click() {
    equipo.activo
      ? dispatch(deactivateEquipo(equipo.id, usuario.idPersona, usuario.token))
      : dispatch(activateEquipo(equipo.id, usuario.idPersona, usuario.token));
  }

  return (
    <Box className="box-contenedor">
      <Box id="grid">
        <div className="Titles">
          <div className="TitleNombre">
            <label className="Nombre-equipo">
              <h1>
                {" "}
                {`${equipo.nombre} `}
                {equipo.activo ? (
                  <Tooltip title="Equipo activo">
                    <CircleIcon
                      sx={{
                        fontSize: "medium",
                        color: "success.main",
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Alert
                    sx={{ borderRadius: 1, width: "100%" }}
                    variant="filled"
                    severity="error"
                  >
                    Equipo Deshabilitado
                  </Alert>
                )}
              </h1>
            </label>
          </div>
          <div className="TitleDetalle">
            <label>
              <p>{equipo.detalles}</p>
            </label>
            <div className="Buttons mt">
             {equipo.activo && <Link to="/search" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  startIcon={<PersonAddAltOutlinedIcon />}
                >
                  INTEGRANTE
                </Button>
              </Link>}
            </div>
          </div>
        </div>

        <div>
          <CardInfoEquipo equipo={equipo} />
          <div className="Buttons mt">
            <div>
              <Button variant="contained" onClick={() => navigate(`/miEquipo/${equipo.id}/historia`)}>Historia</Button>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => click()}
                color={equipo.activo ? "error" : "success"}
              >
                {equipo.activo ? "Deshabilitar" : "Habilitar"}
              </Button>
            </div>
          </div>
        </div>
      </Box>
      <Divider id="divisor-Equipo" variant="middle" />
    </Box>
  );
};
