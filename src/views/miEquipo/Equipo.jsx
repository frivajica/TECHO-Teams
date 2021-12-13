import { Conformacion } from "./conformacion/Conformacion.jsx";
import { InfoEquipo } from "./infoEquipo/InfoEquipo.jsx";
import { useDispatch } from "react-redux";
import { getEquipo } from "../../state/equipo.js";
import { useParams } from "react-router-dom";
import { getRoles } from "../../state/rol";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Equipo = () => {
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getRoles());
    dispatch(getEquipo(id)).then(({ payload }) => setTrigger(true));
  }, []);

  if (trigger) {
    return (
      <div>
        <InfoEquipo />
        <Conformacion />
      </div>
    );
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
