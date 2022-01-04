import {
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

export const obtenerHistorialResultado = createAsyncThunk(
  "OBTENER_HISTORIAL_RDO",
  (_, thunkAPI) => {
    const { usuarios } = thunkAPI.getState();
    return axios
      .get(`http://143.198.238.253:3001/api/usuarios/historial/${usuarios.idPersona}`)
      .then((res) => res.data)
      .catch((err) => console.log({ err }));
  }
);

const historialDeResultadoReducer = createReducer([], {
  [obtenerHistorialResultado.fulfilled]: (state, action) => action.payload,
});

export default historialDeResultadoReducer;
