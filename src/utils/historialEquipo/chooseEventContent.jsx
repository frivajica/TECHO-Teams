import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineItem from '@mui/lab/TimelineItem';
import Typography from '@mui/material/Typography';

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const chooseEventContent = (evento, isLast) => {
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
        <TimelineItem justifyContent="center">
            <TimelineOppositeContent color="text.secondary" sx={{ py: '20px', px: 2 }}>
                {evento.createdAt.slice(0,10)}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot color={color} variant="outlined">
                    {icon}
                </TimelineDot>
                {isLast ? <TimelineConnector sx={{minHeight: '50px'}}/> : null}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2 }}>
                <Typography>
                    {descripcion}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    )
}