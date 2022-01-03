import {
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

export const obtenerHistorial = createAsyncThunk(
  "OBTENER_HISTORIAL",
  (idPersona) => {
    return axios
      .get(`http://143.198.238.253:3001/api/usuarios/historial/${idPersona}`)
      .then((res) => res.data)
      .catch((err) => console.log({ err }));
  }
);

const historialDeUsuarioReducer = createReducer([], {
  [obtenerHistorial.fulfilled]: (state, action) => action.payload,
});

export default historialDeUsuarioReducer;