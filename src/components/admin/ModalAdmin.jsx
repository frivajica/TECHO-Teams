import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';

export default function ModalAdmin({ show,usarioSelec,setShow }) {
  const [open, setOpen] = React.useState(true);
  const [paises, setPaises] = useState([]);
  const [sedes, setSedes] = useState({});
  const [pais, setPais]= useState(usarioSelec.paisIdCoord);
  const checkbox= usarioSelec.isCoordinador ?<Checkbox checked  /> : <Checkbox />
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
            (sedesPais) => sedesPais.id_pais.toString() === pais
          )
        )
      )
      .catch((err) => console.log(err));
  }, [pais]);

  return (
    <div>
      <Modal  onClose={()=> setShow(false)} open={show}>
        <Grid sx={style} direction="columm">

          <Grid item>
            <FormControlLabel control={checkbox} label="¿Es Coordinador?" />
          </Grid>

          <Grid item>
            <InputLabel id="">Pais</InputLabel>
            <Select value={pais} sx={{ minWidth: "15rem" }} >
            {paises.map((pais) => (
                  <MenuItem key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </MenuItem>
                ))}
            </Select>
          </Grid>

        </Grid>
      </Modal>
    </div>
  );
}
