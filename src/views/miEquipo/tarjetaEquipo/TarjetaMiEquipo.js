import React from "react";

function TarjetaMiEquipo() {
  return (
    <div className="avatar-usuario">
      <ButtonBase sx={{ width: 200, height: 200 }} id="ripple-avatar">
        <img
          className="avatar"
          src={!usuario.imagen ? u.avatar : usuario.imagen}
          alt="Avatar de Usuario"
        />
      </ButtonBase>
    </div>
  );
}

export default TarjetaMiEquipo;
