import { useState } from "react";

import ListaUsuarios from "../../components/admin/ListaUsuarios"
import loading from '../../components/admin/loadingRows';
import Search from '../../components/admin/Search'

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
