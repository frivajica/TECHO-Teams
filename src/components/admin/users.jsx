import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
//import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';


export default function UsersForAdmin() {
    const [rows, setRows] = React.useState([]);
    const usuario = useSelector(state => state.usuario)
  
    const deleteUser = React.useCallback(
      (id) => () => {
        setTimeout(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        });
      },
      [],
    );
  
    const toggleAdmin = React.useCallback(
      (id) => () => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
          ),
        );
      },
      [],
    );

    useEffect(() => {
        axios.get('http://localhost:3001/api/usuarios', {headers: {authorization: usuario.token, limit: 3, offset: 0}})
        .then(res => res.data)
        .then(users => setRows(users))
        .catch(err => console.error(err))
    }, [])

    const pageChange = (newPage) => {
        axios.get('http://localhost:3001/api/usuarios', {headers: {authorization: usuario.token, limit: (newPage*2)+2, offset: newPage*2}})
        .then(res => res.data)
        .then(users => setRows(users))
        .catch(err => console.error(err))
    }
  
    const columns = React.useMemo(
      () => [
        { field: 'nombres', type: 'string' },
        { field: 'edad', type: 'number' },
        { field: 'mail', type: 'email'},
        { field: 'isAdmin', type: 'boolean', width: 120 },
        {
          field: 'acciones',
          type: 'actions',
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
              onClick={toggleAdmin(params.id)}
              showInMenu
            />,
          ],
        },
      ],
      [deleteUser, toggleAdmin],
    );
  
    return (
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid 
            columns={columns} 
            rows={rows} 
            getRowId={(row) => row.idPersona} 
            pageSize="2"
            />
      </div>
    );
  }