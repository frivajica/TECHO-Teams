import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { CustomHook } from "../../hooks/CustomHook";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getByMail, getById, setUsuarios } from "../../state/usuarios";

import swal from "sweetalert";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function UsersForAdmin() {
  const navigate = useNavigate();

  const usuarios = useSelector((state) => state.usuarios);
  const dispatch = useDispatch();
  const [tipo, setTipo] = useState("");
  const busqueda = CustomHook("");
  //dispatch(setUsuarios({}));
  const [trigger, setTrigger] = useState(true);

  const errorAlert = (
    title = "Seleccione un tipo de búsqueda",
    text = "Elija buscar por Id o Email"
  ) => {
    dispatch(setUsuarios({}))
    swal({
      title,
      text,
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger(false);

    tipo === "email" &&
      dispatch(getByMail({ mail: busqueda.value, errorAlert })).then(
        ({ payload }) => setTrigger(true));
    tipo === "id" &&
      dispatch(getById({ id: parseInt(busqueda.value), errorAlert })).then(
        ({ payload }) => setTrigger(true));
    tipo === "" && errorAlert();
    
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form className="searchDiv" onSubmit={handleSubmit}>
        <div id="buscarPor">
          <label htmlFor="selector" className="label" required>
            <p className="buscarParrafo">BUSCAR POR </p>
            <div className="radio emailDiv">
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

            <div className="radio idDiv">
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
        <div className="divSearchInput">
          <label htmlFor="selector" className="label searchInput">
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
        <div className="buscarBtn">
          <Button
            id="ingresar"
            size="medium"
            variant="outlined"
            type="submit"
            style={{ boxShadow: "3px 15px 8px -10px rgb(0 0 0 / 30%)" }}
          >
            BUSCAR
          </Button>
        </div>
      </form>
  

      {/* <Button
        onClick={() => navigate(-1)}
        style={{ marginLeft: "auto", marginRight: "10px" }}
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
        className="volverBtnSearch"
      >
        VOLVER
      </Button> */}
    </div>
  );
}

export default UsersForAdmin;
