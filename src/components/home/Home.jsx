import React from "react";
import Cards from "../cards/Cards";
import "./Home.css";

const Home = () => {
  return (
    <>
    <div id="portada">
      <h1 className="textoPortada">PLATAFORMA DE GESTIÓN DE EQUIPOS</h1>
    </div>
      <Cards />
    </>
  );
};

export default Home;
