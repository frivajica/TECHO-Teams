import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import axios from "axios"

export const setEquipo = createAction("SET_EQUIPO");

export const getEquipo = createAsyncThunk("GET_EQUIPO", id => {
    return axios
    .get(`http://localhost:3001/api/equipos/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err))
})

export const updateEquipo = createAsyncThunk("UPDATE_EQUIPO", (id, form) => {
    return axios
    .put(`http://localhost:3001/api/equipos/${id}`, form)
    .then(res => res.data)
    .catch(err => console.log(err))
})


const equipoReducer = createReducer({},
    {
        [setEquipo]: (state, action) => action.payload,
        [getEquipo]: (state, action) => action.payload,
        [updateEquipo]: (state, action) => action.payload,
    }
);

export default equipoReducer;