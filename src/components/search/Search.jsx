import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { CustomHook } from "../../hooks/CustomHook";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getByMail, getById, setUsuarios } from "../../state/usuarios";
import TarjetaResultado from "./TarjetaResultado";
import swal from "sweetalert";

export default function Search() {
  const usuarios = useSelector((state) => state.usuarios);
  const dispatch = useDispatch();
  const [tipo, setTipo] = useState("");
  const busqueda = CustomHook("");
  //dispatch(setUsuarios({}));

  const errorAlert = () => {
    swal({
      title: "Seleccione un tipo de búsqueda",
      text: "Elija buscar por Id o Email",
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tipo === "email" && dispatch(getByMail(busqueda.value));
    tipo === "id" && dispatch(getById(parseInt(busqueda.value)));
    tipo === "" && errorAlert();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form className="searchDiv" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="selector" className="label" required>
            <p>BUSCAR POR </p>
            <div className="radio">
              <label>
                <input
                  id="radio-button"
                  name="categoria"
                  type="radio"
                  value={tipo}
                  onChange={() => setTipo("email")}
                />
                EMAIL
              </label>
            </div>

            <div className="radio">
              <label>
                <input
                  id="radio-button"
                  name="categoria"
                  type="radio"
                  value={tipo}
                  onChange={() => setTipo("id")}
                />
                ID
              </label>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="selector" className="label">
            <TextField
              placeholder="Buscar"
              className="text-field"
              size="small"
              type="text"
              name="nombre"
              {...busqueda}
              required
            />
          </label>
        </div>
        <div>
          <Button id="ingresar" size="medium" variant="outlined" type="submit">
            BUSCAR
          </Button>
        </div>
      </form>
      <div style={{ marginTop: "220px" }}>
        {usuarios.idPersona && <TarjetaResultado usuarios={usuarios} />}
      </div>
    </div>
  );
}
