import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import {HistorialEquipos} from "../historialEquipos/HistorialEquipos"
import { useSelector } from "react-redux";

export default function TabEquipoOActividades() {
  const [value, setValue] = React.useState('1');
  const historialDeUsuario = useSelector((state) => state.historialDeUsuario);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' ,}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:7,justifyContent:"center",display:"flex"}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab  icon={<GroupsIcon />} label="Grupos" value="1" />
            <Tab  icon={<VolunteerActivismIcon />}label="Actividades" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><HistorialEquipos historialDeUsuario={historialDeUsuario}/></TabPanel>
      </TabContext>
    </Box>
  );
}