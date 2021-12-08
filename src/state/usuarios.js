import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => {
  const ls = JSON.parse(localStorage.getItem("persist:root"));
  const usuario = JSON.parse(ls.usuario);
  const token = usuario.token;
  return token;
};

export const setUsuarios = createAction("SET_USARIOS");

export const getByMail = createAsyncThunk("GET_USER_BY_MAIL", (mail) => {
  return axios
    .get(`http://localhost:3001/api/usuarios/filtrar/mail/${mail}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const getById = createAsyncThunk("GET_USER_BY_ID", (id) => {
  return axios
    .get(`http://localhost:3001/api/usuarios/filtrar/id/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const usuariosReducer = createReducer(
  {},
  {
    [setUsuarios]: (state, action) => action.payload,
    [getByMail.fulfilled]: (state, action) => action.payload,
    [getById.fulfilled]: (state, action) => action.payload,
  }
);

export default usuariosReducer;
