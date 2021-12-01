import "./Usuario.css";
import Divider from "@mui/material/Divider";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";
import { HistorialActividades } from "../../components/historialActividades/HistorialActividades";

export const Usuario = () => {
  return (
    <div className="contenedor">
      <TarjetaUsuario />
      <Divider variant="middle" className="divisor" />
      <p className="participaciones">
        Participando en
        <span className="num-proyectos">{` ${`### proyectos`} `}</span>
      </p>
      <Divider variant="middle" className="divisor" />
      <HistorialActividades />
    </div>
  );
};
