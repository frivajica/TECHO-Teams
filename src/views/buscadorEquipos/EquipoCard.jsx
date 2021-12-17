import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const EquipoCard = ({ equipo }) => {
  const navigate = useNavigate()
  const [miembros, setMiembros] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/equipos/cantMiembros/${equipo.id}`)
      .then((res) => setMiembros(res.data.length))
      .catch((err) => console.log(err));
  }, []);


  return (
    <Card sx={{ width: 345 }} onClick={() => navigate(`/equipo/${equipo.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            equipo.img
              ? equipo.img
              : "https://media.discordapp.net/attachments/912709181306449925/918618477298864129/grupo.png"
          }
          alt="imagen de equipo"
        />
        <CardContent
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>
            {`${equipo.nombre} `}
            <Tooltip title={equipo.activo ? "Equipo activo" : "Equipo inactivo"}>
              <CircleIcon
                sx={{
                  fontSize: "10px",
                  color: equipo.activo ? "success.main" : "error.dark",
                }}
              />
            </Tooltip>
          </span>
          <span style={{ color: "#0092dd" }}>
            {`${miembros}/${equipo.cantMiembros}`}
          </span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EquipoCard;
