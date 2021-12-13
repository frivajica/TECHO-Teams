import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonBase from "@mui/material/ButtonBase";
import { Autocompletar } from "../../commons/autocompletar/Autocompletar";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import useForm from "../../hooks/roleForm";
import { defaultAvatar } from "../../utils/mockData";
import { useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import getToken from "../../utils/getToken";
import "./TarjetaRoles.css";
import axios from "axios";

export const TarjetaRoles = ({ disabled, reRender, state, setState, data, id, opcPersns = [], opcRoles = [] }) => {
  const { form, handleChange } = useForm({
    idEquipo: id,
    rol: {nombre: data?.role},
    user: {id: data?.usuarioIdPersona},
  });
  const [editMode, setEditMode] = useState();
  const esNuevo = !(data?.role || data?.nombreApellido || data?.necesario);
  const guardarEditado = () => {
    axios({
      method: "put",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.user?.id}/rol`,
      data: { rol: form.rol.nombre, token: getToken() },
    })
      .then((res) => res.data)
      .catch((err) => console.log({ err }));
    setEditMode(!editMode);
  };
  const guardarNuevo = () => {
    axios({
      method: "post",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/agregarRol`,
      data: { nombre: form.rol.nombre, cantNecesaria: 1, },
    })
      .then((res) => res.data)
      .catch((err) => console.log({ err }));
    reRender();
  };
  const borrar = () => {
    axios({
      method: "delete",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.user?.id}`,
      data: { token: getToken() },
    })
      .then((res) => {
        const usuariosFiltrados = state.filter(
          (usr) => usr.usuarioIdPersona !== form.user.id
        );
        setState(usuariosFiltrados);
      })
      .catch((err) => console.log({ err }));
    setEditMode(!editMode);
  };

  return (
    <div className="tarjeta-roles">
      <div className="rol-imagen">
        <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
          <img
            className="avatar"
            src={data?.img || defaultAvatar}
            alt="Avatar de Usuario"
          />
        </ButtonBase>
      </div>
      <div className="rol-opciones">
        <FormControl id="modificar-rol" variant="standard">
          <Autocompletar
            opciones={opcRoles}
            freeSolo
            etiqueta="Rol"
            disabled={disabled && !editMode}
            onChange={handleChange}
            name="rol"
            defVal={data?.role?.nombre}
          />
        </FormControl>
        <div id="buscar-persona">
          <Autocompletar
            opciones={opcPersns}
            etiqueta="Persona"
            disabled={disabled && !editMode}
            onChange={handleChange}
            name="user"
            defVal={data?.nombreApellido}
          />
        </div>
      </div>
      {esNuevo ? (
        <div className="rol-icons">
          <ButtonBase onClick={guardarNuevo} id="item-icon">
            <SaveAsRoundedIcon color="action" />
          </ButtonBase>
        </div>
      ) : editMode ? (
        <div className="rol-icons">
          <ButtonBase onClick={guardarEditado} id="item-icon">
            <SaveAsRoundedIcon color="action" />
          </ButtonBase>
          <ButtonBase onClick={() => setEditMode(!editMode)} id="item-icon">
            <ClearIcon color="action" />
          </ButtonBase>
          <ButtonBase onClick={borrar} id="item-icon">
            <DeleteIcon color="action" />
          </ButtonBase>
        </div>
      ) : (
        <div className="rol-icons">
          <ButtonBase onClick={() => setEditMode(!editMode)} id="item-icon">
            <ModeEditOutlineIcon color="action" />
          </ButtonBase>
        </div>
      )}
    </div>
  );
};
