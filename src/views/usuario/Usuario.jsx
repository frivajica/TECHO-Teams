import "./Usuario.css";
import Divider from "@mui/material/Divider";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";
import { HistorialEquipos } from "../../components/historialEquipos/HistorialEquipos";

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
      <HistorialEquipos />
    </div>
  );
};
