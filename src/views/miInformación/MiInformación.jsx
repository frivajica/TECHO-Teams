import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { CustomHook } from "../../hooks/CustomHook";
import { useValidation } from "../../hooks/useValidation";
// import "../../components/Register.css";
import swal from "sweetalert";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  }
  return errors;
};

let styles = {
  fontWeight: "bold",
  color: "#dc3545",
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

function MiInformación() {
  const usuario = useSelector((state) => state.usuario);

  const initialForm = {
    nombres: usuario.nombres,
    mail: usuario.mail,
    apellidoPaterno: usuario.apellidoPaterno,
    dni: usuario.dni,
    telefonoMovil: usuario.telefonoMovil,
    profesion: usuario.profesion,
    fechaNacimiento: usuario.fechaNacimiento,
    estudios: usuario.estudios,
    sexo: usuario.sexo,
    intereses: usuario.intereses,
    idPais: usuario.idPais,
    idProvincia: usuario.idProvincia,
    idLocalidad: usuario.idLocalidad,
  };

  const { form, errors, handleChanges, handleBlur } = useValidation(
    initialForm,
    validationsForm
  );

  const navigate = useNavigate();
  //estados para regiones
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const pais = CustomHook(initialForm.idPais);
  const provincia = CustomHook(initialForm.idProvincia);
  const localidad = CustomHook(initialForm.idLocalidad);

  //inputs
  const [recibirMails, setRecibirMails] = useState(0);
  const [intereses, setIntereses] = useState([]);
  const [genero, setGenero] = useState("Prefiero no decirlo");
  const estudios = CustomHook(initialForm.estudios);
  const apellidoMaterno = CustomHook("");
  let FechaMinima = new Date(new Date() - 31536000000 * 100)
    .toISOString()
    .split("T")[0];
  let FechaMaxima = new Date(new Date() - 31536000000 * 10)
    .toISOString()
    .split("T")[0];

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
      title: "Registro exitoso!",
      text: "Dirigite a Ingresar para loguearte",
      icon: "success",
      timer: "5000",
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
    telefono: "0",
    sexo: genero,
    idUnidadOrganizacional: 0,
  };

  // ESTE POST HAY QUE VER
  const handleSubmit = (e) => {
    // e.preventDefault();
    // superagent
    //   .post("https://sandbox.actividades.techo.org/api/editPersona/12345", {
    //     ...form,
    //     pais,
    //     provincia,
    //   })
    //   .then(() => {
    //     axios.put("ruta editar usuario db", { intereses }).then(() =>
    //       swal({
    //         title: "Perfil editado",
    //         icon: "success",
    //         timer: "2000",
    //       })
    //     );
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="TitleRegister">Datos Personales</h1>
      <hr />
      <br />
      <div className="subtitle2" style={{ display: "flex" }}>
        <p>
          Aquí podrás realizar cambios en tu perfil. También podés{" "}
          <a href="https://actividades.techo.org/perfil/cambiar_email">
            cambiar tu dirección de email.
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="contenedor-formulario">
          <label htmlFor="selector" className="label">
            <p>NOMBRES *</p>
            <TextField
              className="text-field"
              size="small"
              type="text"
              name="nombres"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.nombres}
              defaultValue={usuario.nombres}
              required
            />
            {errors.nombres && <p style={styles}>{errors.nombres}</p>}
          </label>

          <label htmlFor="apellidoPaterno" className="label">
            <p>APELLIDO PATERNO *</p>
            <TextField
              className="text-field"
              size="small"
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
          </label>

          <label htmlFor="selector" className="label">
            <p>FECHA DE NACIMIENTO *</p>
            <input
              onBlur={handleBlur}
              onChange={handleChanges}
              className="input-fecha"
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              min={FechaMinima}
              max={FechaMaxima}
              onKeyDown={(e) => e.preventDefault()}
              required
            />
            <span className="validity"></span>
            {errors.fechaNacimiento && (
              <p style={styles}>{errors.fechaNacimiento}</p>
            )}
          </label>

          <label htmlFor="selector" className="label">
            <p>NUMERO DE DOCUMENTO/PASAPORTE *</p>
            <TextField
              className="text-field"
              size="small"
              type="text"
              name="dni"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.dni}
              required
            />
            {errors.dni && <p style={styles}>{errors.dni}</p>}
          </label>

          <label htmlFor="selector" className="label">
            <p>PROFESIÓN / OCUPACIÓN*</p>
            <TextField
              className="text-field"
              size="small"
              type="text"
              name="profesion"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.profesion}
              required
            />
            {errors.profesion && <p style={styles}>{errors.profesion}</p>}
          </label>

          <label htmlFor="selector" className="label">
            <p>TELEFONO MOVIL *</p>
            <TextField
              className="text-field"
              size="small"
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
          </label>
          <label htmlFor="selector" className="label">
            <p>PAÍS *</p>
            <select {...pais} className="form-select">
              {paises.map((pais) =>
                // -> initialForm.pais -> 13
                pais.id === initialForm.pais ? (
                  <option key={pais.id} value={pais.id} selected="selected">
                    {pais.nombre}
                  </option>
                ) : (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                )
              )}
            </select>
          </label>

          <label htmlFor="selector" className="label">
            <p>PROVINCIA </p>
            <select {...provincia} className="form-select">
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.provincia}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="selector" className="label">
            <p>ESTUDIOS</p>
            <TextField
              className="text-field"
              size="small"
              id="fullWidth"
              {...estudios}
            />
          </label>

          <label htmlFor="selector" className="label">
            <p>LOCALIDAD </p>
            <select {...localidad} className="form-select">
              {localidades.map((localidad) => (
                <option key={localidad.id} value={localidad.id}>
                  {localidad.localidad}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="selector" className="label">
            <p>TEMÁTICAS/ÁREAS DE INTÉRES *</p>
            <Select
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
          </label>

          <label htmlFor="selector" className="label">
            <p>GÉNERO </p>
            <div className="radio">
              <label>
                <input
                  id="radio-button"
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
                  id="radio-button"
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
                  id="radio-button"
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
                  id="radio-button"
                  type="radio"
                  name="genero"
                  value={genero}
                  onChange={() => setGenero("Prefiero no decirlo")}
                />
                Prefiero no decirlo
              </label>
            </div>
          </label>
        </div>

        <div id="form-fondo">
          <Divider className="divisor" />
          <label htmlFor="selector" className="label" id="checkbox">
            <input type="checkbox" onClick={handleMail} />
            Acepto recibir notificaciones por email
          </label>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button variant="text">VOLVER</Button>
          </Link>
          <Button id="ingresar" size="medium" variant="outlined" type="submit">
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
      </form>
    </div>
  );
}

export default MiInformación;
