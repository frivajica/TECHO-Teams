import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { CustomHook } from "../../hooks/CustomHook";
import Button from "@mui/material/Button";

export default function Search() {
  const [tipo, setTipo] = useState("");
  const busqueda = CustomHook("");
  const handleSubmit = () => {};
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
    </div>
  );
}
