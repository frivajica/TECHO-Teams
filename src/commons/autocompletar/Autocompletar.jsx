import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const Autocompletar = ({ opciones, etiqueta, valorPred, onChange, nombre }) => {
  return (
    <>
      {valorPred ? (
        <Autocomplete
          size="small"
          options={opciones}
          getOptionLabel={(option) => option.titulo}
          defaultValue={valorPred}
          renderInput={(params) => (
            <TextField {...params} name={nombre} onSelect={(onChange)} variant="standard" label={etiqueta} />
          )}
        />
      ) : (
        <Autocomplete
          size="small"
          options={opciones}
          getOptionLabel={(option) => option.titulo}
          renderInput={(params) => (
            <TextField {...params} name={nombre} onSelect={onChange} variant="standard" label={etiqueta} />
          )}
        />
      )}
    </>
  );
};