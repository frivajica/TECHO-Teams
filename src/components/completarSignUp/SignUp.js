import { React, useState } from "react";
import { CustomHook } from "../../hooks/CustomHook";
import { Container } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../../state/usuario";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const listaEstudios = [
  "",
  "Finanzas/Contabilidad",
  "Administración/Economía",
  "Ingeniería",
  "Derecho/Abogacía",
  "Ciencias Sociales",
  "Sociogía",
  "Historia",
  "Arte",
  "Recursos Humanos",
  "Psicología/Psiquiatría",
  "Medicina",
  "Diseño",
  "Arquitectura",
  "Ciencias Exactas",
  "Informática/Programación",
];

const interes = [
  "Voluntariado",
  "Comunicaciones",
  "Desarrollo de Fondos",
  "Gestión Comunitaria",
  "Administración y Finanzas",
  "Vivienda y Habitat",
  "Gestión de tiempo",
  "Liderazgo",
  "Gestión de Proyectos",
  "Autoconocimiento",
  "Modelo de trabajo TECHO",
];

function SignUp() {
  const theme = useTheme();
  const profesion = CustomHook("");
  const estudios = CustomHook("");
  const [intereses, setIntereses] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const usuario = useSelector((state) => state.usuario);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIntereses(typeof value === "string" ? value.split(",") : value);
  };

  const successAlert = () => {
    swal({
      title: "Muchas gracias!",
      text: "Por favor volve a loguearte",
      icon: "success",
      timer: "5000",
    });
  };

  const errorAlert = () => {
    swal({
      title: "Error",
      text: "Por favor complete todos los campos",
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleFormValidation = () => {
    let formIsValid = true;

    if (!profesion.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        profesionErr: "Ingrese si es estudiante, contador, vendedor, etc.",
      });
    }

    if (!intereses[0]) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        interesErr: "Elija alguna/s opcion/es",
      });
    }

    return formIsValid;
  };

  const { profesionErr, interesErr } = formErrors;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleFormValidation()) {
      errorAlert();
    }

    if (handleFormValidation()) {
      axios
        .post("http://143.198.238.253:3001/api/usuarios/registrarDesdeActividades", {
          idPersona: usuario.idPersona,
          profesion: profesion.value,
          estudios: estudios.value,
          intereses: JSON.stringify(intereses),
        })
        .then((res) => res.data)
        .then(() => successAlert())
        .then(() => dispatch(logoutRequest()));
    }
  };

  return (
    <Container>
      <div style={{ marginTop: "7%", width: "33%", marginLeft: "35%" }}>
        <div className="titlereg">Ya casi terminamos!</div>
        <div className="subtitlereg">Completa tu registro en EQUIPOS!</div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="profesion" className="label">
            PROFESION
          </label>
          <input
            {...profesion}
            type="text"
            name="profesion"
            id="profesion"
            className="form-control"
          />
          {profesionErr ? (
            <div className="errorFormMsg">{profesionErr}</div>
          ) : (
            ""
          )}

          <label htmlFor="selector" className="label">
            <p>ESTUDIOS</p>
            <select {...estudios} className="form-control">
              {listaEstudios.map((estudio, i) => (
                <option key={i} value={estudio}>
                  {estudio}
                </option>
              ))}
            </select>
          </label>

          <InputLabel id="demo-multiple-chip-label">
            TEMATICAS/AREAS DE INTERES EN TECHO
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={intereses}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {interes.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, intereses, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          {interesErr ? <div className="errorFormMsg">{interesErr}</div> : ""}
          <br />
          <button type="submit" className="button">
            SIGUIENTE
          </button>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
