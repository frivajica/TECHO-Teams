import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../utils/getToken";

export const setUsuarios = createAction("SET_USARIOS");

export const toggleAdmin = createAsyncThunk("TOGGLE_ADMIN", ({ idPersona, errorAlert }) => {
  return axios
    .post(`http://localhost:3001/api/usuarios/${idPersona}/toogleAdmin`, {
      //Donde targetUserId es la id del usuario al que se le otorgarán permisos de admin
      headers: {
        authorization: getToken(),
      },
    })
    .then((res) => {
      if (res.data.error)
        errorAlert(
          "Error de logueo",
          "Recorda verificar tu email para ingresar"
        );
      else return res.data;
    })
    .catch(() => errorAlert());
});

export const getByMail = createAsyncThunk(
  "GET_USER_BY_MAIL",
  ({ mail, errorAlert }) => {
    return axios
      .get(`http://localhost:3001/api/usuarios/filtrar/mail/${mail}`, {
        headers: { Authorization: getToken() },
      })
      .then((res) => res.data)
      .catch(() => {
        return errorAlert(
          "Error",
          "No se encontró ningún usuario registrado con ese email"
        );
      });
  }
);

export const getById = createAsyncThunk(
  "GET_USER_BY_ID",
  ({ id, errorAlert }) => {    
    return axios
      .get(`http://localhost:3001/api/usuarios/filtrar/id/${id}`, {
        headers: { Authorization: getToken() },
      })
      .then((res) => res.data)
      .catch(() =>
        errorAlert("Error", "No se encontró ningún usuario con ese id")
      );
  }
);

const usuariosReducer = createReducer(
  {},
  {
    [setUsuarios]: (state, action) => action.payload,
    [getByMail.fulfilled]: (state, action) => action.payload,
    [getById.fulfilled]: (state, action) => action.payload,
  }
);

export default usuariosReducer;
