import { usuario as u } from "../../utils/mockData";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import "./Usuario.css";

export const Usuario = () => {
  return (
    <>
      <Paper sx={{ p: 2, margin: "3%", maxWidth: "90%", flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 200, height: 200 }}>
              <img className="avatar" src={u.avatar} alt="Avatar de Usuario" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <h1
                  style={{ backgroundColor: "blue" }}
                >{`${u.nombre} ${u.apellidoPaterno}`}</h1>
                <h3 style={{ backgroundColor: "gray" }}>Contenedor de roles</h3>
                <h5 variant="body2" color="text.secondary">
                  ID: 1030114
                </h5>
              </Grid>
              <Grid item>
                <h1
                  style={{ backgroundColor: "blue" }}
                >{`${u.nombre} ${u.apellidoPaterno}`}</h1>
              </Grid>
            </Grid>
            <Grid item>
              <h3 style={{ backgroundColor: "gray" }}>Contenedor de roles</h3>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {
        //avatar Usuario
        //roles
        //antigüedad
        //número de proyectos en los que ha participado
        //historia (Actividades en las que ha participado, sus fechas y sus roles en ellas) //https://actividades.techo.org/ajax/actividades/20786
      }
    </>
  );
};
