import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import { getById } from "../../state/usuarios";
import getToken from "../../utils/getToken";
import Button from "@mui/material/Button";
import axios from "axios";

export const ConvertirAdminBtn = () => {
  const usr = useSelector(({ usuarios }) => usuarios);
  const yo = useSelector(({ usuario }) => usuario);
	console.log('%cMyProject%cline:10%cusr', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(222, 125, 44);padding:3px;border-radius:2px', usr)
  const dispatch = useDispatch();
  const toogleAdminStatus = async () => {
    await axios({
			method: 'PUT',
			headers: { idPersona: yo.idPersona },
			url: `http://localhost:3001/api/usuarios/${usr.idPersona}/toggleAdmin`,
		});
    dispatch(getById({id: usr.idPersona}));
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
