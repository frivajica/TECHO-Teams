import axios from 'axios';
export const changeIdToName = async (users, paises) => {
    const sedes = await axios.get("http://localhost:3001/api/sedes").then((res) => res.data);
    users.map((user, i) => {
        let nombrePaisCoord = "";
        let nombreSedeCoord = "";

        if (user.paisIdCoord) {
            paises.map((pais) => {
                if (pais.id === user.paisIdCoord) nombrePaisCoord = pais.nombre
            });
        }
        
        if (user.sedeIdCoord) {
            sedes.map((sedesPais) => {
                if (sedesPais.id === user.sedeIdCoord) nombreSedeCoord = sedesPais.nombre;
            });
        }
        
        users[i] = { ...user, nombrePaisCoord, nombreSedeCoord };
    });
}