import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonBase from "@mui/material/ButtonBase";
import { Autocompletar } from "../../commons/autocompletar/Autocompletar";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import useForm from "../../hooks/roleForm";
import { defaultAvatar } from "../../utils/mockData";
import { useState, useRef } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import getToken from "../../utils/getToken";
import "./TarjetaRoles.css";
import axios from "axios"

export const TarjetaRoles = ({ state, setState, data, id, rol, persona, necesario, img, opcPersns=[], opcRoles=[] }) => {
  const init = {
      idEquipo: id,
      rol: data.role,
      userId: data.usuarioIdPersona,
    }
  const { form, handleChange } = useForm(init);
  const [editMode, setEditMode] = useState();
  const esNuevo = !(rol || persona || necesario);
  const toggleEditar = () => {
    setEditMode(!editMode);
  };
  const guardarEditado = () => {
    axios({
      method: "put",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.userId}/rol`,
      data: {rol: form.rol, token: getToken()}
    })
      .then((res) => res.data)
      .catch((err) => console.log({err}));
    setEditMode(!editMode);
  };
  const borrar = () => {
    console.log('%cMyProject%cline:39%cstate', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(60, 79, 57);padding:3px;border-radius:2px', state)
    axios({
      method: "delete",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.userId}`,
      data: {token: getToken()}
    })
      .then((res) => {
        const usuariosFiltrados = state.filter((usr) => usr.usuarioIdPersona !== form.userId);
        setState(usuariosFiltrados);
      })
      .catch((err) => console.log({err}));
    setEditMode(!editMode);
  };
  console.log('%cMyProject%cline:31%cdata', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(20, 68, 106);padding:3px;border-radius:2px', data)
  return (
    <div className="tarjeta-roles">
      <div className="rol-imagen">
        <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
          <img
            className="avatar"
            src={img || defaultAvatar}
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
            disabled={!editMode}
            onChange={(e) => handleChange(e)}
            name="rol"
            defVal={rol?.nombre}
          />
        </FormControl>
        <div id="buscar-persona">
          <Autocompletar
            opciones={opcPersns}
            etiqueta="userId"
            disabled={!editMode}
            onChange={(e) => handleChange(e)}
            name={data.usuarioIdPersona}
            defVal={data.nombreApellido}
          />
        </div>
        <FormControlLabel
          id="checkbox-rol"
          control={
            <Checkbox
              disabled={!editMode}
              defaultChecked={necesario}
              onChange={(e) => handleChange(e)}
              name="necesario"
            />
          }
          label="Necesario"
        />
      </div>
      {esNuevo ? (
        <ButtonBase onClick={guardarEditado} id="item-icon">
          <SaveAsRoundedIcon color="action" />
        </ButtonBase>
      ) : editMode ? (
        <div className="rol-icons">
          <ButtonBase onClick={guardarEditado} id="item-icon">
            <SaveAsRoundedIcon color="action" />
          </ButtonBase>
          <ButtonBase onClick={toggleEditar} id="item-icon">
            <ClearIcon color="action" />
          </ButtonBase>
          <ButtonBase onClick={borrar} id="item-icon">
            <DeleteIcon color="action" />
          </ButtonBase>
        </div>
      ) : (
        <div className="rol-icons">
          <ButtonBase onClick={toggleEditar} id="item-icon">
            <ModeEditOutlineIcon color="action" />
          </ButtonBase>
        </div>
      )}
    </div>
  );
};