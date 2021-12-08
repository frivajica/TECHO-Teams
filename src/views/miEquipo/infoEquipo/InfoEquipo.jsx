import "../conformacion/Conformacion.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CardInfoEquipo from "./CardInfoEquipo"
import { useParams } from "react-router-dom";

export const InfoEquipo = () => {
  const [state, setState] = React.useState("");
  

  const id = useParams();

  

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
        <div class="Titles">
          <div class="TitleNombre">
          <label>
         {!state? /* {equipo.nombre}*/ <p> Apoyo Escolar - Zárate</p>: /* <del>{equipo.nombre} </del>*/<del><p>Apoyo Escolar - Zárate</p> </del> } 
          </label>
          </div>
          <div class="TitleDetalle">
          <label>
           <p>-Somos un equipo que se encarga de brindar apoyo escolar para los niños y niñas de los barrios de Zárate en los que TECHO está presente. -</p> 
          </label>
        </div>
        </div>
        
        <div>
        <CardInfoEquipo state={state}/>
        
        </div>

        
      </Box>
      <Divider id="divisor-Equipo" variant="middle" />
    </Box>
  );
}