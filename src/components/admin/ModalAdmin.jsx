import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function ModalAdmin({
  show,
  usuarioSelec,
  setShow,
  usuario,
  setRows,
  paises,
  sedes,
  setSedes,
}) {
  const [open, setOpen] = React.useState(false);
  const [isCoord, setIsCoord] = useState(null);
  const [sede, setSede] = useState(null);
  const [pais, setPais] = useState(null);
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState([]);
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


useEffect(()=>{
  axios
      .get("http://localhost:3001/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.log(err));
},[])

  useEffect(() => {
    console.log("PAIS",pais)
    axios
      .get("http://localhost:3001/api/sedes")
      .then((res) =>
        setSedes(res.data.filter((sedesPais) => sedesPais.id_pais === pais.id))
      )
      .catch((err) => console.log(err));
  }, [pais]);

  useEffect(() => {
    setIsCoord(usuarioSelec.isCoordinador);
    setPais({id:usuarioSelec.paisIdCoord,nombre:usuarioSelec.nombrePaisCoord});
    setArea(usuarioSelec.areaCoord);
    setSede({id:usuarioSelec.sedeIdCoord,nombre:usuarioSelec.nombreSedeCoord});
  }, [usuarioSelec]);

  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function HandleSubmit() {
    console.log("sede", sede);

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
      .then((res) => {
        setShow(false);
        setRows((rows) =>
          rows.map((row) =>
            row.idPersona === usuarioSelec.idPersona
              ? {
                  ...row,
                  nombreSedeCoord: sede.nombre,
                  paisIdCoord: pais.nombre,
                  areaCoord: area,
                  nombrePaisCoord: isCoord,
                }
              : row
          )
        );
        setOpen(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Modal onClose={() => setShow(false)} open={show}>
        <Grid sx={style} direction="columm">

          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => setIsCoord(!isCoord)}
                  checked={isCoord}
                />
              }
              label="¿Es Coordinador?"
            />
          </Grid>

          <Grid item>
            <InputLabel id="">Pais</InputLabel>
            <Select
              onChange={(e) => {console.log("E =>>>>>>>>>",e);setPais({id:e.target.value, nombre: e.target.name})}}
              defaultValue={usuarioSelec.paisIdCoord}
              sx={{ minWidth: "15rem" }}
            >
              {paises.map((pais) => (
                <MenuItem key={pais.id}  name={pais.nombre}  value={pais.id}>
                  {pais.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="">Sede</InputLabel>
            <Select
              onChange={(e) => setSede({id:e.target.value, nombre: e.target.name})}
              defaultValue={usuarioSelec.sedeIdCoord}
              sx={{ minWidth: "15rem" }}
            >
              {sedes.map((sede) => (
                <MenuItem key={sede.id} name={sede.nombre} value={sede.id}>
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
              sx={{ minWidth: "15rem" }}
            >
              {areas.map((Area) => (
                <MenuItem key={Area.id} value={Area.nombre}>
                  {Area.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {console.log("isCOORD", isCoord)}
          <Button variant="outlined" onClick={() => HandleSubmit()}>
            Guardar
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </Grid>
      </Modal>
    </div>
  );
}
