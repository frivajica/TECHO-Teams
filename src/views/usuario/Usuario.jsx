import "./Usuario.css";
import { useSelector } from "react-redux"
import Divider from "@mui/material/Divider";
import { TarjetaUsuario } from "../../components/tarjetaUsuario/TarjetaUsuario";
import { HistorialEquipos } from "../../components/historialEquipos/HistorialEquipos";


export const Usuario = () => {

  const usuario = useSelector(state => state.usuario)

  return (
    <div className="contenedor">
      <TarjetaUsuario usuario={usuario} />
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
