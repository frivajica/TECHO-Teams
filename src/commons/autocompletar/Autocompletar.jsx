import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const Autocompletar = ({ opciones, etiqueta, onChange, defVal, name }) => {
  return (
    <>
        <Autocomplete
          size="small"
          options={opciones}
          getOptionLabel={(option) => option.nombre}
          defaultValue={{nombre: defVal || ''}}
          renderInput={(params) => (
            <TextField {...params} name={name} onSelect={(onChange)} variant="standard" label={etiqueta} />
          )}
        />
    </>
  );
};