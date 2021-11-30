import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import Home from "../../components/home/Home";
import SignUp from "../../components/completarSignUp/SignUp";
import { Usuario } from "../usuario/Usuario";
import { MiInformación } from "../miInformación/MiInformación";
import { useSelector } from "react-redux";

function App() {
  const usuario = useSelector((state) => state.usuario);

  return (
    <div>
      <Navbar />
      <div className="content">
          {(usuario.nombres && !usuario.intereses) && <Navigate to="/register" />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/:usuario" element={<Usuario />} />
          <Route exact path="/miPerfil" element={<MiInformación />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
