import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getById } from "../../state/usuarios";
import Button from "@mui/material/Button";
import "./ConvertirAdminBtn.css";
import axios from "axios";
import { successAlert, errorAlert } from "../../utils/alerts"

export const ConvertirAdminBtn = ({ user, setRows }) => {
  const dispatch = useDispatch();
  const usr = useSelector(({ usuarios }) => usuarios);
  const yo = useSelector(({ usuario }) => usuario);
  const target = user || usr;
  const [style, setStyle] = useState(target?.isAdmin);
  const toogleAdminStatus = async () => {
    try {
      await axios({
        method: "PUT",
        headers: { idPersona: yo.idPersona },
        url: `http://localhost:3001/api/usuarios/${target.idPersona}/toggleAdmin`,
      });
      dispatch(getById({ id: target.idPersona }));
      setRows(currentRows => currentRows.map(row => row.idPersona === target.idPersona ? {...row,  isAdmin: !row.isAdmin} : row))
      successAlert("Hecho!", 
      "El status de administrador de este usuario fue modificado con éxito!"
      );
      setStyle(!style);
    } catch {
      errorAlert("Oops!", "Algo malió sal].");
    }
  };

  return (
    <Button
      id={style ? "boton-es-admin" : "boton-no-es-admin"}
      onClick={toogleAdminStatus}
      variant="contained"
      endIcon={<PeopleAltIcon />}
    >
      {style ? "Quitar permisos de Admin" : "Hacer Admin"}
    </Button>
  );
};
