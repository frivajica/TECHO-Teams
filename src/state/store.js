import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import equipoReducer from "./equipo";
import rolReducer from "./rol";
import usuarioReducer from "./usuario";
import usuariosReducer from "./usuarios";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Config
const rootReducer = combineReducers({
  usuario: usuarioReducer,
  usuarios: usuariosReducer,
  equipo: equipoReducer,
  rol: rolReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "usuario",    //aquí se enlistan los nombres
    "usuarios",   //de los reducers que queremos
    "equipo",     //que persistan
    "rol",
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


//Exportaciones
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  reducer: persistedReducer,
});
export const persistor = persistStore(store);