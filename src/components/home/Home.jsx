import React from "react";
import portada from "../../assets/imagenes/home/portada.jpg";
import Cards from "../cards/Cards";

const Home = () => {
  return (
    <div>
      <div>
        <img src={portada} alt="portada" width="100%" height="auto" />
      </div>
      <Cards />
    </div>
  );
};

export default Home;
