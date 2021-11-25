import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

export const setUsuarios = createAction("SET_USARIOS");

const usuariosReducer = createReducer({},
    {
        [setUsuarios]: (state, action) => action.payload,
    }
);

export default usuariosReducer;