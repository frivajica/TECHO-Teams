import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import React, { useState, useEffect } from "react";
import axios from 'axios';
//import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';


export default function UsersForAdmin() {
    const [rows, setRows] = React.useState([]);
  
    const deleteUser = React.useCallback(
      (id) => () => {
        axios.update('/api/editarUsuario/:id')
        .then(setTimeout(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        }))
        .catch((err)=>console.log(err))
        
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
        axios.get('/api/usuarios')
        .then()
    }, [])
  
    const columns = React.useMemo(
      () => [
        { field: 'name', type: 'string' },
        { field: 'age', type: 'number' },
        { field: 'dateCreated', type: 'date', width: 130 },
        { field: 'lastLogin', type: 'dateTime', width: 180 },
        { field: 'isAdmin', type: 'boolean', width: 120 },
        {
          field: 'country',
          type: 'singleSelect',
          width: 120,
          valueOptions: [
            'Bulgaria',
            'Netherlands',
            'France',
            'United Kingdom',
            'Spain',
            'Brazil',
          ],
        },
        {
          field: 'actions',
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
        <DataGrid columns={columns} rows={rows} />
      </div>
    );
  }
