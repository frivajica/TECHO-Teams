import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { obtenerHistorial } from "../../state/historialDeUsuario"
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { usuario } from "../../utils/mockData";
import ButtonBase from "@mui/material/ButtonBase";
import "./CajaDeRoles.css";

export const CajaDeRoles = () => {
  //const { roles } = usuario
  const dispatch = useDispatch()
  const historialDeUsuario = useSelector(state => state.historialDeUsuario)
  const roles = []
  
  useEffect(() =>{
   dispatch(obtenerHistorial())
   .then(({payload}) => {
     console.log("el payload",payload)
     payload.map(historia => {
      historia.activo && roles.push(historia.roles)
     })
   })
  }, [])

  console.log("los roles -->", roles)

  return (
    <div className="caja">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} id="roles">
        {/* {roles.activos.map((value) => (
          <ButtonBase id='ripple' key={value}>
            <Chip label={value} color="primary" />
          </ButtonBase>
        ))}
        {roles.inactivos.map((value) => (
          <ButtonBase id='ripple' key={value} >
            <Chip label={value} color="info" variant="outlined" />
          </ButtonBase>
        ))} */}
      </Box>
    </div>
  );
};
