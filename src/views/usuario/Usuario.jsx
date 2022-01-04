import "./Usuario.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { getById } from "../../state/usuarios";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";
import TabEquipoOActividades from "../../components/TabEquipoOActividades/TabEquipoOActividades";
import CircularProgress from "@mui/material/CircularProgress";
import NotFound from "../notFound/NotFound";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const Usuario = () => {
  const rolesCargados = useSelector(({ cargaDeRoles }) => cargaDeRoles);
  const [trigger, setTrigger] = useState(true);
  const id = useParams().idPersona;
  const dispatch = useDispatch();
  const historialDeUsuario = useSelector((state) => state.historialDeUsuario);
  const usuarios = useSelector(({ usuarios }) => usuarios);
  const usuario = useSelector(({ usuario }) => usuario);
  const cantEquip = historialDeUsuario.filter(
    (equipo) => equipo.activo === true
  );
  useEffect(() => {
    dispatch(getById({ id }))
    .then(() => setTrigger(false))
  }, [id, dispatch]);

 if (usuarios.notFound) return <NotFound />;

  return trigger ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "320px",
      }}
    >
      <CircularProgress />
    </Box>
  ) : usuarios.idPersona === usuario.idPersona ||
    usuario.isAdmin ||
    usuario.isCoordinador ? (
    <div className="contenedor">
      <TarjetaUsuario usuario={usuarios} />
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
  ) : (
    <NotFound />
  );
};
