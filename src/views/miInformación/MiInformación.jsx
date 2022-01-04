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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


import { CustomHook } from "../../hooks/CustomHook";
import { useValidation } from "../../hooks/useValidation";
import swal from "sweetalert";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsuario } from "../../state/usuario";

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
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
  } else if (!form.profesion.trim()) {
    errors.profesion = "El campo 'profesion' es requerido";
  } else if (!regexName.test(form.profesion.trim())) {
    errors.profesion = "El campo 'profesion' es incorrecto";
  } else if (!form.telefonoMovil.trim()) {
    errors.telefonoMovil = "El campo 'Telefono Movil' es requerido";
  } else if (
    !regexTelefono.test(form.telefonoMovil.trim()) ||
    form.telefonoMovil.length < 8
  ) {
    errors.telefonoMovil = "El campo 'Telefono Movil' es incorrecto";
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

function MiInformación() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);
  const navigate = useNavigate();
  //estados para regiones
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  //inputs
  const [imagenPerfil, setImagenPerfil] = useState({});

  const [recibirMails, setRecibirMails] = useState(
    usuario.recibirMails === 1 ? 1 : 0
  );
  const [intereses, setIntereses] = useState(JSON.parse(usuario.intereses));
  const [genero, setGenero] = useState("Prefiero no decirlo");
  const apellidoMaterno = CustomHook("");
  let FechaMinima = new Date(new Date() - 31536000000 * 100)
    .toISOString()
    .split("T")[0];
  let FechaMaxima = new Date(new Date() - 31536000000 * 10)
    .toISOString()
    .split("T")[0];

  const initialForm = {
    nombres: usuario.nombres,
    mail: usuario.mail,
    apellidoPaterno: usuario.apellidoPaterno,
    dni: usuario.dni,
    telefono: usuario.telefono,
    telefonoMovil: usuario.telefonoMovil,
    profesion: usuario.profesion,
    fechaNacimiento: usuario.fechaNacimiento.slice(0, 10),
    estudios: usuario.estudios,
    sexo: usuario.sexo,
    intereses: intereses,
    idPais: usuario.idPais,
    idProvincia: usuario.idProvincia,
    idLocalidad: usuario.idLocalidad,
    recibirMails: recibirMails,
  };

  const estudios = CustomHook(initialForm.estudios);
  const pais = CustomHook(initialForm.idPais);
  const provincia = CustomHook(initialForm.idProvincia);
  const localidad = CustomHook(initialForm.idLocalidad);
  const { form, errors, handleChanges, handleBlur } = useValidation(
    initialForm,
    validationsForm
  );

  const handleMail = () => {
    setRecibirMails((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    axios
      .get("http://143.198.238.253:3001/api/regiones/paises")
      .then((res) => setPaises(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://143.198.238.253:3001/api/regiones/paises/${pais.value}/provincias`)
      .then((res) => setProvincias(res.data))
      .catch((err) => console.log(err));
  }, [pais.value]);

  useEffect(() => {
    (pais.value && provincia.value) &&
    axios
      .get(
        `http://143.198.238.253:3001/api/regiones/paises/${pais.value}/provincias/${provincia.value}/localidades`
      )
      .then((res) => setLocalidades(res.data))
      .catch((err) => console.log(err));
  }, [pais.value, provincia.value]);

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIntereses(value);
  };

  const handleImagenPerfil = e => {
    e.preventDefault();
    setImagenPerfil(e.target.files[0])
  };
 

  //FormData.set() transforma en string los integer y booleans, 
  //por lo que en el back se convierten a su tipo original
  const data = new FormData()
  for(let campo in form) {
    data.append(`${campo}`, form[campo])
  }
  data.set("idPais", pais.value)
  data.set("idProvincia", provincia.value)
  data.set("idLocalidad", localidad.value)
  data.set("estudios", estudios.value)
  data.set("intereses", JSON.stringify(intereses))
  data.set("acepta_marketing", recibirMails)
  data.set("recibirMails", recibirMails)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("intentando editar")
    if(imagenPerfil.name) data.set("fotoDePerfil", imagenPerfil, imagenPerfil.name)
    console.log("intentando axios", form, "pais:", pais.value)
    axios
      .put(
        `http://143.198.238.253:3001/api/usuarios/editarUsuario/${usuario.idPersona}`,
        {...form, 
          fotoDePerfil: data.fotoDePerfil, 
          idPais: pais.value,
          idProvincia: provincia.value || 0,
          idLocalidad: localidad.value || 0,
          estudios: estudios.value,
          acepta_marketing: recibirMails,
          idUnidadOrganizacional: 0,
          intereses: JSON.stringify(intereses)
        },
        {
          headers: {
            authorization: usuario.token,
          },
        }
      )
      .then((res) => dispatch(setUsuario(res.data)))
      .then(() =>
        swal({
          title: "Perfil editado",
          icon: "success",
          timer: "2000",
        })
      )
      .catch((err) => console.log(err));
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

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="contenedor-formulario">
          <label htmlFor="selector" className="label">
            <p>NOMBRES</p>
            <TextField
              className="text-field"
              size="small"
              type="text"
              name="nombres"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.nombres}
              required
            />
            {errors.nombres && <p style={styles}>{errors.nombres}</p>}
          </label>

          <label htmlFor="apellidoPaterno" className="label">
            <p>APELLIDO PATERNO</p>
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
            <p>FECHA DE NACIMIENTO</p>
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
            <p>NUMERO DE DOCUMENTO/PASAPORTE</p>
            <TextField
              className="text-field"
              size="small"
              type="number"
              inputProps={{
                min: 0,
              }}
              name="dni"
              onBlur={handleBlur}
              onChange={handleChanges}
              value={form.dni}
              required
            />
            {errors.dni && <p style={styles}>{errors.dni}</p>}
          </label>

          <label htmlFor="selector" className="label">
            <p>PROFESIÓN / OCUPACIÓN</p>
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
            <p>PAÍS</p>
            <select
              value={pais.value}
              onChange={(e) => {
                pais.onChange(e);
                provincia.onChange({ target: { value: "" } });
                localidad.onChange({ target: { value: "" } });
              }}
              className="form-select"
            >
              {paises.map((pais) =>
                pais.id === initialForm.idPais ? (
                  <option key={pais.id} value={pais.id}>
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
            <p>TELEFONO MOVIL</p>
            <TextField
              className="text-field"
              size="small"
              type="number"
              inputProps={{
                min: 0,
              }}
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
            <p>PROVINCIA </p>
            <select {...provincia} className="form-select">
              <option></option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.provincia}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="selector" className="label">
            <p>ESTUDIOS</p>
            <select {...estudios} className="form-select">
              {listaEstudios.map((estudio, i) =>
                estudio === initialForm.estudios ? (
                  <option key={i} value={estudio}>
                    {estudio}
                  </option>
                ) : (
                  <option key={i} value={estudio}>
                    {estudio}
                  </option>
                )
              )}
            </select>
          </label>

          <label htmlFor="selector" className="label">
            <p>LOCALIDAD </p>
            <select {...localidad} className="form-select">
              <option></option>
              {provincias.length &&
                localidades.map((localidad) => (
                  <option key={localidad.id} value={localidad.id}>
                    {localidad.localidad}
                  </option>
                ))}
            </select>
          </label>

          <label htmlFor="selector" className="label">
            <p>TEMÁTICAS/ÁREAS DE INTÉRES</p>
            <Select
              id="demo-multiple-chip"
              multiple
              value={intereses}
              style={{ width: "100%" }}
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
          <label htmlFor="fotoDePerfil" className="label">
            <p>IMAGEN DE PERFIL</p>
            <input
              accept="image/*"
              id="fotoDePerfil"
              type="file"
              name="fotoDePerfil"
              onChange={handleImagenPerfil}        
                style={{ display: 'none' }} 
            />
             <Button style={{height:"35%"}} id="ingresar" startIcon={<AddPhotoAlternateIcon />}variant="contained" component="span">
             
             
             Subir
           </Button>
      
           
           {imagenPerfil? imagenPerfil.name : null}
          </label>
        </div>

        <div id="form-fondo">
          <Divider className="divisor" />
          <label htmlFor="selector" className="label" id="checkbox">
            <input
              type="checkbox"
              onClick={handleMail}
              checked={recibirMails === 1 ? true : false}
            />
            Acepto recibir notificaciones por email
          </label>

          <Button variant="text" onClick={() => navigate(-1)}>
            VOLVER
          </Button>

          <Button id="ingresar" size="medium" variant="outlined" type="submit">
            GUARDAR
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MiInformación;
