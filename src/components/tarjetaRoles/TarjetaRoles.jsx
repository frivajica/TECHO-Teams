import FormControl from "@mui/material/FormControl";
import ButtonBase from "@mui/material/ButtonBase";
import { Autocompletar } from "../../commons/autocompletar/Autocompletar";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import useForm from "../../hooks/roleForm";
import { defaultAvatar } from "../../utils/mockData";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import { infoRolesEquipo } from "../../state/cargaDeRoles";
import getToken from "../../utils/getToken";
import "./TarjetaRoles.css";
import axios from "axios";
import capitalize from "../../utils/capitalize"

export const TarjetaRoles = ({
  disabled,
  reRender,
  state,
  data,
  id,
  opcPersns = [],
  opcRoles = [],
}) => {
  const dispatch = useDispatch();
  const { form, handleChange } = useForm({
    idEquipo: id,
    rol: { nombre: data?.role },
    user: { id: data?.usuarioIdPersona },
  });
  const yo = useSelector(({ usuario }) => usuario);
  const [editMode, setEditMode] = useState();
  const guardarEditado = async () => {
    setEditMode(!editMode);
    await axios({
      method: "put",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.user?.id}/${form.rol.id}`,
      headers: {
        idpersona: yo.idPersona,
        authorization: getToken(),
      },
    })
      .then((res) => res.data)
      .catch((err) => console.log({ err }));
    dispatch(infoRolesEquipo(form.idEquipo));
  };
  const borrar = () => {
    axios({
      method: "delete",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.user?.id}`,
      headers: { idpersona: yo.idPersona, authorization: getToken() },
    })
      .then((res) => {
        dispatch(infoRolesEquipo(form.idEquipo));
      })
      .catch((err) => console.log({ err }));
    setEditMode(!editMode);
  };

  return (
    <div className="tarjeta-roles">
      <div className="rol-imagen">
        {yo.isAdmin || yo.isCoordinador ? (
          <Link to={`/${data?.usuarioIdPersona}`}>
            <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
              <img
                className="avatar"
                src={data?.img || defaultAvatar}
                alt="Avatar de Usuario"
              />
            </ButtonBase>
          </Link>
        ) : (
          <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
            <img
              className="avatar"
              src={data?.img || defaultAvatar}
              alt="Avatar de Usuario"
            />
          </ButtonBase>
        )}
      </div>
      {editMode ? (
        <div className="rol-opciones">
          <FormControl id="modificar-rol" variant="standard">
            <Autocompletar
              opciones={opcRoles}
              freeSolo
              etiqueta="Rol"
              onChange={handleChange}
              name="rol"
              defVal={data?.role?.nombre}
            />
          </FormControl>
          <div id="buscar-persona">
            <Autocompletar
              opciones={opcPersns}
              etiqueta="Persona"
              onChange={handleChange}
              name="user"
              defVal={data?.nombreApellido}
            />
          </div>
        </div>
      ) : (
        <div className="rol-opciones">
          <h3 id="modificar-rol">{data?.role?.nombre || "Sin rol asignado"}</h3>
          <h3 id="buscar-persona">
            {capitalize(data?.nombreApellido) || "Persona no asignada"}
          </h3>
        </div>
      )}
      {editMode ? (
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
        (yo.isAdmin || yo.isCoordinador) && (
          <div className="rol-icons">
            <ButtonBase onClick={() => setEditMode(!editMode)} id="item-icon">
              <ModeEditOutlineIcon color="action" />
            </ButtonBase>
          </div>
        )
      )}
    </div>
  );
};
