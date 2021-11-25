import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

export const setEquipo = createAction("SET_EQUIPO");

const equipoReducer = createReducer({},
    {
        [setEquipo]: (state, action) => action.payload,
    }
);

export default equipoReducer;