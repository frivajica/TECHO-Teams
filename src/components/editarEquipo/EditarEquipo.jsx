import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CustomHook } from "../../hooks/CustomHook";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import getToken from "../../utils/getToken";
import { useDispatch, useSelector } from "react-redux";
import { updateEquipo } from "../../state/equipo";

const listaAreas = [
  "",
  "Voluntariado",
  "Comunicaciones",
  "Desarrollo de Fondos",
  "Gestión Comunitaria",
  "Administración y Finanzas",
  "Legal",
  "Investigación",
  "Regional/Generalista",
  "Vivienda y Habitat",
];

export default function EditarEquipo() {
  const dispatch = useDispatch();
  const equipo = useSelector((state) => state.equipo);
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);
  const pais = CustomHook(equipo.paisId);
  const nombre = CustomHook(equipo.nombre);
  const [sedes, setSedes] = useState([]);
  const sede = CustomHook(equipo.sedeId);
  const cantidad = CustomHook(equipo.cantMiembros);
  const [comunidades, setComunidades] = useState([]);
  const comunidad = CustomHook("");
  const descripcion = CustomHook(equipo.detalles);
  const areas = CustomHook(equipo.area);
  const [categoria, setCategoria] = useState(equipo.categoria);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/regiones/paises")
      .then((res) => setPaises(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/sedes")
      .then((res) => setSedes(res.data))
      .catch((err) => console.log(err));
  }, [pais.value]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/comunidades", {
        headers: { Authorization: getToken() },
      })
      .then((res) => {
        // console.log(res.data.text);
        let comunidadArr = res.data.text;
        //.slice(0, res.data.length - 2);
        console.log(comunidadArr);
        return setComunidades(
          comunidadArr.filter(
            (comunidadesPais) => comunidadesPais.id_pais === pais.value
          )
        );
      })
      .catch((err) => console.log(err));
  }, [pais.value]);

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
      title: "Guardado!",
      text: "Los datos fueron modificados con exito",
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

  let form = {
    nombre: nombre.value,
    cantMiembros: parseInt(cantidad.value),
    activo: equipo.activo,
    detalles: descripcion.value,
    paisId: parseInt(pais.value),
    sedeId: sede.value ? parseInt(sede.value) : 0,
    territorioId: null,
    // falta la comunidad/barrio, hay que arreglar el endpoint, si categoria = oficina, va vacio
    categoria: categoria,
    area: areas.value,
    img: equipo.img,
  };

  console.log(form);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pais.value || !categoria)
      errorAlert("Error!", "Complete todos los campos requeridos");
    if (!parseInt(cantidad.value))
      errorAlert("Error!", "Complete correctamente la cantidad de miembros");
    else
      dispatch(updateEquipo({ id: equipo.id, form: form }))
        .then(successAlert())
        .then(() => navigate(-1))
        .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <div id="register">
        <h2 className="TitleRegister">Edición de datos de equipos</h2>
        <form onSubmit={handleSubmit}>
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
              <TextField
                className="text-field"
                size="small"
                type="text"
                name="nombres"
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
                    name="oficina"
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
                    name="territorio"
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
                {comunidades.map((comunidad) => (
                  <option key={comunidad.id} value={comunidad.id}>
                    {comunidad.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="selector" className="label">
              <p>ÁREA</p>
              <select {...areas} className="form-select">
                {listaAreas.map((area, i) => (
                  <option key={i} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Button variant="text" onClick={() => navigate(-1)}>
              VOLVER
            </Button>

            <Button
              id="ingresar"
              size="medium"
              variant="outlined"
              type="submit"
            >
              GUARDAR
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
