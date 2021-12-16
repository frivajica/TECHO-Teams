import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import { useEffect } from "react";
import axios from "axios";
import { ModalToggleAdmin } from "./ModalToggleAdmin"
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ModalCoord from "./ModalCoord";
import {changeIdToName} from './changeIdToName';
import loading from './loadingRows';
const pageSize = 2;

export default function ListaUsuarios({ setRows, rows }) {
  const [page, setPage] = React.useState(0);
  const usuario = useSelector((state) => state.usuario);
  const [show, setShow] = React.useState(false);
  const [showMakeAdmin, setShowMakeAdmin] = React.useState(false);
  const [usuarioSelec, setUsuarioSelec]= React.useState({});
  const [paises, setPaises] = React.useState([]);
  const [sedes, setSedes] = React.useState([]);
   
  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    }, []
  );

  const toggleCoord = React.useCallback(
    (usuario) => () => {
      setUsuarioSelec(usuario);
      setShow(true);
    },
    []
  );

  const toggleAdmin = React.useCallback(
    (usuario) => () => {
      setUsuarioSelec(usuario)
      setShowMakeAdmin(true)
    },
    []
  );

  const pageChange = async (newPage) => {
    if (newPage < 0) return;
    setPage(newPage);
    setRows(loading);
    let offset = (newPage + 1) * 2 - 2;
    let limit = (newPage + 1) * 2;
    axios
      .get("http://localhost:3001/api/usuarios", {
        headers: { authorization: usuario.token, offset, limit },
      })
      .then((res) => res.data)
      .then(async (users) => {
        await changeIdToName(users, paises)
        setRows(users);
      })
      .catch((err) => console.error(err));
  };

  const columns = React.useMemo(
    () => [
      {
        field: "acciones",
        headerName:"Opciones",
        type: "actions",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Ajustes de Administrador"
            onClick={toggleAdmin(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Ajustes de Coordinador"
            onClick={toggleCoord(params.row)}
            showInMenu
          />,
        ],
      },
      { field: "nombres", type: "string", width: 200 },
      { field: "mail", type: "email", width: 300 },
      { field: "isAdmin",headerName:"Admin", type: "boolean", width: 120 },
      { field: "isCoordinador", headerName: "Coordinador", type: "boolean", width: 120 },
      { field: "areaCoord", headerName:"Área de Coordinación",type: "string", width: 120 },
      { field: "nombrePaisCoord",headerName:"País de Coordinación", type: "string", width: 120 },
      { field: "nombreSedeCoord",headerName:"Sede de Coordinación", type: "string", width: 120 }
    ],
    [deleteUser, toggleCoord, toggleAdmin]
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/regiones/paises")
      .then((res) => {
        setPaises(res.data);
        return res.data;
      })
      .then((paises) => {
        axios
          .get("http://localhost:3001/api/usuarios", {
            headers: { authorization: usuario.token, offset: page * pageSize, limit: page * pageSize + pageSize  },
          })
          .then((res) => res.data)
          .then(async (users) => {
            await changeIdToName(users, paises)
            setRows(users)
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Button onClick={() => pageChange(page - 1)}>anterior</Button>
      {page+1}
      <Button onClick={() => pageChange(page + 1)}>siguiente</Button>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.idPersona}
        autoHeight={true}
        hideFooter
        pagesize={pageSize}
      />
     
      <ModalCoord
        setRows={setRows}
        usuario={usuario}
        setShow={setShow}
        show={show}
        usuarioSelec={usuarioSelec}
        paises={paises}
        sedes={sedes}
        setSedes={setSedes}
      />
      <ModalToggleAdmin setShow={setShowMakeAdmin} show={showMakeAdmin} usuarioSelec={usuarioSelec} /> 
    </div>
  );
}
