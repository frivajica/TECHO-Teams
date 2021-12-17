import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import { successAlert } from "../../utils/alerts";

export default function CrearArea() {
  const [rol, setRol] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/roles", {
        nombre: rol,
      })
      .then(() => {
        successAlert("Exito", "Rol creado");
        setRol("");
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="contenedor-formulario">
          <label htmlFor="selector" className="label">
            <TextField
              id="area"
              className="text-field"
              size="small"
              type="text"
              name="area"
              onChange={(e) => {
                setRol(e.target.value);
              }}
              value={rol}
            />
          </label>
          <Button
            className="button"
            id="ingresar"
            size="small"
            variant="outlined"
            type="submit"
            style={{
              boxShadow: "3px 15px 8px -10px rgb(0 0 0 / 30%)",
              width: "40%",
              height: "35%",
            }}
          >
            CREAR ROL
          </Button>
        </div>
      </form>
    </div>
  );
}
