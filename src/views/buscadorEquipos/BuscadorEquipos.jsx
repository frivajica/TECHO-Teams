import { useState, useEffect } from "react";
import EquipoCard from "./EquipoCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import { CustomHook } from "../../hooks/CustomHook";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BuscadorEquipos = () => {
  const errorAlert = () => {
    swal({
      title: "¡No se encontraron resultados para tu búsqueda!",
      text: "Intentá nuevamente",
      button: "Aceptar",
      icon: "error",
    });
  };

  const [trigger, setTrigger] = useState(true);
  const [equipos, setEquipos] = useState([]);
  const filtros = ["Sede", "Area", "Nombre"];
  const [paises, setPaises] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [areas, setAreas] = useState([]);
  const filtro = CustomHook("Nombre");
  const pais = CustomHook("");
  const sede = CustomHook("");
  const area = CustomHook("");
  const nombre = CustomHook("");

  useEffect(() => {
    const pedidos = [
      axios.get("http://localhost:3001/api/regiones/paises"),
      axios.get("http://localhost:3001/api/areas"),
    ];
    Promise.all(pedidos)
      .then((resp) => {
        setPaises(resp[0].data);
        setAreas(resp[1].data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/sedes")
      .then((res) =>
        setSedes(
          res.data.filter(
            (sedesPais) => sedesPais.id_pais.toString() == pais.value
          )
        )
      )
      .catch((err) => console.log(err));
  }, [pais.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger(false);
    let valor;
    switch (filtro.value) {
      case "Sede":
        valor = sede.value;
        break;
      case "Area":
        valor = area.value;
        break;
      case "Nombre":
        valor = nombre.value;
        break;
    }
    axios
      .get(
        `http://localhost:3001/api/equipos/?filtro=${filtro.value}&valor=${valor}`
      )
      .then((res) => {
        setEquipos(res.data);
        setTrigger(true);
        !res.data.length && errorAlert();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="buscadorEquipos">
        <form className="formEquipos" onSubmit={handleSubmit}>
          <h3 style={{ color: "#0092dd" }}>BUSCAR EQUIPOS</h3>
          <div
            style={{
              width: "75%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              select
              label="Buscar por"
              size="small"
              type="text"
              name="filtros"
              {...filtro}
              style={{ width: "20%" }}
              required
            >
              {filtros.map((filtro) => (
                <MenuItem key={filtro} value={filtro}>
                  {filtro}
                </MenuItem>
              ))}
            </TextField>
            {filtro.value === "Sede" && (
              <>
                <TextField
                  select
                  label="Pais"
                  size="small"
                  type="text"
                  style={{ width: "20%" }}
                  name="paises"
                  required
                  {...pais}
                >
                  {paises.map((pais) => (
                    <MenuItem key={pais.id} value={pais.id}>
                      {pais.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Sede"
                  size="small"
                  type="text"
                  style={{ width: "20%" }}
                  name="sedes"
                  required
                  {...sede}
                >
                  {sedes.map((sede) => (
                    <MenuItem key={sede.id} value={sede.id}>
                      {sede.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
            {filtro.value === "Area" && (
              <TextField
                select
                label="Area"
                size="small"
                type="text"
                style={{ width: "20%" }}
                name="areas"
                {...area}
              >
                {areas.map((area) => (
                  <MenuItem key={area.id} value={area.nombre}>
                    {area.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {filtro.value === "Nombre" && (
              <TextField
                placeholder="Buscar"
                size="small"
                type="text"
                style={{ width: "50%" }}
                name="nombre"
                {...nombre}
              />
            )}
            <Button
              className="botonEquipos"
              id="ingresar"
              size="medium"
              variant="outlined"
              type="submit"
            >
              BUSCAR
            </Button>
          </div>
        </form>
      </div>
      {trigger ? (
        <>
          {equipos.some((e) => e.activo === true) ? (
            <h5 className="texto-equipo">EQUIPOS ACTIVOS:</h5>
          ) : null}
          <div className="contenedor-equipo">
            {equipos.map(
              (equipo) =>
                equipo.activo && <EquipoCard key={equipo.id} equipo={equipo} />
            )}
          </div>
          {equipos.some((e) => e.activo === false) ? (
            <h5 className="texto-equipo">EQUIPOS INACTIVOS:</h5>
          ) : null}
          <div className="contenedor-equipo">
            {equipos.map(
              (equipo) =>
                !equipo.activo && <EquipoCard key={equipo.id} equipo={equipo} />
            )}
          </div>
     {/*      <Stack spacing={2}>
            <Pagination count={10} />
          </Stack> */}
        </>
      ) : (
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "320px",
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}
    </>
  );
};

export default BuscadorEquipos;
