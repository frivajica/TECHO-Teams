import Skeletonn from "@mui/material/Skeleton";
import ButtonBase from "@mui/material/ButtonBase";
import React from "react";
import './TarjetaRoles.css'
export const Skeleton = () => {
  return (
    <div className="tarjeta-roles">
      <div className="rol-imagen">
				<ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
					<Skeletonn variant="rectangular" id="ripple-avatar" width={200} height={200} />
				</ButtonBase>
      </div>
        <div className="rol-opciones">
          <h3 id="modificar-rol">{<Skeletonn />}</h3>
          <h3 id="buscar-persona">{<Skeletonn />}</h3>
        </div>
    </div>
  );
}