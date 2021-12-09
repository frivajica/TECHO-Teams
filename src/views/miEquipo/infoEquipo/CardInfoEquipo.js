import Card from "@mui/material/Card";
import "../conformacion/Conformacion.css";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
      />
      <CardContent
        sx={
          equipo.activo
            ? { color: "#212529" }
            : {
                bgcolor: "#9e9e9e",

                color: "#e0e0e0",
              }
        }
      >
        <Box id="CardInfogrid">
          <div className="propiedades">
            <label>
              <p>Miembros:</p>
            </label>
          </div>
          <div>
            {equipo.activo ? (
              <label>{equipo.cantMiembros}</label>
            ) : (
              <del>
                <label>{equipo.cantMiembros}</label>{" "}
              </del>
            )}
          </div>
          <div className="propiedades">
            <label>
              <p>Area:</p>
            </label>
          </div>
          <div>
            {equipo.activo ? (
              <label>{equipo.area}</label>
            ) : (
              <del>
                <label>{equipo.area}</label>
              </del>
            )}
          </div>
          <div className="propiedades">
            <label>
              <p>Pais:</p>
            </label>
          </div>
          <div>
            {equipo.activo ? (
              <label>{pais}</label>
            ) : (
              <del>
                <label>{pais}</label>
              </del>
            )}
          </div>
          <div className="propiedades">
            <label>
              <p>Sede:</p>
            </label>
          </div>
          <div>
            {equipo.activo ? (
              <label>{sedes}</label>
            ) : (
              <del>
                {" "}
                <label>{sedes}</label>
              </del>
            )}
          </div>
          <div className="propiedades">
            <label>
              <p>Territorio:</p>
            </label>
          </div>
          <div>
            {equipo.activo ? (
              <label>barrio</label>
            ) : (
              <del>
                <label>barrio</label>
              </del>
            )}
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
