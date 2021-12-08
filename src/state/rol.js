import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import { rolesEquipo } from "../utils/mockData";

export const setRol = createAction("SET_ROL");

export const getRolesInfo = createAsyncThunk("GET_INFO_DE_ROLES", (equipoId) => {
    return rolesEquipo;
});

const rolReducer = createReducer({},
    {
        [setRol]: (state, action) => action.payload,
        [getRolesInfo.fulfilled]: (state, action) => action.payload,
    }
);

export default rolReducer;