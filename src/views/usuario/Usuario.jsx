import "./Usuario.css";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";
import { HistorialEquipos } from "../../components/historialEquipos/HistorialEquipos";
import TabEquipoOActividades from "../../components/TabEquipoOActividades/TabEquipoOActividades";
export const Usuario = () => {
  const historialDeUsuario = useSelector((state) => state.historialDeUsuario);
  const usuario = useSelector((state) => state.usuario);
  const cantEquip = historialDeUsuario.filter(
    (equipo) => equipo.activo === true
  );

  return (
    <div className="contenedor">
      <TarjetaUsuario usuario={usuario} />
      <Divider variant="middle" className="divisor" />
      <p className="participaciones">
        Participando en{" "}
        <span className="num-proyectos">{`${cantEquip.length} equipos`}</span>
      </p>
      <Divider variant="middle" className="divisor" />
<<<<<<< HEAD
      <TabEquipoOActividades/>
=======
      <TabEquipoOActividades />
>>>>>>> d75dd5e90de7ccdb8efc045a22f66bb8ac23be77
    </div>
  );
};
