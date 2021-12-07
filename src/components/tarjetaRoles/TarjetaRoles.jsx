import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { Autocompletar } from "../../commons/autocompletar/Autocompletar";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import  useForm  from "../../hooks/formState";
import "./TarjetaRoles.css";
const imagen = "https://imco.org.mx/wp-content/uploads/2020/08/test-3.png";
const values = ["hola", "como", "estas"];
const predeterminado = "hola";

export const TarjetaRoles = () => {
	const { form, handleChange } = useForm();
  const [roles, setRoles] = useState("");
  const [saveBtn, setSaveBtn] = useState(false);
  const handleSelect = (event) => {		
    handleChange(event);
		console.log(form)
  };

  return (
    <div className="tarjeta-roles">
      <div className="rol-imagen">
        <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
          <img className="avatar" src={imagen} alt="Avatar de Usuario" />
        </ButtonBase>
      </div>
      <div className="rol-opciones">
        <FormControl id="modificar-rol" variant="standard">
          <Autocompletar
            opciones={values}
            etiqueta="Rol"
            onSelect={handleSelect}
            valorPred={predeterminado}
            nombre="rol"
          />
        </FormControl>
        <div id="buscar-persona">
          <Autocompletar
            opciones={values}
            etiqueta="Persona"
            onSelect={handleSelect}
            nombre="Persona"
          />
        </div>
        <FormControlLabel
          id="checkbox-rol"
          control={<Checkbox />}
          label="Necesario"
        />
      </div>
      {saveBtn && (
        <ButtonBase id="save-icon">
          <SaveAsRoundedIcon color="action" />
        </ButtonBase>
      )}
    </div>
  );
};
