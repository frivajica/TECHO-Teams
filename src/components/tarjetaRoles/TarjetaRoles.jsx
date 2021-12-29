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
import { setRol } from "../../state/cargaDeRoles";
import getToken from "../../utils/getToken";
import "./TarjetaRoles.css";
import axios from "axios";
import capitalize from "../../utils/capitalize"

export const TarjetaRoles = ({ data, id, opcPersns = [], opcRoles = [], state }) => {
  const dispatch = useDispatch();
  const { form, handleChange } = useForm({
    idEquipo: id,
    rol: { nombre: data.role?.nombre, id: data.role?.id},
    user: { id: data.usuarioIdPersona },
  });
  const yo = useSelector(({ usuario }) => usuario);
  const [editMode, setEditMode] = useState();
  const [error, setError] = useState(false);

  const guardarEditado = async () => {
    if (form.rol.id === 1 && !data.usuario.isCoordinador && !data.usuario.isAdmin) return setError(true)

    setEditMode(!editMode);
    if (form.rol.id && form.user.id && form.idEquipo) await axios({
      method: "put",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.user.id}/${form.rol.id}`,
      headers: {
        idpersona: yo.idPersona,
        authorization: getToken(),
      },
    })
      .catch((err) => console.log({ err }));
    dispatch(infoRolesEquipo(form.idEquipo));
  };
  const borrar = () => {
    dispatch(setRol(state.filter(e => e.usuarioIdPersona !== data.usuarioIdPersona)))
    axios({
      method: "delete",
      url: `http://localhost:3001/api/equipos/${form.idEquipo}/${form.user?.id}`,
      headers: { idpersona: yo.idPersona, authorization: getToken() },
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
          {error ? (<p style={{ color: 'red', fontSize: '0.8em' }}>El usuario no puede ser coordinador, {yo.isAdmin ? 'necesitas darle autoridad en la sección AdminLand.': 'consulte a un admin para darle autoridad.'}</p>) : null}
          <FormControl id="modificar-rol" variant="standard">
            <Autocompletar
              opciones={opcRoles}
              freeSolo
              etiqueta="Rol"
              onChange={handleChange}
              setError={setError}
              name="rol"
              defVal={form.rol?.nombre}
            />
          </FormControl>
          <h3 id="buscar-persona">
            {data?.nombreApellido || "Persona no asignada"}
          </h3>
        </div>
      ) : (
        <div className="rol-opciones">
          <h3 id="modificar-rol">{form.rol?.nombre || "Sin rol asignado"}</h3>
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
