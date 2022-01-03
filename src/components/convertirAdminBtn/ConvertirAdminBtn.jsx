import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import { getById } from "../../state/usuarios";
import Button from "@mui/material/Button";
import "./ConvertirAdminBtn.css";
import axios from "axios";
import { successAlert, errorAlert } from "../../utils/alerts"

export const ConvertirAdminBtn = ({ user }) => {
  const dispatch = useDispatch();
  const usr = useSelector(({ usuarios }) => usuarios);
  const yo = useSelector(({ usuario }) => usuario);
  const target = user || usr;
  const toogleAdminStatus = async () => {
    try {
      await axios({
        method: "PUT",
        headers: { idPersona: yo.idPersona },
        url: `http://143.198.238.253:3001/api/usuarios/${target.idPersona}/toggleAdmin`,
      });
      dispatch(getById({ id: target.idPersona }));
      successAlert("Hecho!", 
      "El status de administrador de este usuario fue modificado con éxito!"
      );
    } catch (err) {
      errorAlert("Oops!", "Algo malió sal.");
    }
  };

  return (
    <Button
      id={usr?.isAdmin ? "boton-es-admin" : "boton-no-es-admin"}
      onClick={toogleAdminStatus}
      variant="contained"
      endIcon={<PeopleAltIcon />}
    >
      {usr?.isAdmin ? "Quitar permisos de Admin" : "Hacer Admin"}
    </Button>
  );
};