import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonBase from "@mui/material/ButtonBase";
import { Autocompletar } from "../../commons/autocompletar/Autocompletar";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import useForm from "../../hooks/formState";
import TextField from "@mui/material/TextField";
import { defaultAvatar } from '../../utils/mockData'
import { useSelector } from "react-redux";
import {useEffect, useState } from "react"
import { rolesGlobales } from "../../utils/mockData";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import "./TarjetaRoles.css";
const roles = rolesGlobales //toDo Sustituir por un axios.get

export const TarjetaRoles = ({ rol, persona, necesario, img }) => {
  const { form, handleChange } = useForm();
  const [editMode, setEditMode] = useState(false);
  const personasEquipo = useSelector(({ equipo }) => equipo);
  const esNuevo = !(rol || persona || necesario);
  const toggleEditar = () => {
    setEditMode(!editMode)
  };
  const guardarEditado = () => {
    
    setEditMode(!editMode)
  };
  const borrar = () => {

    setEditMode(!editMode)
  };

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
            opciones={roles}
            freeSolo
            etiqueta="Rol"
            onChange={(e) => handleChange(e)}
            name="Rol"
            defVal={rol}
          />
        </FormControl>
        <div id="buscar-persona">
          <Autocompletar
            opciones={personasEquipo}
            etiqueta="Persona"
            onChange={(e) => handleChange(e)}
            name="Persona"
            defVal={persona}
          />
        </div>
        <FormControlLabel
          id="checkbox-rol"
          control={
            <Checkbox
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
      ) :(
      editMode ? (
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
      )
      )}
    </div>
  );
};
