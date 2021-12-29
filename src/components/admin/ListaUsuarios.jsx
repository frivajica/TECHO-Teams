import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { ModalToggleAdmin } from "./ModalToggleAdmin"
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ModalCoord from "./ModalCoord";
import {changeIdToName} from './changeIdToName';
import loading from './loadingRows';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SecurityIcon from "@mui/icons-material/Security";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const pageSize = 5;

export default function ListaUsuarios({ setRows, rows }) {
  const [page, setPage] = React.useState(0);
  const usuario = useSelector((state) => state.usuario);
  const usrs = useSelector((state) => state.usuarios);
  const [showMakeAdmin, setShowMakeAdmin] = React.useState(false);
  const [usuarioSelec, setUsuarioSelec]= React.useState({});
  const [paises, setPaises] = React.useState([]);
  const [sedes, setSedes] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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
    let offset = (newPage + 1) * pageSize - pageSize;
    let limit = (newPage + 1) * pageSize;
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
            icon={<SecurityIcon />}
            label="Ajustes de Administrador"
            onClick={toggleAdmin(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<ManageAccountsIcon />}
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
    [toggleCoord, toggleAdmin]
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
  }, [usrs]);

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.idPersona}
        autoHeight={true}
        hideFooter
        pagesize={pageSize}
        sx={{width: "100%"}}
      />
      <div style={{marginTop:"40px"}}>
        <Button onClick={() => pageChange(page - 1)}><ChevronLeftIcon />anterior</Button>
        {" página "+(page+1)}
        <Button onClick={() => pageChange(page + 1)}>siguiente<ChevronRightIcon /></Button>
      </div>
     
      <ModalCoord
        setOpen={setOpen}
        setRows={setRows}
        usuario={usuario}
        setShow={setShow}
        show={show}
        usuarioSelec={usuarioSelec}
        paises={paises}
        sedes={sedes}
        setSedes={setSedes}
      />
      <ModalToggleAdmin 
        setShow={setShowMakeAdmin} 
        show={showMakeAdmin} 
        usuarioSelec={usuarioSelec} 
        rows={rows} 
        setRows={setRows}
      /> 

      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              autoridades de coordinador actualizadas
            </Alert>
      </Snackbar>
    </div>
  );
}
