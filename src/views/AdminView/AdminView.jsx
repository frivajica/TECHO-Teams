import { useState } from "react";

import ListaUsuarios from "../../components/admin/ListaUsuarios"
import loading from '../../components/admin/loadingRows';
import Search from '../../components/admin/Search'
import CrearRol from '../../components/crearRol/CrearRol';
import CrearArea from '../../components/crearArea/CrearArea';

function AdminView() {
  const [rows, setRows] = useState(loading)

  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Search setRows={setRows} />
        <div style={{marginTop:200,width:"80%"}}>
          <ListaUsuarios setRows={setRows} rows={rows} />
        </div>
      </div>
      <div style={{flexPosition: "flex-start"}}>
        <CrearRol />
        <CrearArea />
      </div>
    </div>
  );
}

export default AdminView;
