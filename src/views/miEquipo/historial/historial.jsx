import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Stack, Button, Divider, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function EventosEquipo( {equipoId} ) {
    const [historial, setHistorial] = useState([]);
    const [Yposition, setYposition] = useState(window.pageYOffset)
    const navigate = useNavigate();
    const chooseEventColor = (tipo) => {
        switch (tipo) {
            case -1: return "error"
            case 0: return "success"
            case 1: return "primary"
            case 2: return "secondary"
        }
    }
    const scrollButton = () => {
        if ( Yposition < document.body.scrollHeight/2) {
            return (
            <button onClick={() => window.scroll(0,document.body.scrollHeight )}>
                <Box
                    position="fixed"
                    bottom="80px"
                    left="20px"
                    zIndex={3}
                    style={{width:"30px", height:"30px", marginLeft: "auto"}}
                >
                    <KeyboardArrowDownIcon color="primary" sx={{fontSize: 100}} />
                </Box>
            </button>
            )
        }
        else return (
            <button onClick={() => window.scroll(0,0 )}>
                <Box
                    position="fixed"
                    bottom="80px"
                    left="20px"
                    zIndex={3}
                    style={{width:"30px", height:"30px", marginLeft: "auto"}}
                >
                    <KeyboardArrowUpIcon color="primary" sx={{fontSize: 100}} />
                </Box>
            </button>
            )
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/equipos/${equipoId}/historial`)
        .then(res => res.data)
        .then(hist => setHistorial(hist.reverse()));
        window.addEventListener("scroll", () => setYposition(window.pageYOffset), { passive: true });
    }, [])

    return (
    <Stack>
        
        <br />
        <Stack direction="row" justifyContent="flex-start" alignItems="center" style={{width:"100%"}}>
            <Button onClick={() => navigate(`/miEquipo`)} variant="outlined" startIcon={<ArrowBackIosIcon />} style={{marginLeft: "10px"}}>Volver</Button>
            <h1 style={{marginLeft: "auto", marginRight: "10px"}}>Historia</h1>
        </Stack>

        <br />
        <Divider />
        <br />

        <Timeline position="alternate" style={{width:"100%"}}>
            {console.log(historial)}
            {historial.map((evento, i) => (
                <TimelineItem key={i}>
                    <TimelineOppositeContent color="text.secondary">
                        {evento.createdAt.slice(0,10)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color={chooseEventColor(evento.tipo)}/>
                        {i<historial.length-1 ? <TimelineConnector /> : null}
                    </TimelineSeparator>
                    <TimelineContent>{evento.descripcion}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>

        {(window.innerHeight <= document.body.scrollHeight/4) && scrollButton()}

    </Stack>
    );
}