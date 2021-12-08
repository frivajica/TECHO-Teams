import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import { roles } from "../utils/mockData";

export const setRol = createAction("SET_ROL");

export const getRolesInfo = createAsyncThunk("GET_INFO_DE_ROLES", (equipoId) => {
    return roles;
});

const rolReducer = createReducer({},
    {
        [setRol]: (state, action) => action.payload,
        [getRolesInfo.fulfilled]: (state, action) => action.payload,
    }
);

export default rolReducer;