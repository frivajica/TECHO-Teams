import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const Autocompletar = ({ disabled, opciones, etiqueta, onChange, defVal, name, freeSolo }) => {
  return (
    <>
        <Autocomplete
          size="small"
          freeSolo={freeSolo}
          options={opciones}
          disabled={disabled}
          getOptionLabel={(option) => option?.rol || option?.nombre}
          defaultValue={{nombre: defVal || ''}}
          onChange={(e,val) => onChange(e, val, name)}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label={etiqueta} />
          )}
        />
    </>
  );
};