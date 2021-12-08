import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerHistorialResultado } from "../../state/historialDeResultado";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
//import "./CajaDeRoles.css";

export const CajaRolesResultado = ({ usuarios }) => {
  const dispatch = useDispatch();
  const historialDeResultado = useSelector(
    (state) => state.historialDeResultado
  );
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    dispatch(obtenerHistorialResultado()).then(({ payload }) => {
      let arr = [];
      let obj = {};
      payload.map((historia) => {
        const rol =
          historia.roles[historia.roles.length - 1] &&
          historia.roles[historia.roles.length - 1].nombreRol;
        if (historia.activo && !obj[rol]) {
          obj[rol] = true;
          arr.push(rol);
        }
      });
      setRoles(arr);
    });
  }, [usuarios]);

  return (
    <div className="caja">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} id="roles">
        {roles[0] !== undefined &&
          roles.map((value) => (
            <ButtonBase id="ripple" key={value}>
              <Chip label={value} color="primary" />
            </ButtonBase>
          ))}
      </Box>
    </div>
  );
};
