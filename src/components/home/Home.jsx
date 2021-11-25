import React from "react";
import portada from "../../assets/imagenes/home/portada.jpg";
import Cards from "../cards/Cards"
import Box from "@mui/material/Box";

const Home = () => {

  
  return (
    <Box sx={{position:'fixed'}}>
      <img src={portada} alt="portada" width="100%" height="auto" />
      <Cards />
    </Box>
  );
};

export default Home;
