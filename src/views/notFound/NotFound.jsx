import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="divH1notFound">
        <h1 className="h1NotFound">Oops! Vuelve y busca otra ruta</h1>
      </div>
      <div className="divH1notFound">
        <img
          src="	https://actividades.techo.org/img/404.png"
          alt="404"
          style={{ width: "revert" }}
        />
      </div>
      <div className="divH1notFound">
        <Button variant="contained" onClick={() => navigate(`/`)}>
          VOLVER AL HOME
        </Button>
      </div>
    </div>
  );
}
