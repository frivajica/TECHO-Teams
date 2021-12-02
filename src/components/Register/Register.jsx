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
  const estudios = CustomHook("");
  const apellidoMaterno = CustomHook("");
  const [contraseña, setContraseña] = useState("");
  const [leyendaContraseña, setLeyendaContraseña] = useState("");
  const [errorContraseña, setErrorContraseña] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [leyendaConfirmPass, setLeyendaConfirmPass] = useState("");
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const [recibirMails, setRecibirMails] = useState(0);
  const [intereses, setIntereses] = useState([]);
  const pais = CustomHook("");
  const provincia = CustomHook("");
  const localidad = CustomHook("");
  const [genero, setGenero] = useState("Prefiero no decirlo");
  const [docu, setDocu] = useState("");
  const [profesion, setProfesion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorDocu, setErrorDocu] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorProfesion, setErrorerrorProfesion] = useState("");
  const [leyenda, setLeyenda] = useState("");

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
    setIntereses(value);
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
      text: "Por favor complete todos los campos con asterisco",
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleFormValidation = () => {
    let formIsValid = true;

    // if (errorMail) formIsValid = false;
    // if (errorNombre) formIsValid = false;
    // if (errorApellidoPaterno) formIsValid = false;
    // if (errorContraseña) formIsValid = false;
    // if (errorConfirmPass) formIsValid = false;
    // if (errorDocu) formIsValid = false;
    // if (errorProfesion) formIsValid = false;
    // if (errorTelefono) formIsValid = false;
    // if (!pais) formIsValid = false;
    // if (!intereses.length) formIsValid = false;

    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleFormValidation()) {
      errorAlert();
    }

    if (handleFormValidation()) {
      axios
        .post("http://localhost:3001/api/usuarios/registrar", {
          idPais: parseInt(pais.value),
          idProvincia: parseInt(provincia.value),
          idLocalidad: parseInt(localidad.value),
          profesion: profesion,
          estudios: estudios.value,
          intereses: JSON.stringify(intereses),
          mail: mail,
          nombres: nombre,
          apellidoPaterno: apellidoPaterno,
          apellidoMaterno: apellidoMaterno.value,
          password: contraseña,
          password_confirmation: confirmPass,
          acepta_marketing: recibirMails,
          recibirMails: recibirMails,
          fechaNacimiento: value.toISOString().split("T")[0],
          telefono: "0",
          telefonoMovil: telefono,
          dni: docu,
          sexo: genero,
          idUnidadOrganizacional: 0,
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then(successAlert())
        .catch((err) => console.log({ err }));
    }
  };

  const [form, setForm] = useState({});
  console.log("El estado de form ->", form);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.mail)) {
      setError({ ...error, mailErr: "Ingrese un mail valido" });
    } else setError({ ...error, mailErr: "" });

    if (!form.apellido) {
      setError({ ...error, apellidoErr: "Ingrese un apellido" });
    } else setError({ ...error, apellidoErr: "" });
  };

  const [error, setError] = useState({});

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
              onChange={onChange}
              name="mail"
              size="small"
              className="ButonRegister"
              error={errorMail}
              helperText={leyendaMail}
              variant="outlined"
            />
            {error.mailErr ? (
              <div className="errorFormMsg">{error.mailErr}</div>
            ) : (
              ""
            )}
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
              name="nombre"
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
              onChange={
                onChange /* (e) => {
                setApellidoPaterno(e.target.value);
                if (!apellidoPaterno) {
                  setErrorApellidoPaterno(true);
                  setLeyendaApellidoPaterno("Ingrese su apellido");
                } else {
                  setErrorApellidoPaterno(false);
                  setLeyendaApellidoPaterno("");
                }
              } */
              }
              name="apellido"
              size="small"
              className="ButonRegister"
              error={errorApellidoPaterno}
              helperText={leyendaApellidoPaterno}
              variant="outlined"
            />
            {error.apellidoErr ? (
              <div className="errorFormMsg">{error.apellidoErr}</div>
            ) : (
              ""
            )}
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

            <TextField
              onChange={(e) => {
                setDocu(e.target.value);
                if (!docu) {
                  setErrorDocu(true);
                  setLeyenda("Complete el campo correctamente");
                } else {
                  setErrorDocu(false);
                  setLeyenda("");
                }
              }}
              helperText={leyenda}
              error={errorDocu}
              size="small"
              id="fullWidth"
            />
            <br />
            <br />
            <label for="profesion" className="label">
              <p>PROFESIÓN *</p>
            </label>
            <TextField
              onChange={(e) => {
                setProfesion(e.target.value);
                if (!profesion) {
                  setErrorerrorProfesion(true);
                  setLeyenda("Complete el campo correctamente");
                } else {
                  setErrorerrorProfesion(false);
                  setLeyenda("");
                }
              }}
              helperText={leyenda}
              error={errorProfesion}
              name="profesion"
              id="profesion"
              size="small"
            />

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
              <p>PROVINCIA </p>
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
                if (e.target.value.length < 8) {
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
                if (contraseña !== e.target.value) {
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

            <label for="selector" className="label">
              <p>GENERO </p>
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
              <p>TELEFONO MOVIL *</p>
            </label>
            <TextField
              onChange={(e) => {
                setTelefono(e.target.value);
                if (!telefono && !/^\d+$/.test(telefono)) {
                  setErrorTelefono(true);
                  setLeyenda("Complete el campo correctamente");
                } else {
                  setErrorTelefono(false);
                  setLeyenda("");
                }
              }}
              helperText={leyenda}
              error={errorTelefono}
              size="small"
              id="fullWidth"
            />
            <br />
            <br />
            <label for="selector" className="label">
              <p>ESTUDIOS</p>
            </label>
            <TextField size="small" id="fullWidth" {...estudios} />
            <br />
            <br />
            <label for="selector" className="label">
              <p>LOCALIDAD </p>
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
