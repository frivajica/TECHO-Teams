const db = require("../config/database");
const { Equipo, Usuario, Role, Area } = require("../models");

const equipos = [
  {
    nombre: "Detección y Asignación - Rosario",
    cantMiembros: 7,
    activo: true,
    area: "Voluntariado",
    categoria: "Territorio",
    paisId: 13,
    sedeId: 10,
    territorioId: 598,
    detalles:
      "Todos los fines de semanas recorremos el barrio Puertas Amarrillas de Rosario para evaluar la construcción de viviendas",
    img: "https://images.lavoz.com.ar/resizer/rsDNWT8FMQ0yK2yIjgTiu8MyeNw=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/BY36LF72YVA6HK6O36LXISBLGQ.jpg",
  },
  {
    nombre: "Comedor Infantil - La Plata",
    cantMiembros: 5,
    activo: true,
    area: "Gestion comunitaria",
    categoria: "Territorio",
    paisId: 13,
    sedeId: 6,
    territorioId: 25,
    detalles:
      "Este equipo trabaja en el barrio La Ilusión de La Plata desarrollando un comedor infantil para más de 50 niñxs. Trabajamos con la comunidad desde 2014.",
    img: "https://www.expoknews.com/wp-content/uploads/2018/01/DSC_0325-1024x683.jpg",
  },
  {
    nombre: "Coordinación general de construcciones - GBA",
    cantMiembros: 4,
    activo: true,
    area: "Vivienda y Habitat",
    categoria: "Oficina",
    paisId: 13,
    sedeId: 2,
    territorioId: null, //no tiene territorio especifico
    detalles:
      "Nos encargamos de la organización y planificación de las construcciones que Techo lleva a cabo en el Gran Buenos Aires.",
    img: "https://www.bbva.com/wp-content/uploads/2016/06/Voluntariado_BBVAPY_7-1024x768.jpg",
  },
  {
    nombre: "Reparación de veredas - Nueva Córdoba",
    cantMiembros: 6,
    activo: true,
    area: "Vivienda y Habitat",
    categoria: "Territorio",
    paisId: 13,
    sedeId: 8,
    territorioId: 663,
    detalles:
      "Nuestro equipo se encarga de la reparación y construcción de nuevas veredas en todo el barrio de Nueva Córdoba gracias a los aportes obtenidos en la colecta del 2015.",
    img: "https://noticiasdevillalaangostura.com/wp-content/uploads/2020/10/Asfalto-21.10-1-e1603293272248.jpg",
  },
  {
    nombre: "Coordinación Colecta 2018",
    cantMiembros: 4,
    activo: true,
    area: "Desarrollo de Fondos",
    categoria: "Oficina",
    paisId: 13,
    sedeId: 1,
    territorioId: null,
    detalles:
      "Nos encargamos de la coordinación general de la colecta 2018 para Argentina.",
    img: "https://lh3.googleusercontent.com/proxy/rEA3Gvovw0LpYH-J_1XiIC3yyRGaLtUlrQ3xsTxkDhVnOGI7uAjQNmFxZNNbJgwZp4w8fIu5U3WfeS8fpvOLaByrcZ0CHLa92jLF4lXtgn-nLROGUtwsPBFSUA",
  },
  {
    nombre: "Apoyo Escolar - Zárate",
    cantMiembros: 5,
    activo: true,
    area: "Voluntariado",
    categoria: "Territorio",
    paisId: 13,
    sedeId: 3,
    territorioId: 52,
    detalles:
      "Somos un equipo que se encarga de brindar apoyo escolar para los niños y niñas de los barrios de Zárate en los que TECHO está presente.",
    img: "http://www.columbia.edu.py/images/contenido/ID1351-I1-20190802-5d44f9b713eb4.jpg",
  },
];

const personas = [
  {
    idPersona: 791718,
    isAdmin: true,
    profesion: "Psicologa",
    estudios: "Psicologia UBA",
    intereses: '["Voluntariado", "Comunicaciones"]',
  },
  {
    idPersona: 791719,
    profesion: "Cocinero",
    estudios: null,
    intereses: '["Vivienda y Habitat", "Voluntariado"]',
  },
  {
    idPersona: 791720,
    isCoordinador: true,
    profesion: "Ingeniera Industrial",
    estudios: "Ingenieria UCA",
    intereses: '["Gestión de tiempo","Liderazgo","Modelo de trabajo TECHO"]',
  },
  {
    idPersona: 791721,
    isCoordinador: true,
    profesion: "Publicista",
    estudios: "Lic. en Publicidad",
    intereses:
      '["Gestión Comunitaria", "Administración y Finanzas", "Vivienda y Habitat", "Gestión de Proyectos"]',
  },
  {
    idPersona: 791723,
    profesion: "Arquitecto",
    estudios: "Arquitectura - UCOR",
    intereses:
      '["Autoconocimiento", "Desarrollo de Fondos", "Vivienda y Habitat"]',
  },
  {
    idPersona: 791724,
    profesion: "Vendedora",
    estudios: null,
    intereses: '["Voluntariado", "Comunicaciones"]',
  },
  {
    idPersona: 791725,
    profesion: "Contador",
    estudios: "Universidad Siglo21",
    intereses:
      '["Desarrollo de Fondos", "Gestión de tiempo", "Gestión de Proyectos"]',
  },
];

const roles = [
  {
    //1
    nombre: "administrativo/a",
  },
  {
    //2
    nombre: "encuestador/a",
  },
  {
    //3
    nombre: "cocinero/a",
  },
  {
    //4
    nombre: "Organizador/a de construcciones",
  },
  {
    //5
    nombre: "Constructor/a",
  },
  {
    //6
    nombre: "ayudante general",
  },
  {
    //7
    nombre: "maestro/a de apoyo escolar",
  },
  {
    //8
    nombre: "tesorero/a",
  },
  {
    //9
    nombre: "comunicador/a",
  },
];

const areas = [
  {
    nombre: "Voluntariado",
  },
  {
    nombre: "Comunicaciones",
  },
  {
    nombre: "Desarrollo de Fondos",
  },
  {
    nombre: "Gestión Comunitaria",
  },
  {
    nombre: "Administración y Finanzas",
  },
  {
    nombre: "Legal",
  },
  {
    nombre: "Investigación",
  },
  {
    nombre: "Regional/Generalista",
  },
  {
    nombre: "Vivienda y Habitat",
  },
];

db.sync().then(() => {
  console.log("Comenzando primer seed.");
  Equipo.bulkCreate(equipos)
    .then(async (equipos) => {
      console.log("Equipos creados. Creando eventos...");
      for (let i = 0; i < equipos.length; i++) {
        await equipos[i]
          .createEvento({
            tipo: 0,
            nombreEquipo: equipos[i].nombre,
            nombreCoord: "Mariana Gutierrez",
          })
          .then(() => process.stdout.write("."));
      }
    })
    .then(() => {
      console.log("\nCreando personas...");
      Usuario.bulkCreate(personas).then(() => {
        console.log("Personas creadas");
        console.log("Creando roles...");
        Role.bulkCreate(roles)
          .then(() => console.log("Roles creados"))
          .then(() => {
            console.log("Creando Areas");
            Area.bulkCreate(areas).then(() => process.exit(0));
          })
          .catch((err) => {
            console.log("Algo salió mal en el proceso: ", err.message);
            process.exit(1);
          });
      });
    });
});

const personasActividades = [
  //usuarios registrados tanto en ACTIVIDADES como en EQUIPOS
  //password: 123456789
  "mariana.gutierrez@gmail.com",
  "franco.salazar@gmail.com",
  "johana.gonzalez@gmail.com",
  "joaquin.molina@gmail.com",
  "monica.suarez@gmail.com",
  "eber.fratini@gmail.com",
  "luciana.maurette@gmail.com",
  "juan.valdez@gmail.com",
  //Usuarios solo registrados en ACTIVIDADES, mismo password
  "viviana.gomez@gmail.com",
  "leandro.martinez@gmail.com",
];
