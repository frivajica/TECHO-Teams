import { useEffect } from "react";
import { Routes, Route, useNavigate, Router } from "react-router-dom";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import Home from "../../components/home/Home";
import SignUp from "../../components/completarSignUp/SignUp";
import Register from "../../components/Register/Register";
import { Equipo } from "../miEquipo/Equipo";
import EventosEquipo from "../miEquipo/historial/historial";
import { Usuario } from "../usuario/Usuario";
import MiInformación from "../miInformación/MiInformación";
import { useSelector } from "react-redux";
import { CrearEquipo } from "../../components/crearEquipo/CrearEquipo";
import Search from "../../components/search/Search";
import EditarEquipo from "../../components/editarEquipo/EditarEquipo";
import UsersForAdmin from "../../components/admin/users";
import BuscadorEquipos from "../buscadorEquipos/BuscadorEquipos";
import SearchAdmin from "../../components/admin/users";
import NotFound from "../notFound/NotFound";
import AdminView from "../../components/admin/AdminView";

function App() {
  const usuario = useSelector((state) => state.usuario);
  const navigate = useNavigate();
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
          {/* VER DE PRIVATIZAR RUTA SOLO PARA QUIENES NO TENGAN INTERESES */}
          <Route
            exact
            path="/completarRegistro"
            element={
              usuario.nombres && usuario.intereses ? <Home /> : <SignUp />
            }
          />
          <Route
            exact
            path="/registro"
            element={!usuario.nombres ? <Register /> : <Home />}
          />

          <Route
            exact
            path={`/:idPersona`}
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
          <Route exact path="/miEquipo/:id" element={<Equipo />} />
          <Route exact path="/miEquipo/:id/editar" element={<EditarEquipo />} />
          <Route
            exact
            path="/miEquipo/:equipoId/historia"
            element={<EventosEquipo />}
          />
          <Route exact path="/crearEquipo" element={<CrearEquipo />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/buscarEquipos" element={<BuscadorEquipos />} />
          <Route exact path="/admin" element={<SearchAdmin />} />
          {/* <Route exact path="/404" element={<NotFound />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route exact path="/admin" element={<AdminView />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
