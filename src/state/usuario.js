import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../utils/getToken";

export const setUsuario = createAction("SET_USARIO");

export const loginRequest = createAsyncThunk(
  "LOGIN",
  ({ mail, password, errorAlert,successAlert}) => {
    return axios
      .post("http://143.198.238.253:3001/api/usuarios/login", {
        mail,
        password,
      })
      .then((res) => {
        if (res.data.error)
          errorAlert(
            "Error de logueo",
            "Recorda verificar tu email para ingresar"
          );
        else {
         
          return res.data;}
      })
      .catch(() => errorAlert());
  }
);

export const logoutRequest = createAsyncThunk("LOGOUT", () => {
  return axios
    .post(
      "http://143.198.238.253:3001/api/usuarios/logout",
      {},
      {
        headers: {
          authorization: getToken(),
        },
      }
    )
    .then((res) => res.data.success && {})
    .catch((err) => console.log({ err }));
});

const usuarioReducer = createReducer(
  {},
  {
    [setUsuario]: (state, action) => action.payload,
    [loginRequest.fulfilled]: (state, action) => action.payload,
    [loginRequest.pending]: (state, action) =>  action.payload,
    [logoutRequest.fulfilled]: (state, action) => action.payload,
  }
);

export default usuarioReducer;
