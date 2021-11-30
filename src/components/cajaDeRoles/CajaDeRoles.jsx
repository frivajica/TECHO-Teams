import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { usuario } from "../../utils/mockData";
import ButtonBase from "@mui/material/ButtonBase";
import "./CajaDeRoles.css";

export const CajaDeRoles = () => {
  const { roles } = usuario;

  return (
    <div className="caja">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} id="roles">
        {roles.activos.map((value) => (
          <ButtonBase id='ripple' key={value}>
            <Chip label={value} color="primary" />
          </ButtonBase>
        ))}
        {roles.inactivos.map((value) => (
          <ButtonBase id='ripple' key={value} >
            <Chip label={value} color="info" variant="outlined" />
          </ButtonBase>
        ))}
      </Box>
    </div>
  );
};
