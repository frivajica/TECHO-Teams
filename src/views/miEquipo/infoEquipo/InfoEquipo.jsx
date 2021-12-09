import React from "react";
import "../conformacion/Conformacion.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import CardInfoEquipo from "./CardInfoEquipo";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deactivateEquipo, activateEquipo } from "../../../state/equipo";

export const InfoEquipo = () => {
  const dispatch = useDispatch();
  const equipo = useSelector(({ equipo }) => equipo);
  console.log(equipo);
  const id = useParams();

  function click() {
    equipo.activo
      ? dispatch(deactivateEquipo(equipo.id))
      : dispatch(activateEquipo(equipo.id));
  }

  return (
    <Box className="box-contenedor">
      {/* <Box className="condicion">
        {equipo.activo ? (
          <Alert sx={{ borderRadius: 0 }} variant="filled" severity="success">
            Habilitado
          </Alert>
        ) : (
          <Alert sx={{ borderRadius: 0 }} variant="filled" severity="error">
            Deshabilitado{" "}
          </Alert>
        )}
      </Box> */}

      {/* <Divider id="divisor-Equipo" variant="middle" />
 */}      <Box
        id="grid"
        sx={
          equipo.activo
            ? { color: "#212529" }
            : {
                bgcolor: "#9e9e9e",
                borderRadius: 5,
                color: "#e0e0e0",
                margin: 30,
              }
        }
      >
        <div class="Titles">
          <div class="TitleNombre">
            <label className="Nombre-equipo">
                <h1> {`${equipo.nombre} `} 
                <Tooltip title={equipo.activo ? "Equipo activo" : "Equipo inactivo"}>
                <CircleIcon
                sx={{
                  fontSize: "medium",
                  color: equipo.activo ? "success.main" : "error.dark",
                }}
              />
              </Tooltip>
              </h1>
            </label>
          </div>
          <div class="TitleDetalle">
            <label>
              <p>{equipo.detalles}</p>
            </label>
          </div>
        </div>

        <div>
          <CardInfoEquipo equipo={equipo} />
          <div className="Buttons mt">
            <div>
              <Button variant="contained">Historia</Button>
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


/* 

{equipo.activo ? (
                <h1> {`${equipo.nombre} `} 
                <CircleIcon
                sx={{
                  fontSize: "medium",
                  color: equipo.activo ? "success.main" : "error.dark",
                }}
              /></h1>
              ) : (
                <del>{equipo.nombre} </del>
              )}
*/