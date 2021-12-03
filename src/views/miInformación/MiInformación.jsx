import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import RadioButonGenero from "./RadioButonGenero";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import swal from "sweetalert";
import useForm from "../../hooks/formState";
import "./Register.css";
import { useTheme } from "@mui/material/styles";
import { usuario as u } from "../../utils/mockData";
import superagent from "superagent";
import {
  interes,
  getStyles,
  MenuProps,
  maskMap,
  localeMap,
} from "../../utils/formUtils";
import { bgcolor } from "@mui/system";
import { useSelector } from "react-redux";

function MiInformación() {
  const usuario = useSelector((state) => state.usuario);

  //estados para regiones
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  //info de usuario loggeado
  const [loggedUser, setLoggedUser] = useState({});

  // select para la datapicker (Fecha de nna)
  const [locale] = useState("fr");
  const [value, setValue] = useState(new Date());
  //imputs
  const { form, handleChange } = useForm();
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [intereses, setIntereses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/regiones/paises")
      .then((res) => setPaises(res.data))
      .catch((err) => console.log(err));

    superagent
      .get("ruta de api para datos de usuario loggeado + token")
      .then((usrInfo) => setLoggedUser(usrInfo));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/regiones/paises/${pais}/provincias`)
      .then((res) => setProvincias(res.data))
      .catch((err) => console.log(err));
  }, [pais]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/regiones/paises/${pais}/provincias/${provincia}/localidades`
      )
      .then((res) => setLocalidades(res.data))
      .catch((err) => console.log(err));
  }, [provincia]);

  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    superagent
      .post("ruta de la api", { ...form, pais, provincia })
      .then(() => {
        axios.put("ruta editar usuario db", { intereses }).then(() =>
          swal({
            title: "Perfil editado",
            icon: "success",
            timer: "2000",
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mainContainer">
      <div className="secondContainer">
        <p className="Title">
          {`Bienvenido, ${u.nombres} (mail@provicional.com)`}
        </p>
        <p className="subtitle">
          Aquí podrás realizar cambios en tu pérfil. También podés{" "}
          <a href="https://actividades.techo.org/perfil/cambiar_email">
            cambiar tu dirección de email.
          </a>
        </p>

        <br />
        <br />
        <Divider />
        <br />

        <h1 className="formTitle">Datos Personales</h1>

        <div class="row">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} style={{ width: "90%" }}>
              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>Nombres</p>
                </label>
                <TextField
                  size="small"
                  lg={10}
                  sm={12}
                  id="nombres"
                  name="nombres"
                  onChange={handleChange}
                  defaultValue={usuario.nombres}
                />
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>APELLIDO PATERNO</p>
                </label>
                <TextField
                  size="small"
                  lg={10}
                  sm={12}
                  id="nombres"
                  name="nombres"
                  onChange={handleChange}
                  defaultValue={usuario.apellidoPaterno}
                />
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>FECHA DE NACIMIENTO</p>
                </label>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={localeMap[locale]}
                >
                  <DatePicker
                    mask={maskMap[locale]}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField lg={10} sm={12} {...params} />
                    )}
                    // {...fechaNacimiento}
                  />
                  {/* {fechaDeNacimientoErr ? (
							<div className="errorFormMsg">{fechaDeNacimientoErr}</div>
							) : (
							""
							)} */}
                </LocalizationProvider>
              </Grid>

              <Grid item lg={6} sm={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Género</FormLabel>
                  <RadioGroup row name="sexo" onChange={handleChange}>
                    <FormControlLabel
                      value="mujer"
                      control={<Radio />}
                      label="mujer"
                    />
                    <FormControlLabel
                      value="hombre"
                      control={<Radio />}
                      label="hombre"
                    />
                    <FormControlLabel
                      value="otrx"
                      control={<Radio />}
                      label="otrx"
                    />
                    <FormControlLabel
                      value="prefiero no decirlo"
                      control={<Radio />}
                      label="prefiero no decirlo"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>NUMERO DE DOCUMENTO/PASAPORTE</p>
                </label>
                <TextField
                  lg={10}
                  sm={12}
                  name="DNI"
                  size="small"
                  id="fullWidth"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>PAIS </p>
                  <select
                    lg={10}
                    sm={12}
                    name="pais"
                    onChange={(e) => setPais(e.target.value)}
                  >
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.id}>
                        {pais.nombre}
                      </option>
                    ))}
                  </select>
                </label>
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>PROVINCIA</p>
                  <select
                    lg={10}
                    sm={12}
                    name="provincia"
                    onChange={(e) => setProvincia(e.target.value)}
                  >
                    {provincias.map((provincia) => (
                      <option key={provincia.id} value={provincia.id}>
                        {provincia.provincia}
                      </option>
                    ))}
                  </select>
                </label>
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>LOCALIDAD</p>
                  <select
                    lg={10}
                    sm={12}
                    name="localidad"
                    onChange={handleChange}
                  >
                    {localidades.map((localidad) => (
                      <option key={localidad.id} value={localidad.id}>
                        {localidad.localidad}
                      </option>
                    ))}
                  </select>
                </label>
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>APELLIDO MATERNO </p>
                </label>
                <TextField
                  size="small"
                  lg={10}
                  sm={12}
                  id="nombres"
                  name="nombres"
                />
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>TELEFONO </p>
                </label>
                <TextField size="small" id="fullWidth" lg={10} sm={12} />
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>ESTUDIOS</p>
                </label>
                <TextField size="small" id="fullWidth" lg={10} sm={12} />
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>PROFESIÓN </p>
                </label>
                <TextField
                  lg={10}
                  sm={12}
                  name="profesion"
                  id="profesion"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item lg={6} sm={12}>
                <label for="selector" className="label">
                  <p>TEMATICAS/AREAS DE INTERES EN TECHO</p>
                </label>
                <Select
                  id="demo-multiple-chip"
                  multiple
                  value={intereses}
                  onChange={(e) => setIntereses(e.target.value)}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
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
              </Grid>
            </Grid>
          </form>
        </div>

        <br />
        <FormControlLabel
          label="Recibir notificaciones operativas de la plataforma (necesario para mantenerte informado de las actividades en las que participas)"
          control={<Checkbox />}
        />
        <FormControlLabel
          label="Acepto que TECHO se contacte conmigo para notificarme de eventos y campañas"
          control={<Checkbox />}
        />
        <br />
        <br />

        <div style={{ alignSelf: "flex-start" }}>
          <Button
            id="ingresar"
            size="medium"
            variant="outlined"
            type="submit"
            sx={{ mr: 0.5 }}
          >
            GUARDAR
          </Button>
          <Button
            className="redButton"
            size="medium"
            variant="outlined"
            id="ingresar"
          >
            ELIMINAR MI CUENTA
          </Button>
        </div>

        <br />
        <Divider />
        <br />
      </div>
    </div>
  );
}

export default MiInformación;
