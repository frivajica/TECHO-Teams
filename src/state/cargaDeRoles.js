import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

export const setRol = createAction("SET_ROL");

export const rolesListos = createAsyncThunk("CARGA_DE_ROLES", (newState) => {
  return newState;
});

const cargaDeRolesReducer = createReducer(false, {
  [rolesListos.fulfilled]: (state, action) => action.payload,
});

export default cargaDeRolesReducer;