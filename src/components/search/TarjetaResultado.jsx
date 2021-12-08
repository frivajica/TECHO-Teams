import React from "react";
import { useSelector } from "react-redux";
import { ButtonBase } from "@mui/material";
import { usuario as u } from "../../utils/mockData";
import { CajaRolesResultado } from "./CajaRolesResultado";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import swal from "sweetalert";

export default function TarjetaResultado({ usuarios }) {
  const historialDeResultado = useSelector(
    (state) => state.historialDeResultado
  );
  const equipo = useSelector((state) => state.equipo);
  const usuario = useSelector((state) => state.usuario);

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
    axios
      .put(
        `http://localhost:3001/api/equipos/${equipo.id}/${usuarios.idPersona}`,
        {
          token: usuario.token,
        }
      )
      .then((res) => {
        res.data === "el equipo no esta activo" &&
          errorAlert("Error", "El equipo no esta activo actualmente");
        res.data === "usuario agregado" && successAlert();
        res.data === "el usuario ya pertenece al equipo" &&
          successAlert("Error", "El usuario ya esta en este equipo");
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <div className="tarjeta-usuario">
        <div className="grid-usuario">
          <div className="avatar-usuario">
            <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
              <img
                className="avatar"
                src={!usuarios.imagen ? u.avatar : usuarios.imagen}
                alt="Avatar de Usuario"
              />
            </ButtonBase>
          </div>
          <h1 className="nombre-usuario">{`${usuarios.nombres} ${usuarios.apellidoPaterno}`}</h1>
          <div className="antiguedad-usuario">
            Profesión: {usuarios.profesion}
          </div>

          <div className="contenedor-roles">
            <CajaRolesResultado usuarios={usuarios} />
          </div>

          <div id="boton-mi-info" style={{ textAlign: "center" }}>
            Interesado/a en:{" "}
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
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" startIcon={<AddIcon />} onClick={addUser}>
            AGREGAR
          </Button>
        </div>
      </div>
    </div>
  );
}
