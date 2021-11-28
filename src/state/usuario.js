import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

export const setUsuario = createAction("SET_USARIO");

export const loginRequest = createAsyncThunk("LOGIN", ({ email, password }) => {
  return axios
    .post("https://sandbox.actividades.techo.org/api/login", {
      email,
      password,
    })
    .then((res) => console.log(res));
});

const usuarioReducer = createReducer(
  {},
  {
    [setUsuario]: (state, action) => action.payload,
    [loginRequest.fulfilled]: (state, action) => action.payload,
  }
);

export default usuarioReducer;
