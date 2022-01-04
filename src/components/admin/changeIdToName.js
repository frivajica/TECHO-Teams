import axios from 'axios';
export const changeIdToName = async (users, paises) => {
    const sedes = await axios.get("http://143.198.238.253:3001/api/sedes").then((res) => res.data);
    users.map((user, i) => {
        let nombrePaisCoord = "";
        let nombreSedeCoord = "";

        if (user.paisIdCoord) {
            paises.forEach((pais) => {
                if (pais.id === user.paisIdCoord) nombrePaisCoord = pais.nombre
            });
        }
        
        if (user.sedeIdCoord) {
            sedes.forEach((sedesPais) => {
                if (sedesPais.id === user.sedeIdCoord) nombreSedeCoord = sedesPais.nombre;
            });
        }
        
        return { ...user, nombrePaisCoord, nombreSedeCoord };
    });
}