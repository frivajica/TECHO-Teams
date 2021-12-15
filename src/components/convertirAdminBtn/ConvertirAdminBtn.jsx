import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getById } from "../../state/usuarios";
import Button from "@mui/material/Button";
import "./ConvertirAdminBtn.css";
import axios from "axios";

export const ConvertirAdminBtn = ({ user }) => {
  const dispatch = useDispatch();
  const usr = useSelector(({ usuarios }) => usuarios);
  const yo = useSelector(({ usuario }) => usuario);
  const target = user || usr;
  const [style, setStyle] = useState(target?.isAdmin);
  const toogleAdminStatus = async () => {
    await axios({
      method: "PUT",
      headers: { idPersona: yo.idPersona },
      url: `http://localhost:3001/api/usuarios/${target.idPersona}/toggleAdmin`,
    });
    dispatch(getById({ id: target.idPersona }));
    setStyle(!style);
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
