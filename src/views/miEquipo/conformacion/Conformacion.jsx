import { TarjetaRoles } from "../../../components/tarjetaRoles/TarjetaRoles";
import Divider from "@mui/material/Divider";
import "./Conformacion.css";

export const Conformacion = () => {
  return (
    <div className="conformacion">
      <div className="presentacion-seccion">
        <h2>Conformación</h2>
        <p>
          Definí la composición de tu equipo, indicando los roles y si es
          fundamental para el funcionamiento del mismo.
        </p>
      </div>
      <div id="modificar-roles">
        {/* mapear esto */} <TarjetaRoles />
      </div>
      <Divider variant="middle" className="divisor" />
      <div id="agregar-roles">
				<h2>Añadir rol</h2>
        <TarjetaRoles/>
      </div>
    </div>
  );
};
