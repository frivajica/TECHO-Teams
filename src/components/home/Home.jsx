import React from "react";
import Cards from "../cards/Cards";

const Home = () => {
  return (
    <div id="home">
      <div id="portada">
        <h1 className="textoPortada">PLATAFORMA DE GESTIÓN DE EQUIPOS</h1>
      </div>
      <Cards />
    </div>
  );
};

export default Home;
