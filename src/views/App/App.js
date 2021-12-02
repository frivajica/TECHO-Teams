import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import Home from "../../components/home/Home";
import SignUp from "../../components/completarSignUp/SignUp";
import Register from "../../components/Register/Register";
import { Usuario } from "../usuario/Usuario";
import { MiInformación } from "../miInformación/MiInformación";
import { useSelector } from "react-redux";

function App() {
  const usuario = useSelector((state) => state.usuario);

  return (
    <div>
      <Navbar />
      <div className="content">
        <Routes>
          <Route
            exact
            path="/"
            element={
              usuario.nombres && !usuario.intereses ? <SignUp /> : <Home />
            }
          />
          <Route exact path="/completarRegistro" element={<SignUp />} />
          <Route exact path="/registro" element={<Register />} />
          <Route
            exact
            path={`/${usuario.idPersona}`}
            element={
              usuario.nombres && !usuario.intereses ? <SignUp /> : <Usuario />
            }
          />
          <Route
            exact
            path="/miPerfil"
            element={
              usuario.nombres && !usuario.intereses ? (
                <SignUp />
              ) : (
                <MiInformación />
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
