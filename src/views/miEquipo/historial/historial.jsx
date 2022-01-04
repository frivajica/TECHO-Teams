import Timeline from '@mui/lab/Timeline';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Stack, Button, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ChooseEventContent } from '../../../utils/historialEquipo/chooseEventContent'
import { scrollButton } from '../../../utils/historialEquipo/scrollButton'
import CircularProgress from '@mui/material/CircularProgress';

export default function EventosEquipo() {
    const { equipoId } = useParams()
    const [historial, setHistorial] = useState([]);
    const [show, setShow] = useState(false);
    const [Yposition, setYposition] = useState(window.pageYOffset)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://143.198.238.253:3001/api/equipos/${equipoId}/historial`)
        .then(res => res.data)
        .then(hist => setHistorial(hist.reverse()))
        .then(() => setShow(true));
        window.addEventListener("scroll", () => setYposition(window.pageYOffset), { passive: true });
    }, [equipoId])

    return (
    <Stack>
        
        <br />
        <Stack direction="row" justifyContent="flex-start" alignItems="center" style={{width:"100%"}}>
            <h1  style={{marginLeft: "10px"}}>Historia</h1>
            <Button onClick={() => navigate(-1)} style={{marginLeft: "auto", marginRight: "10px"}} variant="outlined" startIcon={<ArrowBackIosIcon />}>Volver</Button>
        </Stack>

        <br />
            <Divider />
        <br />
        {show?
            (<Timeline position="alternate" style={{width:"100%"}}>
                {historial.map((evento, i) => <ChooseEventContent evento={evento} isLast={i<historial.length-1} i={i} />)}
            </Timeline>)
            :
            (<Stack alignItems="center">
                <CircularProgress />
            </Stack>)
        }
        {(window.innerHeight <= document.body.scrollHeight/4) && scrollButton(Yposition)}

    </Stack>
    );
}