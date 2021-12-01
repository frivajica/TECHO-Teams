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

  //select intereses
  const [intereses, setIntereses] = useState([]);
  //
  const pais = CustomHook("");
  const provincia = CustomHook("");
  const localidad = CustomHook("");
  //radio buton
  const [genero, setGenero] = useState("Prefiero no decirlo");

  // parte eber validacion
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
    setIntereses(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <div className="TitleRegister">
        Completa estos datos para registrarte!
      </div>
      <br />

      <div class="row">
        <form>
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
              />
            </LocalizationProvider>
            <br />
            <br />

            <label for="selector" className="label">
              <p>NUMERO DE DOCUMENTO/PASAPORTE *</p>
            </label>

            <TextField 
            onChange={(e)=>{
              setDocu(e.target.value)
              if(!docu){
                setErrorDocu(true)
              setLeyenda("rellene el campo correctamente para continuar")
              }else{
                setErrorDocu(false)
              setLeyenda("")
              }
              
            }}
            helperText={leyenda}
            error={errorDocu}
            size="small"
             id="fullWidth"
             />
            <br />
            <br />
            <label for="selector" className="label">
              <p>PROFESIÓN *</p>
            </label>

            <TextField
             onChange={(e)=>{
              setProfesion(e.target.value)
              if(!profesion){
                setErrorerrorProfesion(true)
              setLeyenda("rellene el campo correctamente para continuar")
              }else{
                setErrorerrorProfesion(false)
              setLeyenda("")
              }
              
            }}
            helperText={leyenda}
            error={errorProfesion}
             name="profesion"
              id="profesion" 
              size="small" />

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
            <TextField 
              onChange={(e)=>{
                setTelefono(e.target.value)
                if(!telefono){
                  setErrorTelefono(true)
                setLeyenda("rellene el campo correctamente para continuar")
                }else{
                  setErrorTelefono(false)
                setLeyenda("")
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

            <TextField size="small" id="fullWidth" />
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
