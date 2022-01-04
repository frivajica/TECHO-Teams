import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonBase } from "@mui/material";
import { CajaRolesResultado } from "./CajaRolesResultado";
import capitalize from "../../utils/capitalize"
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { defaultAvatar } from "../../utils/mockData";

import swal from "sweetalert";

export default function TarjetaResultado({ usuarios }) {
  const historialDeResultado = useSelector(
    (state) => state.historialDeResultado
  );
  const equipo = useSelector((state) => state.equipo);
  const usuario = useSelector((state) => state.usuario);
  const [agregando, setAgregando] = useState(false)

  const cantEquip = historialDeResultado.filter(
    (equipo) => equipo.activo === true
  );

  const errorAlert = (
    title = "Error",
    text = "No se puede agregar al usuario al equipo"
  ) => {
    swal({
      title,
      text,
      button: "Aceptar",
      icon: "error",
    });
  };

  const successAlert = (
    title = "Usuario agregado!",
    text = "Ya podes asignarle un rol"
  ) => {
    swal({
      title,
      text,
      button: "Aceptar",
      icon: "success",
    });
  };

  const addUser = () => {
    setAgregando(true);
    axios
      .put(
        `http://143.198.238.253:3001/api/equipos/${equipo.id}/${usuarios.idPersona}`,
        {},
        {
          headers: {
            Authorization: usuario.token,
            idPersona: usuario.idPersona,
          },
        }
      )
      .then((res) => {
        setAgregando(false);
        res.data === "el equipo no esta activo" &&
          errorAlert("Error", "El equipo no esta activo actualmente");
        res.data === "usuario agregado" && successAlert();
      })
      .catch((err) => {
        setAgregando(false);
        err.response.data === "el usuario ya pertenece al equipo" &&
          errorAlert("Error", "El usuario ya esta en este equipo");
        console.log({ err });
      });
  };

  return (
    <div>
      <div className="tarjeta-usuario">
        <div className="grid-usuario" id="grid-usuario-id">
          <div className="avatar-usuario">
            <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
              <img
                className="avatar"
                src={!usuarios.imagen ? defaultAvatar : `${process.env.PUBLIC_URL}/uploads/perfil/${usuarios.imagen}`}  
                alt="Avatar de Usuario"
              />
            </ButtonBase>
          </div>
          <h1 className="nombre-usuario">{`${capitalize(usuarios.nombres)} ${capitalize(usuarios.apellidoPaterno)}`}</h1>
          <div className="antiguedad-usuario">
            <span style={{ color: "#1976D2" }}> Profesión: </span>
            {usuarios.profesion}
          </div>

          <div className="contenedor-roles">
            <CajaRolesResultado usuarios={usuarios} />
          </div>

          <div id="boton-mi-info" style={{ textAlign: "center" }}>
            <span style={{ color: "#1976D2" }}> Interesado/a en: </span>
            {usuarios.intereses
              .replace(/"/g, "")
              .replace("[", "")
              .replace("]", "")
              .replace(/,/g, "~")}
          </div>
          <div className="enEquipos">
            Participando en {cantEquip.length} equipos
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {!agregando ? 
            <Button variant="contained" startIcon={<AddIcon />} onClick={addUser}>
              AGREGAR
            </Button>
            :
            <Button variant="contained">
              AGREGANDO...
            </Button>
          }
        </div>
      </div>
    </div>
  );
}
