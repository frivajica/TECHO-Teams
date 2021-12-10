import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import axios from "axios"

export const setRol = createAction("SET_ROL");

export const getRoles = createAsyncThunk("GET_INFO_DE_ROLES", () => {
    return axios
      .get(`http://localhost:3001/api/roles`)
      .then((res) => res.data)
      .catch((err) => {
        console.log("ERROR", err);
      });
});

const rolReducer = createReducer({},
    {
        [setRol]: (state, action) => action.payload,
        [getRoles.fulfilled]: (state, action) => action.payload,
    }
);

export default rolReducer;