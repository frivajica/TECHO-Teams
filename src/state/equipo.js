import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import { personas } from "../utils/mockData";

export const setEquipo = createAction("SET_EQUIPO");

export const getUsuarios = createAsyncThunk("GET_USUARIOS", (equipoId) => {
    return personas;
});

const equipoReducer = createReducer({},
    {
        [setEquipo]: (state, action) => action.payload,
        [getUsuarios.fulfilled]: (state, action) => action.payload,
    }
);

export default equipoReducer;