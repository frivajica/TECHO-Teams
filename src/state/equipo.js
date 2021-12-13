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

export const deactivateEquipo = createAsyncThunk("DEACTIVATE_EQUIPO", (id, idPersona, token) => {
    return axios
    .put(`http://localhost:3001/api/equipos/desactivar/${id}`, {}, {
        headers: {
            authorization: token,
            idPersona: idPersona
        }
    })
    .then(res => res.data)
    .catch(err => console.log(err))
})

export const activateEquipo = createAsyncThunk("ACTIVATE_EQUIPO", (id, idPersona, token) => {
    return axios
    .put(`http://localhost:3001/api/equipos/activar/${id}`, {}, {
        headers: {
            authorization: token,
            idPersona: idPersona
        }
    })
    .then(res => res.data)
    .catch(err => console.log(err))
})

const equipoReducer = createReducer({},
    {
        [setEquipo]: (state, action) => action.payload,
        [getEquipo.fulfilled]: (state, action) => action.payload,
        [updateEquipo.fulfilled]: (state, action) => action.payload,
        [deactivateEquipo.fulfilled]: (state, action) => action.payload,
        [activateEquipo.fulfilled]: (state, action) => action.payload,
    }
);

export default equipoReducer;