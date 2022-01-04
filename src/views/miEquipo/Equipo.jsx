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
import NotAllowed from "../../views/miEquipo/NotAllowed";
import axios from "axios";

export const Equipo = () => {
  const [trigger, setTrigger] = useState(false);
  const [permitido, setPermitido] = useState(false);
  const [cantMiembros, setCantMiembros] = useState(0);
  const [isAdminOrCoord, setIsAdminOrCoord] = useState(false)
  const dispatch = useDispatch();
  const { id } = useParams();
  const usuario = useSelector(({ usuario }) => usuario);

  useEffect(() => {
    axios
    .get(`http://143.198.238.253:3001/api/equipos/${id}/checkAdminCoordinator`, {
      headers: {
        authorization: usuario.token,
        idPersona: usuario.idPersona
      }
    })
    .then(res => setIsAdminOrCoord(res.data))
    .catch(err => console.log(err))

    dispatch(getRoles());
    dispatch(getEquipo({id, idpersona: usuario.idPersona, token: usuario.token}))
    .then(({payload}) => payload)
    .then(equipo => equipo? setPermitido(true):setPermitido(false))
    .then(() => setTrigger(true))
    .catch((err) => console.log(err));
  }, [dispatch, id, usuario.token, usuario.idPersona]);


  if (trigger) {
    if (permitido) {
      return (
        <div>
          <InfoEquipo isAdminOrCoord={isAdminOrCoord} cantMiembros={cantMiembros} setCantMiembros={setCantMiembros} />
          <Conformacion isAdminOrCoord={isAdminOrCoord} setCantMiembros={setCantMiembros} />
        </div>
      );
    } else {
      return <NotAllowed />;
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
