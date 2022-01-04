import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineItem from '@mui/lab/TimelineItem';
import useMediaQuery from '@mui/material/useMediaQuery';

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

export function ChooseEventContent({evento, isLast, i}) {
    const fontsize = useMediaQuery('(min-width:600px)')? "1em" : "0.8em";
    let color = "text.secondary", icon = <></>, descripcion = "éste evento no pudo procesarse"
    switch (evento.tipo) {
        case -2: {
            color="error"
            icon=<DoDisturbIcon />
            descripcion=`${evento.nombreCoord} deshabilitó el equipo :(`
            break;
        }
        case -1: {
            color="error"
            icon=<PersonRemoveIcon />
            descripcion=`${evento.nombreCoord} eliminó a ${evento.nombreUsuario} del equipo`
            break;
        }
        case 0: {
            color="success"
            icon=<GroupsIcon /> 
            descripcion=<>{evento.nombreCoord} creó el equipo <span style={{color: "#1976D2"}}>{evento.nombreEquipo}</span></>
            break;
        }
        case 1: {
            color="primary" 
            icon=<PersonAddAltRoundedIcon /> 
            descripcion=
                evento.nombreCoord ?
                (`${evento.nombreCoord} agregó a ${evento.nombreUsuario} al equipo`)
                :
                (`${evento.nombreUsuario} se unió al equipo`)
            break;
        }
        case 2: {
            color="secondary" 
            icon=<ManageAccountsIcon /> 
            descripcion=
                evento.nombreCoord ?
                (<>{evento.nombreCoord} cambió el rol de {evento.nombreUsuario} a <span style={{color: "#1976D2"}}>{evento.nombreRol}</span></>)
                :
                (<>{evento.nombreUsuario} asumió el rol <span style={{color: "#1976D2"}}>{evento.nombreRol}</span></>)
            break;
        }
        case 3: {
            color="primary" 
            icon=<GroupsIcon /> 
            descripcion="El equipo está habilitado nuevamente :)"
            break;
        }
        default: ;
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