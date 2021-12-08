import "../conformacion/Conformacion.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

import { useParams } from "react-router-dom";

export const InfoEquipo = () => {
  const [state, setState] = React.useState("");
  const [equipo, setEquipo] = useState([]);

  const id = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/miEquipo/${id}`)
      .then((res) => setEquipo(res.data))
      .catch((err) => console.log(err));
  }, []);

  function click() {
    state ? setState(false) : setState(true);
  }
  

  return (
    <Box>
      <Box className="condicion">
        {!state ? (
          <Alert sx={{borderRadius:0}} variant="filled" severity="success">
            Habilitado
          </Alert>
        ) : (
          <Alert sx={{borderRadius:0}}  variant="filled" severity="error">
            Deshabilitado{" "}
          </Alert>
        )}
      </Box>
      <div className="Buttons">
        <div>
          <Button
            variant="contained"
            onClick={() => click()}
            color={!state ? "error" : "success"}
          >
            {!state ? "Deshabilitar" : "Habilitar"}
          </Button>
        </div>
        <div>
          <Button variant="contained">Historia</Button>
        </div>
      </div>
      <Divider id="divisor-Equipo" variant="middle" />
      <Box
        id="grid"
        sx={
          !state
            ? { color: "#212529" }
            : {
                bgcolor: "#9e9e9e",
                borderRadius: 5,
                color: "#e0e0e0",
                margin: 30,
              }
        }
      >
        <div className="Title">
          <label>
            <p>Equipos:</p>
          </label>
        </div>
        <div>
          <Box>
            <label className="TypEquipo" component="div">
              Reparación de veredas - Nueva Córdoba
            </label>
          </Box>
        </div>

        <div className="Title">
          <label>
            <p>Detalles:</p>
          </label>
        </div>
        <div>
          <label className="TypDetalle">
            Nos encargamos de la organización y planificación de las
            construcciones que Techo lleva a cabo en el Gran Buenos Aires.
          </label>
        </div>

        <div className="Title">
          <label>
            <p>Cantidad de Miembros:</p>
          </label>
        </div>
        <div>
          <label>12</label>
        </div>
        <div className="Title">
          <label>
            <p>Area:</p>
          </label>
        </div>
        <div>
          <label>Vivienda y Habitat</label>
        </div>
        <div className="Title">
          <label>
            <p>Pais:</p>
          </label>
        </div>
        <div>
          <label>Argentina</label>
        </div>
        <div className="Title">
          <label>
            <p>Sede:</p>
          </label>
        </div>
        <div>
          <label>no se</label>
        </div>
        <div className="Title">
          <label>
            <p>Territorio:</p>
          </label>
        </div>
        <div>
          <label>barrio</label>
        </div>
        <div className="img">
          <img
            width="300"
            height="300"
            src="https://noticiasdevillalaangostura.com/wp-content/uploads/2020/10/Asfalto-21.10-1-e1603293272248.jpg"
            alt="MDN"
          />
        </div>
      </Box>
    </Box>
  );
}