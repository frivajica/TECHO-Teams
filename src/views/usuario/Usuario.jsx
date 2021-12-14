import "./Usuario.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { getById } from "../../state/usuarios";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";
import { HistorialEquipos } from "../../components/historialEquipos/HistorialEquipos";
import TabEquipoOActividades from "../../components/TabEquipoOActividades/TabEquipoOActividades";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Usuario = () => {
  const id = useParams().idPersona;
  const dispatch = useDispatch();
  const historialDeUsuario = useSelector((state) => state.historialDeUsuario);
  const usuario = useSelector(({usuarios}) => usuarios);
  const cantEquip = historialDeUsuario.filter(
    (equipo) => equipo.activo === true
  );
  useEffect(() => {
    dispatch(getById({ id }));
  }, []);

  return (
    <div className="contenedor">
      <TarjetaUsuario usuario={usuario} />
      <Divider variant="middle" className="divisor" />
      {cantEquip.length === 0 ? (
        <Box className="participaciones">
          <CircularProgress />
        </Box>
      ) : (
        <p className="participaciones">
          Participando en{" "}
          <span className="num-proyectos">{`${cantEquip.length} equipos`}</span>
        </p>
      )}

      <Divider variant="middle" className="divisor" />
      <TabEquipoOActividades />
    </div>
  );
};
