import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import equipoReducer from "./equipo";
import rolReducer from "./rol";
import usuarioReducer from "./usuario";
import usuariosReducer from "./usuarios"

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        usuario: usuarioReducer,
        usuarios: usuariosReducer,
        equipo: equipoReducer,
        rol: rolReducer,
    }
})

export default store;