import {
    createAction,
    createAsyncThunk,
    createReducer,
  } from "@reduxjs/toolkit";
import axios from "axios";

export const obtenerHistorial = createAsyncThunk("OBTENER_HISTORIAL", (_, thunkAPI) => {
    const { usuario } = thunkAPI.getState()
    return axios.get(`http://localhost:3001/api/usuarios/historial/${usuario.idPersona}`)
    .then(res => res.data)
    .catch(err => console.log({err}))
})

const historialDeUsuarioReducer = createReducer([],
    {
      [obtenerHistorial.fulfilled]: (state, action) => action.payload,
    }
  );
  
export default historialDeUsuarioReducer;
  