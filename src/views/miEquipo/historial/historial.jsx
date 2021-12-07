import Timeline from '@mui/lab/Timeline';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Stack, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {chooseEventContent} from '../../../utils/historialEquipo/chooseEventContent'
import {scrollButton} from '../../../utils/historialEquipo/scrollButton'

export default function EventosEquipo( {equipoId} ) {
    const [historial, setHistorial] = useState([]);
    const [Yposition, setYposition] = useState(window.pageYOffset)
    const navigate = useNavigate();

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
            <h1  style={{marginLeft: "10px"}}>Historia</h1>
            <Button onClick={() => navigate(`/miEquipo`)} style={{marginLeft: "auto", marginRight: "10px"}} variant="outlined" startIcon={<ArrowBackIosIcon />}>Volver</Button>
        </Stack>

        <br />
        <Divider />
        <br />

        <Timeline position="alternate" style={{width:"100%"}}>
            {historial.map((evento, i) => (chooseEventContent(evento, i<historial.length-1)))}
        </Timeline>

        {(window.innerHeight <= document.body.scrollHeight/4) && scrollButton(Yposition)}

    </Stack>
    );
}