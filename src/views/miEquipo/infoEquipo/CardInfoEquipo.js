import Card from "@mui/material/Card";
import "../conformacion/Conformacion.css";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getToken from "../../../utils/getToken";
export default function CardInfoEquipo({ equipo }) {
  const [pais, setPais] = useState("");
  const [sedes, setSedes] = useState("-");
  const [cantMiembros, setCantMiembros] = useState(0);
  const [territorio, setTerritorio] = useState("-");

  useEffect(() => {
    const promesas = [
      axios.get("http://localhost:3001/api/regiones/paises"),
      axios.get("http://localhost:3001/api/sedes"),
      axios.get(`http://localhost:3001/api/equipos/cantMiembros/${equipo.id}`),
      axios.get("http://localhost:3001/api/comunidades", {
        headers: { authorization: getToken() },
      }),
    ];
    Promise.all(promesas)
      .then((respuestas) => {
        respuestas[0].data.map(
          (pais) => pais.id === equipo.paisId && setPais(pais.nombre)
        );
        respuestas[1].data.map(
          (sede) => sede.id === equipo.sedeId && setSedes(sede.nombre)
        );
        setCantMiembros(respuestas[2].data.length);
        respuestas[3].data.map(
          (barrio) =>
            parseInt(barrio.id) === equipo.territorioId &&
            setTerritorio(barrio.nombre)
        );
      })
      .catch((err) => console.log({ err }));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/equipos/cantMiembros/${equipo.id}`)
      .then((res) => setCantMiembros(res.data.length))
      .catch((err) => console.log({ err }));
  }, [equipo.activo]);

  return (
    <Card sx={{ width: 500 }}>
      <CardMedia
        component="img"
        height="340"
        image={
          equipo.img
            ? `${process.env.PUBLIC_URL}/uploads/equipos/${equipo.img}`
            : "https://media.discordapp.net/attachments/912709181306449925/918618477298864129/grupo.png"
        }
        alt="sin imagen"
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
            <label>
              {" "}
              {cantMiembros} / {equipo.cantMiembros}
            </label>
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
            <label>{territorio.replace(/([A-Z])/g, ' $1')}</label>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
