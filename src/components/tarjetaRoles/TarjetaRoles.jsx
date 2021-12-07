import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonBase from "@mui/material/ButtonBase";
import { Autocompletar } from "../../commons/autocompletar/Autocompletar";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import { opcionesPersona,  } from "../../utils/mockData";
import useForm from "../../hooks/formState";
import TextField from "@mui/material/TextField";
import "./TarjetaRoles.css";

export const TarjetaRoles = () => {
  const { form, handleChange } = useForm();
  const handleSelect = (event) => {
    console.log(event)
    handleChange(event);
  };

  return (
    <div className="tarjeta-roles">
      <div className="rol-imagen">
        <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
          <img className="avatar" src={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt="Avatar de Usuario" />
        </ButtonBase>
      </div>
      <div className="rol-opciones">
        <FormControl id="modificar-rol" variant="standard">
          <TextField
            onChange={handleSelect}
            defaultValue={'opcionesRol[0].titulo'}
            name="rol"
            label="Rol"
            placeholder="Rol"
            variant="standard"
          />
        </FormControl>
        <div id="buscar-persona">
          <Autocompletar
            valorPred={{titulo: 'hola'}}
            opciones={opcionesPersona}
            etiqueta="Persona"
            onChange={handleSelect}
            nombre="Persona"
          />
        </div>
        <FormControlLabel
          id="checkbox-rol"
          control={<Checkbox defaultChecked={true}  onChange={handleSelect} name="necesario" />}
          label="Necesario"
        />
      </div>
      {form && (
        <ButtonBase id="save-icon">
          <SaveAsRoundedIcon color="action" />
        </ButtonBase>
      )}
    </div>
  );
};
