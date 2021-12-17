import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function ModalCoord({
  usuarioSelec,
  usuario,
  paises,
  show,
  setShow,
  sedes,
  setSedes,
  setRows,
  setOpen,
}) {
  const [isCoord, setIsCoord] = useState(null);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState(null);
  const [sede, setSede] = useState({ id: null, nombre: null });
  const [pais, setPais] = useState({ id: null, nombre: null });
  const [disabled, setDisabled] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function HandleSubmit() {
    axios
      .put(
        `http://localhost:3001/api/usuarios/setCoord/${usuarioSelec.idPersona}`,
        {
          isCoordinador: isCoord,
          sedeIdCoord: sede.id,
          paisIdCoord: pais.id,
          areaCoord: area,
        },
        {
          headers: { idPersona: usuario.idPersona },
        }
      )
      .then(() => {
        setRows((rows) =>
          rows.map((row) => {
            if (row.idPersona === usuarioSelec.idPersona)
            
             { 
              paises.map(p => {if(p.id === pais.id) pais.nombre = p.nombre})
              sedes.map(s =>{if(s.id === sede.id) sede.nombre = s.nombre}) 
              return {
                ...row,
                isCoordinador: isCoord,
                nombreSedeCoord: sede.nombre,
                sedeIdCoord: sede.id,
                paisIdCoord: pais.id,
                areaCoord: area,
                nombrePaisCoord: pais.nombre,
              }}
            else {
              return row;
            }
          })
        );
        setShow(false);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/sedes")
      .then((res) =>
        setSedes(res.data.filter((sedesPais) => sedesPais.id_pais === pais.id))
      )
      .catch((err) => console.log(err));
  }, [pais]);

  useEffect(() => {
    setIsCoord(usuarioSelec.isCoordinador);
    setPais({
      id: usuarioSelec.paisIdCoord,
      nombre: usuarioSelec.nombrePaisCoord,
    });
    setArea(usuarioSelec.areaCoord);
    setSede({
      id: usuarioSelec.sedeIdCoord,
      nombre: usuarioSelec.nombreSedeCoord,
    });
  }, [show]);

  useEffect(() => {
    if (!isCoord) {
      setDisabled(true);
      setPais({ id: null, nombre: null });
      setArea(null);
      setSede({ id: null, nombre: null });
    } else {
      setDisabled(false);
    }
  }, [isCoord]);

  return (
    <div>
      <Modal onClose={() => setShow(false)} open={show}>
        <Grid sx={style} direction="columm">
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  onClick={() => setIsCoord(!isCoord)}
                  checked={isCoord}
                />
              }
              label="Coordinador"
            />
          </Grid>

          <Grid item>
            <InputLabel id="">Pais</InputLabel>
            <Select
              onChange={(e) => setPais({ id: e.target.value, nombre: null })}
              value={pais.id}
              sx={{ minWidth: "15rem" }}
              disabled={disabled}
            >
              {paises.map((pais) => (
                <MenuItem key={pais.id} value={pais.id}>
                  {pais.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="">Sede</InputLabel>
            <Select
              onChange={(e) => setSede({ id: e.target.value, nombre: null })}
              defaultValue={usuarioSelec.sedeIdCoord}
              value={sede.id}
              disabled={disabled}
              sx={{ minWidth: "15rem" }}
            >
              {sedes.map((sede) => (
                <MenuItem key={sede.id} value={sede.id}>
                  {sede.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="">Area</InputLabel>
            <Select
              onChange={(e) => setArea(e.target.value)}
              defaultValue={usuarioSelec.areaCoord}
              value={area}
              disabled={disabled}
              sx={{ minWidth: "15rem" }}
            >
              {areas.map((Area) => (
                <MenuItem key={Area.id} value={Area.nombre}>
                  {Area.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <br />
          <Button variant="outlined" onClick={() => HandleSubmit()}>
            Guardar
          </Button>
        </Grid>
      </Modal>
    </div>
  );
}
