import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import frLocale from "date-fns/locale/fr";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { CustomHook } from "../../hooks/CustomHook";
import { useValidation } from "../../hooks/useValidation";
import "./Register.css";
import swal from "sweetalert";
import { useTheme } from "@mui/material/styles";

const initialForm = {
  nombres: "",
  mail: "",
  apellidoPaterno: "",
  dni: "",
  telefonoMovil: "",
  profesion: "",
  password: "",
  password_confirmation: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexMail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexDocu = /^[a-zA-Z0-9_.-]*$/;
  let regexTelefono = /^[0-9]*$/;

  if (!form.nombres.trim()) {
    errors.nombres = "El campo 'Nombres' es requerido";
  } else if (!regexName.test(form.nombres.trim())) {
    errors.nombres =
      "El campo 'Nombres' sólo acepta letras y espacios en blanco";
  } else if (!form.mail.trim()) {
    errors.mail = "El campo 'mail' es requerido";
  } else if (!regexMail.test(form.mail.trim())) {
    errors.mail = "El campo 'mail' es incorrecto";
  } else if (!form.apellidoPaterno.trim()) {
    errors.apellidoPaterno = "El campo 'Apellido Paterno' es requerido";
  } else if (!regexName.test(form.apellidoPaterno.trim())) {
    errors.apellidoPaterno = "El campo 'Apellido Paterno' es incorrecto";
  } else if (!form.dni.trim()) {
    errors.dni = "El campo 'NUMERO DE DOCUMENTO/PASAPORTE ' es requerido";
  } else if (!regexDocu.test(form.dni.trim())) {
    errors.dni = "El campo 'NUMERO DE DOCUMENTO/PASAPORTE ' es incorrecto";
  } else if (!form.telefonoMovil.trim()) {
    errors.telefonoMovil = "El campo 'Telefono Movil' es requerido";
  } else if (
    !regexTelefono.test(form.telefonoMovil.trim()) ||
    form.telefonoMovil.length < 8
  ) {
    errors.telefonoMovil = "El campo 'Telefono Movil' es incorrecto";
  } else if (!form.profesion.trim()) {
    errors.profesion = "El campo 'profesion' es requerido";
  } else if (!regexName.test(form.profesion.trim())) {
    errors.profesion = "El campo 'profesion' es incorrecto";
  } else if (!form.password.trim()) {
    errors.password = "El campo 'password' es requerido";
  } else if (form.password.length < 8) {
    errors.password = "El campo 'password' debe contener mas de 8 caracteres";
  } else if (!form.password_confirmation.trim()) {
    errors.password_confirmation = "Este campo es requerido!";
  } else if (form.password_confirmation !== form.password) {
    errors.password_confirmation =
      "El campo debe coincidir con el campo de password";
  }

  return errors;
};

let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};

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
  const {
    form,
    errors,
    loading,
    response,
    handleChanges,
    handleBlur,
    //handleSubmit,
  } = useValidation(initialForm, validationsForm);

  //estados para regiones
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  // select para la datapicker (Fecha de nna)
  const [locale] = useState("fr");
  const [value, setValue] = useState(new Date());
  //inputs
  const [recibirMails, setRecibirMails] = useState(0);
  const [intereses, setIntereses] = useState([]);
  const pais = CustomHook("");
  const provincia = CustomHook("");
  const localidad = CustomHook("");
  const [genero, setGenero] = useState("Prefiero no decirlo");
  const estudios = CustomHook("");
  const apellidoMaterno = CustomHook("");

  const handleMail = () => {
    setRecibirMails((prev) => (prev === 0 ? 1 : 0));
  };

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
      text: "Complete los campos obligatorios correctamente",
      button: "Aceptar",
      icon: "error",
    });
  };

  let envio = {
    ...form,
    idPais: parseInt(pais.value),
    idProvincia: parseInt(provincia.value),
    idLocalidad: parseInt(localidad.value),
    estudios: estudios.value,
    intereses: JSON.stringify(intereses),
    apellidoMaterno: apellidoMaterno.value,
    acepta_marketing: recibirMails,
    recibirMails: recibirMails,
    fechaNacimiento: value.toISOString().split("T")[0],
    telefono: "0",
    sexo: genero,
    idUnidadOrganizacional: 0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors) !== 0) errorAlert();
    else if (!pais.value) errorAlert();
    else if (!intereses.length) errorAlert();
    else {
      axios
        .post("http://localhost:3001/api/usuarios/registrar", envio)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then(successAlert())
        .catch((err) => console.log({ err }));
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
              <p>EMAIL *</p>
            </label>
            <TextField
              type="email"
              name="mail"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.mail}
              required
            />
            {errors.mail && <p style={styles}>{errors.mail}</p>}
            <br />
            <br />
            <label for="selector" className="label">
              <p>NOMBRES *</p>
            </label>
            <TextField
              type="text"
              name="nombres"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.nombres}
              required
            />
            {errors.nombres && <p style={styles}>{errors.nombres}</p>}
            <br />
            <br />
            <label for="apellidoPaterno" className="label">
              <p>APELLIDO PATERNO *</p>
            </label>
            <TextField
              type="text"
              name="apellidoPaterno"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.apellidoPaterno}
              required
            />
            {errors.apellidoPaterno && (
              <p style={styles}>{errors.apellidoPaterno}</p>
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
              type="text"
              name="dni"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.dni}
              required
            />
            {errors.dni && <p style={styles}>{errors.dni}</p>}

            <br />
            <br />
            <label for="selector" className="label">
              <p>PROFESIÓN / OCUPACIÓN*</p>
            </label>
            <TextField
              type="text"
              name="profesion"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.profesion}
              required
            />
            {errors.profesion && <p style={styles}>{errors.profesion}</p>}
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
              type="text"
              name="password"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.password}
              required
            />
            {errors.password && <p style={styles}>{errors.password}</p>}
            <br />
            <br />
            <label for="selector" className="label">
              <p>CONFIRMAR CONTRASEÑA *</p>
            </label>

            <TextField
              type="text"
              name="password_confirmation"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.password_confirmation}
              required
            />
            {errors.password_confirmation && (
              <p style={styles}>{errors.password_confirmation}</p>
            )}
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
              type="text"
              name="telefonoMovil"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.telefonoMovil}
              required
            />
            {errors.telefonoMovil && (
              <p style={styles}>{errors.telefonoMovil}</p>
            )}
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
