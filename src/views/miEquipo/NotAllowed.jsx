import { Typography } from "@mui/material";

const NotAllowed = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 style={{color: "#1976d2", marginTop: "100px", marginBottom: "10px"}} className="texto-portada">Oops! No tienes permiso para ver este equipo.</h1>
            <p style={{textAlign: 'center'}}>solo los coordinadores adecuados o los integrantes pueden ver el equipo.</p>
        </div>
    )
}

export default NotAllowed;