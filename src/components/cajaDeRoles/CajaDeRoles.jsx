import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerHistorial } from "../../state/historialDeUsuario";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import "./CajaDeRoles.css";
import Skeleton from "@mui/material/Skeleton";

export const CajaDeRoles = () => {
  const dispatch = useDispatch();
  const historialDeUsuario = useSelector((state) => state.historialDeUsuario);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    dispatch(obtenerHistorial()).then(({ payload }) => {
      let arr = [];
      let obj = {};
      payload?.map((historia) => {
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
  }, []);

  return (
    <div className="caja">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} id="roles">
        {!roles.length ? ([1,2].map((n)=>   <Skeleton key={n} sx={{width:120,height:50, borderRadius:5}} /> )
       
        ) : (
          roles.map((value, i) => (
            <ButtonBase id="ripple" key={i}>
              {value && <Chip label={value} color="primary" />}
            </ButtonBase>
          ))
        )}
      </Box>
    </div>
  );
};
