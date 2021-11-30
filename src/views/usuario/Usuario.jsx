import "./Usuario.css";
import Divider from "@mui/material/Divider";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";

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
      {
        //historia (Actividades en las que ha participado, sus fechas y sus roles en ellas) //https://actividades.techo.org/ajax/actividades/20786
      }
    </div>
  );
};
