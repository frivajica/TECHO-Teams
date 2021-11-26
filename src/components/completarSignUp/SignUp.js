import { React, useState } from "react";
import { CustomHook } from "../../hooks/CustomHook";
import { Container } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";

function SignUp() {
  const profesion = CustomHook("");
  const estudios = CustomHook("");
  const interes = CustomHook("");
  const [formErrors, setFormErrors] = useState({});

  const successAlert = () => {
    swal({
      title: "Muchas gracias!",
      icon: "success",
      timer: "2000",
    });
  };

  const errorAlert = () => {
    swal({
      title: "Error",
      text: "Por favor complete todos los campos",
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleFormValidation = () => {
    let formIsValid = true;

    if (!profesion.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        profesionErr: "Ingrese si es estudiante, contador, vendedor, etc.",
      });
    }

    if (!estudios.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        estudiosErr:
          "Especifique Primaria/Secundaria o Titulo universitario, etc.",
      });
    }

    if (!interes.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        interesErr: "Elija alguna opcion",
      });
    }

    return formIsValid;
  };

  const { profesionErr, estudiosErr, interesErr } = formErrors;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleFormValidation()) {
      errorAlert();
    }

    if (handleFormValidation()) {
      // axios
      //   .post('', {
      //     profesion: profesion.value,
      //     estudios: estudios.value,
      //     interes: interes.value,
      //   })
      //   .then((res) => res.data)
      //   .then(successAlert());
      successAlert();
    }
  };

  return (
    <Container>
      <div style={{ marginTop: "7%", width: "33%", marginLeft: "35%" }}>
        <div className="titlereg">Ya casi terminamos!</div>
        <div className="subtitlereg">Completa estos datos para continuar!</div>

        <form onSubmit={handleSubmit}>
          <label for="profesion" className="label">
            PROFESION
          </label>
          <input
            {...profesion}
            type="text"
            name="profesion"
            id="profesion"
            className="form-control"
          />
          {profesionErr ? (
            <div className="errorFormMsg">{profesionErr}</div>
          ) : (
            ""
          )}

          <label for="estudios" className="label">
            ESTUDIOS
          </label>
          <input
            {...estudios}
            type="text"
            name="estudios"
            id="estudios"
            className="form-control"
          />
          {estudiosErr ? <div className="errorFormMsg">{estudiosErr}</div> : ""}
          <label for="selector" className="label">
            <p>INTERES PRINCIPAL EN TECHO</p>
            <select id="selector" className="form-control" {...interes}>
              <option label=" "></option>
              <option className="option">Mentoreo</option>
              <option className="option">Comunicacion Social</option>
              <option className="option">Otra opcion</option>
            </select>
          </label>
          {interesErr ? <div className="errorFormMsg">{interesErr}</div> : ""}
          <button type="submit" className="button">
            SIGUIENTE
          </button>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
