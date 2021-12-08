import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

export const obtenerHistorialResultado = createAsyncThunk(
  "OBTENER_HISTORIAL_RDO",
  (_, thunkAPI) => {
    const { usuarios } = thunkAPI.getState();
    return axios
      .get(`http://localhost:3001/api/usuarios/historial/${usuarios.idPersona}`)
      .then((res) => res.data)
      .catch((err) => console.log({ err }));
  }
);

const historialDeResultadoReducer = createReducer([], {
  [obtenerHistorialResultado.fulfilled]: (state, action) => action.payload,
});

export default historialDeResultadoReducer;
