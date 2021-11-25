import React from "react";
import portada from "../../assets/imagenes/home/portada.jpg";
import Cards from "../cards/Cards";
import "./Home.css";

const Home = () => {
  return (
    <>
      <img src={portada} className="portada" alt="portada" />
      <Cards />
    </>
  );
};

export default Home;
