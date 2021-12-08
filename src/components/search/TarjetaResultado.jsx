import React from "react";
import { useSelector } from "react-redux";
import { ButtonBase } from "@mui/material";
import { usuario as u } from "../../utils/mockData";

export default function TarjetaResultado() {
  const usuario = useSelector((state) => state.usuarios);
  console.log(
    usuario.intereses.replace(/"/g, "").replace("[", "").replace("]", "")
  );
  return (
    <div>
      <div className="tarjeta-usuario">
        <div className="grid-usuario">
          <div className="avatar-usuario">
            <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
              <img
                className="avatar"
                src={!usuario.imagen ? u.avatar : usuario.imagen}
                alt="Avatar de Usuario"
              />
            </ButtonBase>
          </div>
          <h1 className="nombre-usuario">{`${usuario.nombres} ${usuario.apellidoPaterno}`}</h1>
          <div className="contenedor-roles">
            Interesado/a en:{" "}
            {usuario.intereses
              .replace(/"/g, "")
              .replace("[", "")
              .replace("]", "")}
          </div>
          <div className="antiguedad-usuario">
            Profesion: {usuario.profesion}
          </div>
        </div>
      </div>
    </div>
  );
}
