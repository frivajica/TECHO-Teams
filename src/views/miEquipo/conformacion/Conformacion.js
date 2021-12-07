import React from "react";
import "./Conformacion.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import swal from "sweetalert";

 
function Conformacion() {
  const [state, setState] = React.useState("");
  function click() {
    state ? setState(false): setState(true);
    
  }


  return (
        <Box >
      <Box className="condicion" sx={{}}>
        <label>
          <p>{!state?"Habilitado":"Deshabilitado"}</p>
        </label>
      </Box>
    <Box id="grid"sx={!state?{color:"#212529" }:{bgcolor:"#9e9e9e", borderRadius: 5,color:"#e0e0e0" }}>
      <div class="Title">
        <label>
          <p>Equipos </p>
         </label>
      </div>
      <div>
        <Box >
          <label class="TypEquipo" gutterBottom component="div">
            Conciencia Pinera - Propuesta techo
          </label>
        </Box>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => click()}
          color={!state ? "error" : "success"}
        >
          {!state ? "Deshabilitar" : "Habilitar"}
        </Button>
        
      </div>
      <div class="TitleDetalle">
        <label>
          <p>Detalles </p>
        </label>
      </div>
      <div>
        <Box >
          <label class="TypDetalle" gutterBottom component="div">
            Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit
            taciti malesuada venenatis ut penatibus, litora ad integer libero
            vestibulum nisi pulvinar sapien pellentesque in posuere eu, praesent
            dis et porttitor condimentum porta sociis congue quis arcu curabitur
            felis.
          </label>
        </Box>
      </div>
      <div>
        <Button variant="contained">Historia</Button>
      </div>
    </Box>
      </Box>
  );
}

export default Conformacion;
