import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import "./CrearEquipo";
import Button from "@mui/material/Button";
import { CustomHook } from "../../hooks/CustomHook";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import getToken from "../../utils/getToken";
import { useSelector } from "react-redux";

export function CrearEquipo() {
  const navigate = useNavigate();
  const [imagenEquipo, setImagenEquipo] = useState({});
  const [paises, setPaises] = useState([]);
  const pais = CustomHook("");
  const nombre = CustomHook("");
  const [sedes, setSedes] = useState([]);
  const sede = CustomHook("");
  const cantidad = CustomHook("");
  const [comunidades, setComunidades] = useState([]);
  const comunidad = CustomHook("");
  const descripcion = CustomHook("");
  const [area, setArea] = useState([]);
  const areas = CustomHook("");
  const [categoria, setCategoria] = useState("");
  const loggedUser = useSelector((state) => state.usuario);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/regiones/paises")
      .then((res) => setPaises(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/sedes")
      .then((res) =>
        setSedes(
          res.data.filter(
            (sedesPais) => sedesPais.id_pais.toString() === pais.value
          )
        )
      )
      .catch((err) => console.log(err));
  }, [pais.value]);

  useEffect(() => {
    pais.value &&
      axios
        .get("http://localhost:3001/api/comunidades", {
          headers: { authorization: getToken(), pais: pais.value },
        })
        .then((res) => {
          return setComunidades(res.data);
        })
        .catch((err) => console.log(err));
  }, [pais.value]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/areas")
      .then((res) => setArea(res.data))
      .catch((err) => console.log(err));
  }, []);

  let toggleTerrit = () => {
    var element = document.getElementById("Territo");
    element.style.pointerEvents = "none";
  };

  let toggleTerrito = () => {
    var element = document.getElementById("Territo");
    element.style.pointerEvents = "auto";
  };

  const successAlert = () => {
    swal({
      title: "Equipo creado con exito!",
      text: "El equipo fue incorporado a la plataforma",
      icon: "success",
      timer: "5000",
    });
  };

  const errorAlert = (
    title = "Error!",
    text = "Complete todos los campos requeridos"
  ) => {
    swal({
      title,
      text,
      icon: "error",
      timer: "5000",
    });
  };

  const handleImagen = (e) => {
    e.preventDefault();
    setImagenEquipo(e.target.files[0]);
  };

  const data = new FormData();
  data.append("nombre", nombre.value);
  data.append("cantMiembros", cantidad.value);
  data.append("activo", true);
  data.append("detalles", descripcion.value);
  data.append("paisId", pais.value);
  data.append("sedeId", sede.value ? sede.value : 0);
  data.append(
    "territorioId",
    categoria === "Territorio" ? comunidad.value : null
  );
  data.append("categoria", categoria);
  data.append("area", areas.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pais.value || !categoria)
      errorAlert("Error!", "Complete todos los campos requeridos");
    if (!parseInt(cantidad.value))
      errorAlert("Error!", "Complete correctamente la cantidad de miembros");
    else {
      if (imagenEquipo.name)
        data.append("fotoDeEquipo", imagenEquipo, imagenEquipo.name);
      axios
        .post(`http://localhost:3001/api/equipos/`, data, {
          headers: {
            authorization: loggedUser.token,
            idPersona: loggedUser.idPersona,
          },
        })
        .then((res) => {
          successAlert();
          return res.data;
        })
        .then((equipo) => navigate(`/equipo/${equipo.id}`))
        .catch((err) => console.log({ err }));
    }
  };

  return (
    <div>
      <div id="register">
        <h2 className="TitleRegister">CREACIÓN DE EQUIPOS</h2>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="contenedor-formulario">
            <label htmlFor="selector" className="label">
              <p>NOMBRE DEL EQUIPO</p>
              <TextField
                className="text-field"
                size="small"
                type="text"
                name="nombre"
                {...nombre}
                required
              />
            </label>
            <label htmlFor="selector" className="label">
              <p>DESCRIPCION</p>
              <textarea
                style={{ resize: "none" }}
                className="text-field"
                size="small"
                type="text"
                name="nombres"
                rows="4"
                {...descripcion}
                required
              />
            </label>
            <label htmlFor="selector" className="label">
              <p>CANTIDAD IDEAL DE MIEMBROS</p>
              <TextField
                className="text-field"
                size="small"
                type="text"
                name="nombres"
                {...cantidad}
                required
              />
            </label>
            <label htmlFor="selector" className="label">
              <p>PAÍS</p>
              <select {...pais} className="form-select">
                <option></option>
                {paises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="selector" className="label" required>
              <p>CATEGORIA </p>
              <div className="radio" onClick={toggleTerrit}>
                <label>
                  <input
                    id="radio-button"
                    name="categoria"
                    type="radio"
                    value={categoria}
                    onChange={() => setCategoria("Oficina")}
                  />
                  Oficina
                </label>
              </div>

              <div className="radio" onClick={toggleTerrito}>
                <label>
                  <input
                    id="radio-button"
                    name="categoria"
                    type="radio"
                    value={categoria}
                    onChange={() => setCategoria("Territorio")}
                  />
                  Territorio
                </label>
              </div>
            </label>
            <label htmlFor="selector" className="label">
              <p>SEDE</p>
              <select {...sede} className="form-select">
                <option></option>
                {sedes.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="selector" className="label" id="Territo">
              <p>BARRIO (solo si la categoria es "Territorio")</p>
              <select {...comunidad} className="form-select">
                <option></option>
                {comunidades.length &&
                  comunidades.map((comunidad) => (
                    <option key={comunidad.id} value={comunidad.id}>
                      {comunidad.nombre}
                    </option>
                  ))}
              </select>
            </label>

            <label htmlFor="selector" className="label">
              <p>ÁREA</p>
              <select {...areas} className="form-select">
                <option></option>
                {area.map((area) => (
                  <option key={area.id} value={area.nombre}>
                    {area.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="fotoDeEquipo" className="label">
              <p>IMAGEN DE EQUIPO</p>
              <input
                accept="image/*"
                id="fotoDeEquipo"
                type="file"
                name="fotoDeEquipo"
                onChange={handleImagen}
                style={{ color: "#dc3545" }}
              />
            </label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <Button variant="text">VOLVER</Button>
            </Link>
            <Button
              id="ingresar"
              size="medium"
              variant="outlined"
              type="submit"
            >
              CREAR EQUIPO
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
