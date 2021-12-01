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
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  // select para la datapicker (Fecha de nna)
  const [locale] = useState("fr");
  const [value, setValue] = useState(new Date(""));
  //inputs
  const [mail, setMail] = useState("");
  const [leyendaMail, setLeyendaMail] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [nombre, setNombre] = useState("");
  const [leyendaNombre, setLeyendaNombre] = useState("");
  const [errorNombre, setErrorNombre] = useState(false);
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [leyendaApellidoPaterno, setLeyendaApellidoPaterno] = useState("");
  const [errorApellidoPaterno, setErrorApellidoPaterno] = useState(false);
  const profesion = CustomHook("");
  const estudios = CustomHook("");
  const apellidoMaterno = CustomHook("");
  const [contraseña, setContraseña] = useState("");
  const [leyendaContraseña, setLeyendaContraseña] = useState("");
  const [errorContraseña, setErrorContraseña] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [leyendaConfirmPass, setLeyendaConfirmPass] = useState("");
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const docu = CustomHook("");
  const telefono = CustomHook("");
  const [recibirMails, setRecibirMails] = useState(0);
  const [intereses, setIntereses] = useState([]);
  const pais = CustomHook("");
  const provincia = CustomHook("");
  const localidad = CustomHook("");
  const [formErrors, setFormErrors] = useState({});
  const [genero, setGenero] = useState("Prefiero no decirlo");

  // console.log(fechaNacimiento);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/regiones/paises")
      .then((res) => setPaises(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/regiones/paises/${pais.value}/provincias`)
      .then((res) => setProvincias(res.data))
      .catch((err) => console.log(err));
  }, [pais.value]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/regiones/paises/${pais.value}/provincias/${provincia.value}/localidades`
      )
      .then((res) => setLocalidades(res.data))
      .catch((err) => console.log(err));
  }, [provincia.value]);

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // if (!intereses.includes(value)) {
    //   intereses.push(value);
    //   setIntereses(intereses);
    // } else {
    //   let interesesFiltrados = intereses.filter((interes) => interes !== value);
    //   setIntereses(interesesFiltrados);
    // }
    console.log("ACAAA", intereses);
    setIntereses(value);
    console.log("EL TROOO", intereses);
  };

  const handleMail = () => {
    setRecibirMails((prev) => (prev === 0 ? 1 : 0));
  };

  const successAlert = () => {
    swal({
      title: "Muchas gracias!",
      icon: "success",
      timer: "4000",
    });
  };

  const errorAlert = () => {
    swal({
      title: "Error",
      text: "Por favor complete todos los campos obligatorios",
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleFormValidation = () => {
    let formIsValid = true;

    if (!mail) formIsValid = false;
    if (!nombre) formIsValid = false;
    if (!apellidoPaterno) formIsValid = false;
    if (!contraseña) formIsValid = false;
    if (!confirmPass) formIsValid = false;
    if (!genero) formIsValid = false;
    if (!docu) formIsValid = false;
    if (!profesion) formIsValid = false;
    if (!telefono) formIsValid = false;
    if (!pais) formIsValid = false;

    // if (!mail.value) {
    //   formIsValid = false;
    //   setFormErrors({ ...formErrors, mailErr: "Ingrese un email" });
    // }
    // else
    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    //   formIsValid = false;
    //   setFormErrors({ ...formErrors, mailErr: "Ingrese un email valido" });
    // }

    // if (!nombre.value) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     nombreErr: "Ingrese su nombre",
    //   });
    // }

    // if (!profesion.value) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     profesionErr: "Ingrese si es estudiante, contador, vendedor, etc.",
    //   });
    // }

    // if (contraseña.value.length < 8) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     contraseñaErr: "La contraseña debe tener al menos 8 caracteres",
    //   });
    // }

    // if (contraseña.value !== confirmar_contraseña.value) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     confirmarContraseñaErr: "Las contraseñas deben coincidir",
    //   });
    // }

    // if (!apellidoPaterno.value) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     apellidoPaternoErr: "Ingrese su apellido",
    //   });
    // }

    // if (!fechaNacimiento.value) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     fechaDeNacimientoErr:
    //       "Indique                                                         ",
    //   });
    // }

    // if (!docu.value) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     docuErr: "Ingrese su documento o Pasaporte",
    //   });
    // }
    // if (!telefono.value) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     telefonoErr: "Ingrese su numero de telefono",
    //   });
    // }

    // if (!intereses.length) {
    //   formIsValid = false;
    //   setFormErrors({
    //     ...formErrors,
    //     interesErr: "Elija alguna/s opcion/es",
    //   });
    // } else setFormErrors({ ...formErrors, interesErr: "" });

    return formIsValid;
  };

  const {
    nombreErr,
    profesionErr,
    interesErr,
    telefonoErr,
    docuErr,
    fechaDeNacimientoErr,
    contraseñaErr,
    confirmarContraseñaErr,
    mailErr,
    apellidoPaternoErr,
  } = formErrors;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleFormValidation()) {
      errorAlert();
    }

    if (handleFormValidation()) {
      // axios
      //   .post('', {
      //     idPais: pais.value,
      //     idProvincia: provincia.value,
      //    idLocalidad: localidad.value,
      //     profesion: profesion.value,
      //     estudios: estudios.value,
      //     interes: interes.value,
      //     mail:mail,
      //     nombres: nombre,
      //     apellidoPaterno: apellidoPaterno,
      //  apellidoMaterno: apellidoMaterno.value,
      //  password: contraseña,
      //   password_confirmation: confirmPass,
      //    acepta_marketing : recibirMails,
      //     recibirMails: recibirMails,
      //    fechaNacimiento: value.toISOString().split("T")[0],
      //  telefono: telefono,
      //  telefonoMovil ??? PUEDE IR COMO ALGO FIJO, NO LO PIDE EN ACTIVIDADES, PERO SI EN LA API
      //  dni: docu.value,
      //   sexo:
      //  idUnidadOrganizacional: 0
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
            <label for="mail" className="label">
              <p>MAIL *</p>
            </label>
            <TextField
              onChange={(e) => {
                setMail(e.target.value);
                if (
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
                ) {
                  setErrorMail(true);
                  setLeyendaMail("Ingrese un email valido");
                } else {
                  setErrorMail(false);
                  setLeyendaMail("");
                }
              }}
              size="small"
              className="ButonRegister"
              error={errorMail}
              helperText={leyendaMail}
              variant="outlined"
            />
            <br />
            <br />
            <label for="nombre" className="label">
              <p>NOMBRE *</p>
            </label>
            <TextField
              onChange={(e) => {
                setNombre(e.target.value);
                if (!nombre) {
                  setErrorNombre(true);
                  setLeyendaNombre("Ingrese su nombre");
                } else {
                  setErrorNombre(false);
                  setLeyendaNombre("");
                }
              }}
              size="small"
              className="ButonRegister"
              error={errorNombre}
              helperText={leyendaNombre}
              variant="outlined"
            />
            <br />
            <br />
            <label for="apellidoPaterno" className="label">
              <p>APELLIDO PATERNO *</p>
            </label>
            <TextField
              onChange={(e) => {
                setApellidoPaterno(e.target.value);
                if (!apellidoPaterno) {
                  setErrorApellidoPaterno(true);
                  setLeyendaApellidoPaterno("Ingrese su apellido");
                } else {
                  setErrorApellidoPaterno(false);
                  setLeyendaApellidoPaterno("");
                }
              }}
              size="small"
              className="ButonRegister"
              error={errorApellidoPaterno}
              helperText={leyendaApellidoPaterno}
              variant="outlined"
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
              />
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
            <label for="profesion" className="label">
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
              <select {...pais}>
                {paises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label for="selector" className="label">
              <p>PROVINCIA *</p>
              <select {...provincia}>
                {provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.provincia}
                  </option>
                ))}
              </select>
            </label>
            <label for="selector" className="label">
              <p>TEMATICAS/AREAS DE INTERES EN TECHO *</p>
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

            <label for="password" className="label">
              <p>CONTRASEÑA *</p>
            </label>
            <TextField
              onChange={(e) => {
                setContraseña(e.target.value);
                if (contraseña.length < 7) {
                  setErrorContraseña(true);
                  setLeyendaContraseña(
                    "La contraseña debe tener al menos 8 caracteres"
                  );
                } else {
                  setErrorContraseña(false);
                  setLeyendaContraseña("");
                }
              }}
              size="small"
              className="ButonRegister"
              error={errorContraseña}
              helperText={leyendaContraseña}
              variant="outlined"
              // type="password"
            />

            <br />
            <br />
            <label for="selector" className="label">
              <p>CONFIRMAR CONTRASEÑA *</p>
            </label>
            <TextField
              onChange={(e) => {
                setConfirmPass(e.target.value);
                if (contraseña !== confirmPass) {
                  setErrorConfirmPass(true);
                  setLeyendaConfirmPass("Las contraseñas deben coincidir");
                } else {
                  setErrorConfirmPass(false);
                  setLeyendaConfirmPass("");
                }
              }}
              size="small"
              className="ButonRegister"
              error={errorConfirmPass}
              helperText={leyendaConfirmPass}
              variant="outlined"
              // type="password"
            />
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
              {...apellidoMaterno}
            />
            <br />
            <br />
            {/*  <RadioButonGenero /> */}
            <label for="selector" className="label">
              <p>GENERO *</p>
            </label>
            <div className="radio">
              <label>
                <input
                  name="genero"
                  type="radio"
                  value={genero}
                  onChange={() => setGenero("Masculino")}
                />
                Masculino
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  name="genero"
                  type="radio"
                  value={genero}
                  onChange={() => setGenero("Femenino")}
                />
                Femenino
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="genero"
                  value={genero}
                  onChange={() => setGenero("Otrx")}
                />
                Otrx
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="genero"
                  value={genero}
                  onChange={() => setGenero("Prefiero no decirlo")}
                />
                Prefiero no decirlo
              </label>
            </div>

            <br />
            <br />
            <label for="selector" className="label">
              <p>TELEFONO *</p>
            </label>
            <TextField size="small" id="fullWidth" {...telefono} />
            <br />
            <br />
            <label for="selector" className="label">
              <p>ESTUDIOS</p>
            </label>
            <TextField size="small" id="fullWidth" {...estudios} />
            <br />
            <br />
            <label for="selector" className="label">
              <p>LOCALIDAD *</p>
              <select {...localidad}>
                {localidades.map((localidad) => (
                  <option key={localidad.id} value={localidad.id}>
                    {localidad.localidad}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <br />

            <br />
          </div>
          <Button sx={{ ml: 36 }} variant="text">
            VOLVER
          </Button>
          <Button id="ingresar" size="medium" variant="outlined" type="submit">
            REGISTRAR
          </Button>
        </form>
      </div>
      <br />
      <br />
      <label for="selector" className="label">
        <input type="checkbox" onClick={handleMail} />
        Acepto recibir notificaciones por email
      </label>
    </div>
  );
}

export default Register;
