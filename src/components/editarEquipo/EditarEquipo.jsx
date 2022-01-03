import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CustomHook } from "../../hooks/CustomHook";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import getToken from "../../utils/getToken";
import { useDispatch, useSelector } from "react-redux";
import { updateEquipo } from "../../state/equipo";

export default function EditarEquipo() {
  const usuario = useSelector((state) => state.usuario);
  const dispatch = useDispatch();
  const equipo = useSelector((state) => state.equipo);
  const navigate = useNavigate();
  const [imagenEquipo, setImagenEquipo] = useState({})
  const [paises, setPaises] = useState([]);
  const pais = CustomHook(equipo.paisId);
  const nombre = CustomHook(equipo.nombre);
  const [sedes, setSedes] = useState([]);
  const sede = CustomHook(equipo.sedeId);
  const cantidad = CustomHook(equipo.cantMiembros);
  const [comunidades, setComunidades] = useState([]);
  const comunidad = CustomHook(equipo.territorioId);
  const descripcion = CustomHook(equipo.detalles);
  const [area, setArea] = useState([]);
  const areas = CustomHook(equipo.area);
  const [categoria, setCategoria] = useState(equipo.categoria);

  useEffect(() => {
    axios
      .get("http://143.198.238.253:3001/api/regiones/paises")
      .then((res) => setPaises(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://143.198.238.253:3001/api/sedes")
      .then((res) =>
        setSedes(
          res.data.filter(
            (sedesPais) =>
              sedesPais.id_pais.toString() === pais.value.toString()
          )
        )
      )
      .catch((err) => console.log(err));
  }, [pais.value]);

  console.log(typeof pais.value);

  useEffect(() => {
    axios
      .get("http://143.198.238.253:3001/api/comunidades", {
        headers: { authorization: getToken(), pais: pais.value },
      })
      .then((res) => {
        return setComunidades(res.data);
      })
      .catch((err) => console.log(err));
  }, [pais.value]);

  useEffect(() => {
    axios
      .get("http://143.198.238.253:3001/api/areas")
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

 /*  let form = {
    nombre: nombre.value,
    cantMiembros: parseInt(cantidad.value),
    activo: equipo.activo,
    detalles: descripcion.value,
    paisId: parseInt(pais.value),
    sedeId: sede.value ? parseInt(sede.value) : 0,
    territorioId: categoria === "Territorio" ? parseInt(comunidad.value) : null,
    categoria: categoria,
    area: areas.value,
  }; */
  const data = new FormData()
  data.set("nombre", nombre.value)
  data.set("cantMiembros", cantidad.value)
  data.set("activo", equipo.activo)
  data.set("detalles", descripcion.value)
  data.set("paisId", pais.value)
  data.set("sedeId", sede.value ? sede.value : 0)
  data.set("territorioId", categoria === "Territorio" ? comunidad.value : null)
  data.set("categoria", categoria)
  data.set("area", areas.value)


  const handleImagen = (e) => {
    e.preventDefault();
    setImagenEquipo(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pais.value)
      errorAlert("Error!", "Complete todos los campos requeridos");
    if (!parseInt(cantidad.value))
      errorAlert("Error!", "Complete correctamente la cantidad de miembros");
    else{
    if(imagenEquipo.name) data.set("fotoDeEquipo", imagenEquipo, imagenEquipo.name)
      dispatch(
        updateEquipo({
          id: equipo.id,
          form: data,
          idPersona: usuario.idPersona,
          token: usuario.token,
        })
      )
        .then(successAlert())
        .then(() => navigate(-1))
        .catch((err) => console.log({ err }));
      }
  };

  return (
    <div>
      <div id="register">
        <h2 className="TitleRegister">Edición de datos de equipos</h2>
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
              <select 
                value={pais.value}
                onChange={(e)=> {
                  pais.onChange(e)
                  sede.setValue(null)
                }} 
                className="form-select" 
                >
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
                    checked={categoria === "Oficina"}
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
                    checked={categoria === "Territorio"}
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
                {comunidades.map((comunidad) => (
                  <option key={comunidad.id} value={comunidad.id}>
                    {comunidad.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="selector" className="label">
              <p>ÁREA</p>
              <option></option>
              <select {...areas} className="form-select">
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
              style={{color: "#dc3545"}}
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
