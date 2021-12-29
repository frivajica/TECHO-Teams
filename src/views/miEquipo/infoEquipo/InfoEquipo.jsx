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
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const InfoEquipo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const equipo = useSelector(({ equipo }) => equipo);
  const usuario = useSelector(({ usuario }) => usuario);
  const historialDeUsuario = useSelector(
    ({ historialDeUsuario }) => historialDeUsuario
  )

  const coordinaEquipos = () => {
    const equipo = historialDeUsuario.filter(
      historial =>
        (historial.equipo?.id == id &&
        historial.roles[0]?.nombreRol == "coordinador/a")
    );
    return (equipo.length || usuario.isAdmin || usuario.isCoordinador) ? true : false;
  };


  function click() {
    equipo.activo
      ? swal({
          title: "¿Estás seguro?",
          text: "Puedes volver a habilitarlo en cualquier momento",
          icon: "warning",
          buttons: ["Cancelar", "Ok"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(
              deactivateEquipo({
                id: equipo.id,
                idPersona: usuario.idPersona,
                token: usuario.token,
              })
            );
            swal("El equipo ha sido deshabilitado!", {
              icon: "success",
            });
          } else {
            swal("El equipo sigue habilitado");
          }
        })
      : dispatch(
          activateEquipo({
            id: equipo.id,
            idPersona: usuario.idPersona,
            token: usuario.token,
          })
        );
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
              {(equipo.activo && coordinaEquipos()) && (
                <Link to="/search" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    startIcon={<PersonAddAltOutlinedIcon />}
                  >
                    INTEGRANTE
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div>
          <CardInfoEquipo equipo={equipo} />
          <div className="Buttons mt">
            <div>
              <Button
                variant="contained"
                onClick={() => navigate(`/equipo/${equipo.id}/historia`)}
              >
                Historia
              </Button>
            </div>
            { coordinaEquipos() &&
            <>
            <div>
              <Button
                variant="contained"
                onClick={() => click()}
                color={equipo.activo ? "error" : "success"}
              >
                {equipo.activo ? "Deshabilitar" : "Habilitar"}
              </Button>
            </div>
            <div>
              {equipo.activo &&
                <Button
                  variant="contained"
                  onClick={() => navigate(`/equipo/${equipo.id}/editar`)}
                >
                  EDITAR
                </Button>
              }
            </div></>}
          </div>
        </div>
      </Box>
      <Divider id="divisor-Equipo" variant="middle" />
    </Box>
  );
};
