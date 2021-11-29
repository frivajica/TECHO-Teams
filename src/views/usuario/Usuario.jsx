import { usuario as u } from "../../utils/mockData";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import "./Usuario.css";
import Divider from "@mui/material/Divider";

export const Usuario = () => {
  return (
    <div className="contenedor">
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
                <h1>{`${u.nombres} ${u.apellidoPaterno}`}</h1>
                <h3>Contenedor de roles</h3>
              </Grid>
            </Grid>
            <Grid item>
              <h4>Antigüedaddddddd</h4>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Divider variant="middle" className="divisor" />

      <p class="numeroProyectos">
        Número de proyectos en los que ha participado: No.
      </p>

      <Divider variant="middle" className="divisor" />

      {
        //historia (Actividades en las que ha participado, sus fechas y sus roles en ellas) //https://actividades.techo.org/ajax/actividades/20786
      }
    </div>
  );
};
