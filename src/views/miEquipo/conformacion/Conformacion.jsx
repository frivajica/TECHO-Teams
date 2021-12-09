import { TarjetaRoles } from "../../../components/tarjetaRoles/TarjetaRoles";
import Divider from "@mui/material/Divider";
import { getUsuarios } from "../../../state/equipo";
import { getRolesInfo } from "../../../state/rol";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./Conformacion.css";

export const Conformacion = ({id}) => {
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const dispatch = useDispatch();
  const roles = useSelector(({ rol }) => rol);
  const toogleNuevo = () => {
    setMostrarNuevo(!mostrarNuevo);
  };

  useEffect(() => {
    dispatch(getUsuarios(id));
    dispatch(getRolesInfo(id));
  }, []);

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
        {roles?.map((e) => (
          <TarjetaRoles
            key={e.id}
            id={e.id}
            rol={e.rol}
            persona={e.persona}
            necesario={e.necesario}
            img={e.img}
          />
        ))}
      </div> 
      <Divider variant="middle" className="divisor" />
      <div id="agregar-roles">
        <div id="titulo-nuevo">
          <h2>Añadir rol</h2>
          {mostrarNuevo ? (
            <ButtonBase onClick={toogleNuevo} id="item-icon">
              <RemoveIcon color="action" />
            </ButtonBase>
          ) : (
            <ButtonBase onClick={toogleNuevo} id="item-icon">
              <AddIcon color="action" />
            </ButtonBase>
          )}
        </div>
        {mostrarNuevo && <TarjetaRoles />}
      </div>
    </div>
  );
};
