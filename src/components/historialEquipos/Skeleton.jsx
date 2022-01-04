import Skeletonn from "@mui/material/Skeleton";
import React from "react";
import "./HistorialEquipos.css";
export default function Skeleton({ theme }) {
  return (
    <div>
      <div className="cajaSkeleton">
        <div className="tituloSkeleton">
          <Skeletonn />
        </div>
        <div className="subTituloSkeleton">
          <Skeletonn  />
        </div>
        <div className="rolSkeleton" >
          <Skeletonn  />
        </div>
      </div>
    </div>
  );
}