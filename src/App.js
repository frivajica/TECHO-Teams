import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./commons/navbar/Navbar";
import Footer from "./commons/footer/Footer";
import Home from "./components/home/Home";
import SignUp from "./components/completarSignUp/SignUp";
import Register from "./components/Register/Register";
import { Equipo } from "./views/miEquipo/Equipo";
import EventosEquipo from "./views/miEquipo/historial/historial";
import { Usuario } from "./views/usuario/Usuario";
import MiInformación from "./views/miInformación/MiInformación";
import { useSelector } from "react-redux";
import { CrearEquipo } from "./components/crearEquipo/CrearEquipo";
import Search from "./components/search/Search";
import EditarEquipo from "./components/editarEquipo/EditarEquipo";
import BuscadorEquipos from "./views/buscadorEquipos/BuscadorEquipos";
import NotFound from "./views/notFound/NotFound";
import AdminView from "./views/AdminView/AdminView";

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
              usuario.nombres && !usuario.intereses ? <SignUp /> : (usuario.nombres ? <Usuario /> : <NotFound />)
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
          <Route exact path="/miEquipo/:id/editar" element={usuario.isAdmin || usuario.isCoordinador ? <EditarEquipo /> : <NotFound />} />
          <Route exact path="/miEquipo/:equipoId/historia" element={<EventosEquipo />}
          />
          <Route exact path="/crearEquipo" element={usuario.isAdmin || usuario.isCoordinador ? <CrearEquipo /> : <NotFound />} />
          <Route exact path="/search" element={usuario.isAdmin || usuario.isCoordinador ? <Search /> : <NotFound />} />
          <Route exact path="/buscarEquipos" element={usuario.isAdmin || usuario.isCoordinador ? <BuscadorEquipos /> : <NotFound />} />
          {/* <Route exact path="/404" element={<NotFound />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route exact path="/admin" element={usuario.isAdmin? <AdminView /> : <NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
