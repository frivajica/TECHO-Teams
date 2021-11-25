import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

export const setUsuario = createAction("SET_USARIO");

const usuarioReducer = createReducer({},
    {
        [setUsuario]: (state, action) => action.payload,
    }
);

export default usuarioReducer;