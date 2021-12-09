import "../conformacion/Conformacion.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import CardInfoEquipo from "./CardInfoEquipo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deactivateEquipo, activateEquipo } from "../../../state/equipo";

export const InfoEquipo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const equipo = useSelector(({ equipo }) => equipo);

  function click() {
    equipo.activo
      ? dispatch(deactivateEquipo(equipo.id))
      : dispatch(activateEquipo(equipo.id));
  }

  return (
    <Box>
      <Box className="condicion">
        {equipo.activo ? (
          <Alert sx={{ borderRadius: 0 }} variant="filled" severity="success">
            Habilitado
          </Alert>
        ) : (
          <Alert sx={{ borderRadius: 0 }} variant="filled" severity="error">
            Deshabilitado{" "}
          </Alert>
        )}
      </Box>
      <div className="Buttons">
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
          <Button onClick={() => navigate(`/miEquipo/${equipo.id}/historia`)} variant="contained">Historia</Button>
        </div>
      </div>
      <Divider id="divisor-Equipo" variant="middle" />
      <Box
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
            <label>
              {equipo.activo ? (
                <p> {equipo.nombre}</p>
              ) : (
                <del>{equipo.nombre} </del>
              )}
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
        </div>
      </Box>
      <Divider id="divisor-Equipo" variant="middle" />
    </Box>
  );
};
