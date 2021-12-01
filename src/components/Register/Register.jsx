import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import frLocale from "date-fns/locale/fr";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import RadioButonGenero from "./RadioButonGenero";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import { CustomHook } from "../../hooks/CustomHook";

import "./Register.css";

import { useTheme } from "@mui/material/styles";

const localeMap = {
  fr: frLocale,
};

const maskMap = {
  fr: "__/__/____",
};

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

function Register() {

  //estados para regiones
  const [paises, setPaises] = useState([])
  const [provincias, setProvincias] = useState([])
  const [localidades, setLocalidades] = useState([])

  // select para la datapicker (Fecha de nna)
  const [locale] = useState("fr");
  const [value, setValue] = useState(new Date());
  //imputs
  const profesion = CustomHook("");
  const estudios = CustomHook("");
  const mail = CustomHook("");
  const contraseña = CustomHook("");
  const fechaNacimiento = CustomHook("");
  const docu = CustomHook("");
  const telefono = CustomHook("");
  const [intereses, setIntereses] = useState([]);
  const pais = CustomHook("")
  const provincia = CustomHook("")
  const localidad = CustomHook("")
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/api/regiones/paises")
    .then(res => setPaises(res.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
  axios.get(`http://localhost:3001/api/regiones/paises/${pais.value}/provincias`)
    .then(res => setProvincias(res.data))
    .catch(err => console.log(err))
  }, [pais.value])

  useEffect(() => {
    axios.get(`http://localhost:3001/api/regiones/paises/${pais.value}/provincias/${provincia.value}/localidades`)
    .then(res => setLocalidades(res.data))
    .catch(err => console.log(err))
  }, [provincia.value])

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIntereses(typeof value === "string" ? value.split(",") : value);
  };

  const successAlert = () => {
    swal({
      title: "Muchas gracias!",
      icon: "success",
      timer: "2000",
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
    if (!mail.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        mailErr: "Ingrese un mail",
      });
    }
    if (!contraseña.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        contraseñaErr: "Ingrese una contraseña",
      });
    }
    if (!fechaNacimiento.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        fechaDeNacimientoErr:
          "Indique                                                         ",
      });
    }

    if (!docu.value) {
      formIsValid = false;
      setFormErrors({
        docuErr: "Ingrese su documento o Pasaporte",
      });
    }
    if (!telefono.value) {
      formIsValid = false;
      setFormErrors({
        telefonoErr: "Ingrese su numero de telefono",
      });
    }
    if (!estudios.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        estudiosErr: "Indique Primaria/Secundaria o Titulo universitario, etc.",
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
  const {
    profesionErr,
    estudiosErr,
    interesErr,
    telefonoErr,
    docuErr,
    fechaDeNacimientoErr,
    contraseñaErr,
    mailErr,
  } = formErrors;  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleFormValidation()) {
      errorAlert();
    }

    if (handleFormValidation()) {
      // axios
      //   .post('', {
      //     profesion: profesion.value,
      //     estudios: estudios.value,
      //     interes: interes.value,
      //   })
      //   .then((res) => res.data)
      //   .then(successAlert());
      successAlert();
    }
  };
  
  return (
    <div>
      <div className="TitleRegister">
        Completa estos datos para registrarte!
      </div>
      <br />

      <div class="row">
        <form onSubmit={handleSubmit}>
          <div class="column">
            {/* COLUMNA DE DERECHA */}

            <label for="selector" className="label">
              <p>MAIL *</p>
            </label>
            <TextField
              size="small"
              className="ButonRegister"
              id="mail"
              name="mail"
              {...mail}
            />
            <br />
            <br />
            <label for="selector" className="label">
              <p>Nombres *</p>
            </label>
            <TextField
              size="small"
              className="ButonRegister"
              id="nombres"
              name="nombres"
            />

            <br />
            <br />
            <label for="selector" className="label">
              <p>APELLIDO PATERNO *</p>
            </label>
            <TextField
              size="small"
              className="ButonRegister"
              id="nombres"
              name="nombres"
            />
            <br />
            <br />
            <label for="selector" className="label">
              <p>FECHA DE NACIMIENTO *</p>
            </label>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={localeMap[locale]}
            >
              <DatePicker
                mask={maskMap[locale]}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                // {...fechaNacimiento}
              />
              {/* {fechaDeNacimientoErr ? (
                  <div className="errorFormMsg">{fechaDeNacimientoErr}</div>
                ) : (
                  ""
                )} */}
            </LocalizationProvider>
            <br />
            <br />

            <label for="selector" className="label">
              <p>NUMERO DE DOCUMENTO/PASAPORTE *</p>
            </label>

            <TextField size="small" id="fullWidth" {...docu} />
            {docuErr ? <div className="errorFormMsg">{docuErr}</div> : ""}
            <br />
            <br />
            <label for="selector" className="label">
              <p>PROFESIÓN *</p>
            </label>

            <TextField
              name="profesion"
              id="profesion"
              size="small"
              {...profesion}
            />
            {profesionErr ? (
              <div className="errorFormMsg">{profesionErr}</div>
            ) : (
              ""
            )}
            <br />
            <br />
            <label for="selector" className="label">
              <p>PAIS *</p>
              <select 
              {...pais}>
                {paises.map(pais => (
                  <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                ))}
              </select>
            </label>
            <label for="selector" className="label">
              <p>PROVINCIA *</p>
              <select
            {...provincia}>
              {provincias.map(provincia => (
                <option key={provincia.id} value={provincia.id}>{provincia.provincia}</option>
              ))}
              </select>
            </label>
            <label for="selector" className="label">
              <p>TEMATICAS/AREAS DE INTERES EN TECHO</p>
            </label>
            <Select
              id="demo-multiple-chip"
              multiple
              value={intereses}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box>
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
          </div>

          <div class="column">
            {/* COLUMNA DE IZQUIERDA*/}

            <label for="selector" className="label">
              <p>CREAR NUEVA CONTRASEÑA *</p>
            </label>

            <TextField size="small" id="fullWidth" />
            <br />
            <br />
            <label for="selector" className="label">
              <p>CONFIRMAR CONTRASEÑA *</p>
            </label>

            <TextField size="small" id="fullWidth" />
            <br />
            <br />
            <label for="selector" className="label">
              <p>APELLIDO MATERNO </p>
            </label>
            <TextField
              size="small"
              className="ButonRegister"
              id="nombres"
              name="nombres"
            />
            <br />
            <br />
            <RadioButonGenero />

            <br />
            <br />
            <label for="selector" className="label">
              <p>TELEFONO *</p>
            </label>
            <TextField size="small" id="fullWidth" />
            <br />
            <br />
            <label for="selector" className="label">
              <p>ESTUDIOS</p>
            </label>

            <TextField size="small" id="fullWidth" />
            <br />
            <br />
            <label for="selector" className="label">
              <p>LOCALIDAD *</p>
              <select
              {...localidad}>
                {localidades.map(localidad => (
                  <option key={localidad.id} value={localidad.id}>{localidad.localidad}</option>
                ))}
              </select>
            </label>
            <br />
            <br />

            <br />
          </div>
        </form>
      </div>
      <Button sx={{ ml: 36 }} variant="text">
        VOLVER
      </Button>
      <Button id="ingresar" size="medium" variant="outlined" type="submit">
        INGRESAR
      </Button>
      <br />
      <br />
      <label for="selector" className="label">
        <input type="checkbox" value="" />
        Acepto recibir notificaciones por email
      </label>
     
    </div>
  );
}

export default Register;
