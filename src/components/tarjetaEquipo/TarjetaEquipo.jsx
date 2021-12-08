import Chip from "@mui/material/Chip";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import "./TarjetaEquipo.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import "moment/locale/es";
import { useDispatch } from "react-redux";
import setEquipo from "../../state/equipo";
import { useNavigate } from "react-router-dom";

moment.locale("es");

export const TarjetaEquipo = ({ final, roles, activo, equipo }) => {
  const inicio = moment(equipo.createdAt).format("DD MMMM YYYY");
  final = final !== "actualidad" ? moment(final).format("DD MMMM YYYY") : final;
  const navigate = useNavigate();

  const showEquipo = () => {
    navigate(`/miEquipo/${equipo.id}`);
  };

  return (
    <div className="grid-equipo">
      <h2 className="actividad-equipo">
        {`${equipo.nombre} `}
        <Tooltip title={activo ? "Equipo activo" : "Equipo inactivo"}>
          <CircleIcon
            sx={{
              fontSize: "small",
              color: activo ? "success.main" : "error.dark",
            }}
          />
        </Tooltip>
      </h2>
      <p className="num-proyectos actividad-fechas">{`Desde ${equipo.createdAt} - Hasta ${final}`}</p>
      <div className="roles-equipo">
        <span id="roles-titulo">Roles:</span>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
          id="lista-roles"
        >
          {roles.map((value) => (
            <ButtonBase id="ripple" key={value.nombreRol}>
              <Chip label={value.nombreRol} color="primary" />
            </ButtonBase>
          ))}
        </Box>
      </div>
      {activo && (
        <ArrowForwardIosIcon id="flecha-equipo" onClick={showEquipo} />
      )}
    </div>
  );
};
