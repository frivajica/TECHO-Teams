import { useState } from "react";
import swal from "sweetalert";
import { CustomHook } from "../../hooks/CustomHook";
import { getByMail, getById } from "../../state/usuarios";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Search({setRows}) {
    const busqueda = CustomHook("");
    const [tipo, setTipo] = useState("email");
    const dispatch = useDispatch();

    const errorAlert = (
        title = "Seleccione un tipo de búsqueda",
        text = "Elija buscar por Id o Email"
      ) => {
        swal({
          title,
          text,
          button: "Aceptar",
          icon: "error",
        });
      };


    const handleSubmit = (e) => {
        e.preventDefault();
    
        tipo === "email" &&
          dispatch(getByMail({ mail: busqueda.value, errorAlert })).then(
            ({ payload }) => setRows([payload]));
        tipo === "id" &&
          dispatch(getById({ id: parseInt(busqueda.value), errorAlert })).then(
            ({ payload }) => setRows([payload]));
        tipo === "" && errorAlert();
        
      };

    return (
        <form className="searchDiv" onSubmit={handleSubmit}>
          <FormControl sx={{marginLeft: "20%", position: "flex-start"}}>
            <FormLabel>BUSCAR POR: </FormLabel>
            <RadioGroup
              row
              aria-label="tipo-de-busqueda"
              defaultValue="email"
              name="radio-buttons-group"
            >
              <FormControlLabel value={"email"} control={<Radio onClick={() => setTipo("email")} />} label="Email" />
              <FormControlLabel value={"id"} control={<Radio onClick={() => setTipo("id")} />} label="ID" />
            </RadioGroup>
          </FormControl>
          
          <div className="divSearchInput">
          <label htmlFor="selector" className="label searchInput">
              <TextField
              placeholder="Buscar"
              className="text-field"
              size="small"
              type="text"
              name="nombre"
              {...busqueda}
              required
              />
          </label>
          </div>
          <div className="buscarBtn">
          <Button
              id="ingresar"
              size="medium"
              variant="outlined"
              type="submit"
              sx={{position: "flex-end"}}
          >
              BUSCAR
          </Button>
          </div>
        </form>
    )
}