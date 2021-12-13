import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../utils/getToken";

export const setUsuarios = createAction("SET_USARIOS");

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
