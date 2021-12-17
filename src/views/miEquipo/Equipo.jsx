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
    dispatch(getRoles());
    console.log("id personita", usuario.idPersona )
    dispatch(getEquipo({id, idpersona: usuario.idPersona, token: usuario.token}))
    .then(({payload}) => payload)
    .then(equipo => equipo? setPermitido(true):setPermitido(false))
    .then(() => setTrigger(true))
  .catch((err) => console.log(err));
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
