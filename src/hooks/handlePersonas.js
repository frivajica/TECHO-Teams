export const handlePersonas = (users) => {
  const personas = [];
  const arregloPersonas = users.filter((item, index)=>{
    return users.indexOf(item) === index;
  });

  arregloPersonas.forEach((e) => {
    personas.push({ id: e.usuarioIdPersona, nombre: e.nombreApellido });
  });

  return personas
};