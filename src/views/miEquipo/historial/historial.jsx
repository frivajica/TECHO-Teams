import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Stack, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function EventosEquipo( {equipoId} ) {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/equipos/${equipoId}/historial`)
        .then(res => res.data)
        .then(hist => setHistorial(hist));
    }, [])

    return (
    <Stack direction="column" justifyContent="center">
        <Stack direction="row" style={{marginTop: "20px"}}>
            <h1>Historia</h1>
            <Button variant="outlined" startIcon={<ArrowBackIosIcon />} style={{marginLeft: "auto"}}>Volver</Button>
        </Stack>
        <Timeline>
            {console.log(historial)}
            {historial.map((evento, i) => (
                <TimelineItem key={i}>
                    <TimelineSeparator>
                        <TimelineDot />
                        {i<historial.length-1 ? <TimelineConnector /> : null}
                    </TimelineSeparator>
                    <TimelineContent>{evento.createdAt.slice(0,10)+" - "+evento.descripcion}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    </Stack>
    );
}