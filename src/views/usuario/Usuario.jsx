import "./Usuario.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { getById } from "../../state/usuarios";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";
import TabEquipoOActividades from "../../components/TabEquipoOActividades/TabEquipoOActividades";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const Usuario = () => {
  const rolesCargados = useSelector(({ cargaDeRoles }) => cargaDeRoles);
  const historialDeUsuario = useSelector((state) => state.historialDeUsuario);
  const usuario = useSelector(({ usuarios }) => usuarios);
  const id = useParams().idPersona;
  const dispatch = useDispatch();
  const cantEquip = historialDeUsuario.filter((eq) => eq.activo === true);
  useEffect(() => {
    dispatch(getById({ id }));
  }, [id]);

  return (
    <div className="contenedor">
      <TarjetaUsuario usuario={usuario} />
      <Divider variant="middle" className="divisor" />
      {!rolesCargados ? (
        <Box className="participaciones">
          <CircularProgress />
        </Box>
      ) : (
        <p className="participaciones">
          {rolesCargados ? (
            <div>
              Participando en{" "}
              <span className="num-proyectos">{`${cantEquip.length} equipos`}</span>
            </div>
          ) : (
            <div>
              <Skeleton />
            </div>
          )}
        </p>
      )}
      <Divider variant="middle" className="divisor" />
      <TabEquipoOActividades />
    </div>
  );
};
