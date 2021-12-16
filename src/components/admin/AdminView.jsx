import { useState } from "react";

import ListaUsuarios from "./ListaUsuarios"
import loading from './loadingRows';
import Search from './Search'

function AdminView() {
  const [rows, setRows] = useState(loading)

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <Search setRows={setRows} />
      <div style={{marginTop:200,width:"80%"}}>
        <ListaUsuarios setRows={setRows} rows={rows} />
      </div>
     
    </div>
  );
}

export default AdminView;
