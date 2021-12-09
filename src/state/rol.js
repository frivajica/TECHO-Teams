import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import { rolesEquipo } from "../utils/mockData";

export const setRol = createAction("SET_ROL");

export const getRolesInfo = createAsyncThunk("GET_INFO_DE_ROLES", (equipoId) => {
    console.log("im working")
    return axios
    .get(`http://localhost:3001/api/equipos/${equipoId}/roles`)
    .then(res => {console.log("ok")})
    .catch(err => console.error(err))
});

const rolReducer = createReducer({},
    {
        [setRol]: (state, action) => action.payload,
        [getRolesInfo.fulfilled]: (state, action) => action.payload,
    }
);

export default rolReducer;