import Chip from "@mui/material/Chip";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import "../tarjetaEquipo/TarjetaEquipo.css";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const TarjetaActividad = ({ nombre, fecha, lugar, rol }) => {
  const inicio = moment(fecha).format("DD MMMM YYYY");

  return (
    <div className="grid-equipo">
      <h2 className="actividad-equipo"> {nombre} </h2>
      <p className="num-proyectos actividad-fechas">
        <span style={{paddingRight: "1.5rem"}}>
          <EventIcon fontSize={"small"} />
          {` ${inicio}`}
        </span>
       {lugar && <span>
          <LocationOnIcon fontSize={"small"} />
          {` ${lugar}`}
        </span>}
      </p>
      <div className="roles-equipo">
        <span id="roles-titulo">Rol:</span>
        {rol && (
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
            id="lista-roles"
          >
            <ButtonBase id="ripple">
              <Chip label={rol} color="primary" />
            </ButtonBase>
          </Box>
        )}
      </div>
    </div>
  );
};

export default TarjetaActividad;
