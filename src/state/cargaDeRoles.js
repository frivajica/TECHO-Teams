import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from 'axios'
import getToken from "../utils/getToken";

export const setRol = createAction("SET_ROL");

export const rolesListos = createAsyncThunk("CARGA_DE_ROLES", (newState) => {
  return newState;
});

export const infoRolesEquipo = createAsyncThunk("ROLES_EN_EQUIPO", (idEquipo) => {
  return axios({
    method: "get",
    url: `http://localhost:3001/api/equipos/${idEquipo}/rolesEnEquipo`,
    headers: { authorization: getToken() },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const cargaDeRolesReducer = createReducer({}, {
  [setRol]: (state, action) => action.payload,
  [rolesListos.fulfilled]: (state, action) => action.payload,
  [infoRolesEquipo.fulfilled]: (state, action) => action.payload,
});

export default cargaDeRolesReducer;