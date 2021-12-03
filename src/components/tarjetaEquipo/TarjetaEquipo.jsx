import Chip from "@mui/material/Chip";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import "./TarjetaEquipo.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const TarjetaEquipo = ({ nombre, inicio, final, roles, activo }) => {
  inicio = moment(inicio).format("DD MMMM YYYY");
  final = final !== "actualidad" ? moment(final).format("DD MMMM YYYY") : final;

  return (
    <div className="grid-equipo">
      <h2 className="actividad-equipo">
        {`${nombre} `}
        <Tooltip title={activo ? "Equipo activo" : "Equipo inactivo"}>
          <CircleIcon
            sx={{
              fontSize: "small",
              color: activo ? "success.main" : "error.dark",
            }}
          />
        </Tooltip>
      </h2>
      <p className="num-proyectos actividad-fechas">{`Desde ${inicio} - Hasta ${final}`}</p>
      <div className="roles-equipo">
        <span id="roles-titulo">Roles:</span>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
          id="lista-roles"
        >
          {roles.map((value) => (
            <ButtonBase id="ripple" key={value.descripcion.slice(16)}>
              <Chip label={value.descripcion.slice(16)} color="primary" />
            </ButtonBase>
          ))}
        </Box>
      </div>
      <ArrowForwardIosIcon id="flecha-equipo" />
    </div>
  );
};
