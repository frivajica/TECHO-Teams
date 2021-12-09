import Card from "@mui/material/Card";
import "../conformacion/Conformacion.css";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CardInfoEquipo({ equipo }) {
  const [pais, setPais] = useState("");
  const [sedes, setSedes] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/regiones/paises").then((res) =>
      res.data.map((pais) => {
        if (pais.id === equipo.paisId) {
          setPais(pais.nombre);
        }
      })
    );
    axios.get("http://localhost:3001/api/sedes").then((res) =>
      res.data.map((sede) => {
        if (sede.id === equipo.sedeId) {
          setSedes(sede.nombre);
        }
      })
    );
  }, []);

  return (
    <Card sx={{ width: 500 }}>
      <CardMedia
        component="img"
        height="340"
        image={equipo.img}
        alt="green iguana"
        className={equipo.activo ? "foto-activo" : "foto-inactivo"}
      />
      <CardContent>
        <Box id="CardInfogrid">
          <div className="propiedades">
            <label>
              <p>Miembros:</p>
            </label>
          </div>
          <div> 
              <label>{equipo.cantMiembros}</label>
          </div>
          <div className="propiedades">
            <label>
              <p>Area:</p>
            </label>
          </div>
          <div>
              <label>{equipo.area}</label>
          </div>
          <div className="propiedades">
            <label>
              <p>Pais:</p>
            </label>
          </div>
          <div>
              <label>{pais}</label>
          </div>
          <div className="propiedades">
            <label>
              <p>Sede:</p>
            </label>
          </div>
          <div>
              <label>{sedes}</label>
          </div>
          <div className="propiedades">
            <label>
              <p>Territorio:</p>
            </label>
          </div>
          <div>
              <label>barrio</label>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}