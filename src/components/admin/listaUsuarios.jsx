import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ModalAdmin from "./ModalAdmin";
export default function UsersForAdmin({ setRows, rows }) {
  const [page, setPage] = React.useState(0);
  const usuario = useSelector((state) => state.usuario);
  const [show, setShow] = React.useState(false);
  const[usarioSelec,setUsarioSelec]= React.useState({})

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const toggleCoord = React.useCallback(
    (usuario) => () => {
      setUsarioSelec(usuario)
      setShow(true)
      setRows((rows) =>
        rows.map((row) =>
          row.idPersona === usuario.idPersona ? { ...row, isCoord: !row.is } : row
        )
      );
    },
    []
  );

  const pageChange = async (newPage) => {
    setRows([{ idPersona: 0, nombres: "cargando" }]);
    if (newPage < 0) return;
    let offset = (newPage + 1) * 2 - 2;
    let limit = (newPage + 1) * 2;
    axios
      .get("http://localhost:3001/api/usuarios", {
        headers: { authorization: usuario.token, offset, limit },
      })
      .then((res) => res.data)
      .then((users) => {
        setRows(users);
        setPage(newPage);
      })
      .catch((err) => console.error(err));
  };

  const columns = React.useMemo(
    () => [
      { field: "nombres", type: "string", width: 300 },
      { field: "edad", type: "number" },
      { field: "mail", type: "email", width: 300 },
      { field: "isAdmin", type: "boolean", width: 120 },
      { field: "isCoordinador", type: "boolean", width: 120 },
      { field: "areaCoord", type: "string", width: 120 },
      { field: "paisIdCoord", type: "number", width: 120 },
      { field: "sedeIdCoord", type: "number", width: 120 },
      {
        field: "acciones",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Toggle Admin"
            showInMenu
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Hacer Coordinador"
            onClick={toggleCoord(params.row)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleCoord]
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/usuarios", {
        headers: { authorization: usuario.token, offset: 0, limit: 2 },
      })
      .then((res) => res.data)
      .then((users) => setRows(users))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.idPersona}
        autoHeight={true}
        hideFooter
        pagesize={2}
      />
      <ModalAdmin setShow={setShow} show={show} usarioSelec={usarioSelec} /> 
      <Button onClick={() => pageChange(page - 1)}>anterior</Button>
      <Button onClick={() => pageChange(page + 1)}>siguiente</Button>
    </div>
  );
}