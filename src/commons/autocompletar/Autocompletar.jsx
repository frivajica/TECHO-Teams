import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const Autocompletar = ({ opciones, etiqueta, valorPred, onSelect, nombre }) => {
  
  return (
    <>
      {valorPred ? (
        <Autocomplete
          size="small"
          options={opciones}
          getOptionLabel={(option) => option}
          defaultValue={valorPred}
          renderInput={(params) => (
            <TextField {...params} name={nombre} onSelect={(onSelect)} variant="standard" label={etiqueta} />
          )}
        />
      ) : (
        <Autocomplete
          size="small"
          options={opciones}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} name={nombre} onSelect={onSelect} variant="standard" label={etiqueta} />
          )}
        />
      )}
    </>
  );
};
