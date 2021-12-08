import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineItem from '@mui/lab/TimelineItem';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export function ChooseEventContent({evento, isLast, i}) {
    const fontsize = useMediaQuery('(min-width:600px)')? "1em" : "0.8em";
    let color = "text.secondary", icon = <></>, descripcion = "éste evento no pudo procesarse"
    switch (evento.tipo) {
        case -2: {
            color="error"
            icon=<DoDisturbIcon />
            descripcion="El equipo fue deshabilitado :("
            break;
        }
        case -1: {
            color="error"
            icon=<PersonRemoveIcon />
            descripcion=`${evento.nombreUsuario} abandonó el equipo`
            break;
        }
        case 0: {
            color="success"
            icon=<GroupsIcon /> 
            descripcion=`Se creó el equipo ${evento.nombreEquipo}`
            break;
        }
        case 1: {
            color="primary" 
            icon=<PersonAddAltRoundedIcon /> 
            descripcion=`${evento.nombreUsuario} se unió al equipo`
            break;
        }
        case 2: {
            color="secondary" 
            icon=<ManageAccountsIcon /> 
            descripcion=(<>{evento.nombreUsuario} cambió su rol a <span style={{color: "#1976D2"}}>{evento.nombreRol}</span></>)
            break;
        }
    }

    return (
        <TimelineItem key={i}>
            <TimelineOppositeContent color="text.secondary" sx={{ py: '20px', fontSize: fontsize }}>
                {evento.createdAt.slice(8,10)+" / "+evento.createdAt.slice(5,7)+" / "+evento.createdAt.slice(0,4)}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot color={color} variant="outlined">
                    {icon}
                </TimelineDot>
                {isLast ? <TimelineConnector sx={{minHeight: '50px'}}/> : null}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', fontSize: fontsize }}>
                {descripcion}
            </TimelineContent>
        </TimelineItem>
    )
}