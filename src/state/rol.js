import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

export const setRol = createAction("SET_ROL");

const rolReducer = createReducer({},
    {
        [setRol]: (state, action) => action.payload,
    }
);

export default rolReducer;