export const handlePersonas = (usrs) => {
  const personas = [];
  const arregloPersonas = usrs.filter((item, index)=>{
    return usrs.indexOf(item) === index;
  });

  arregloPersonas.forEach((e) => {
    personas.push({ id: e.usuarioIdPersona, nombre: e.nombreApellido });
  });

  return personas
};