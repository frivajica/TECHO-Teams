import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const Autocompletar = ({ opciones, etiqueta, onChange, defVal, name, freeSolo }) => {
  return (
    <>
        <Autocomplete
          size="small"
          freeSolo={freeSolo}
          options={opciones}
          getOptionLabel={(option) => option?.rol || option?.nombre}
          defaultValue={{nombre: defVal || ''}}
          renderInput={(params) => (
            <TextField {...params} name={name} onBlur={(onChange)} variant="standard" label={etiqueta} />
          )}
        />
    </>
  );
};