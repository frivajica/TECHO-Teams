import { Conformacion } from "./conformacion/Conformacion.jsx";
import { InfoEquipo } from "./infoEquipo/InfoEquipo.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEquipo } from "../../state/equipo.js";
import { useParams } from "react-router-dom";
import { getRoles } from "../../state/rol";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import NotFound from "../../views/notFound/NotFound";
import axios from "axios";

export const Equipo = () => {
  const [trigger, setTrigger] = useState(false);
  const [permitido, setPermitido] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const equipo = useSelector(({ equipo }) => equipo);
  const usuario = useSelector(({ usuario }) => usuario);

  useEffect(() => {
    if (
      usuario.isAdmin ||
      usuario.sedeIdCoord === equipo.sedeId ||
      (usuario.paisIdCoord === equipo.paisId &&
        usuario.areaCoord === equipo.area)
    ) {
      setPermitido(true);
    } else {
      axios
        .get(
          `http://localhost:3001/api/usuarios/${usuario.idPersona}/misEquipos`
        )
        .then((res) => res.data)
        .then((equipos) =>
          equipos.map((userEquipo) => {
            if (userEquipo.equipoId === equipo.id && userEquipo.activo || userEquipo.roleId == "1")
              setPermitido(true);
          })
        )
        .catch((err) => console.log(err));
    }

    dispatch(getRoles());
    dispatch(getEquipo(id)).then(({ payload }) => setTrigger(true));
  }, []);

  if (trigger) {
    if (permitido) {
      return (
        <div>
          <InfoEquipo />
          <Conformacion />
        </div>
      );
    } else {
      return <NotFound />;
    }
  } else {
    return (
      <div>
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
      </div>
    );
  }
};
