import frLocale from "date-fns/locale/fr";

export const localeMap = {
    fr: frLocale,
  };
  

  export const maskMap = {
fr: "__/__/____",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

export function getStyles(name, personName, theme) {
            return {
                fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
            };
        }

export const interes = [
"Voluntariado",
"Comunicaciones",
"Desarrollo de Fondos",
"Gestión Comunitaria",
"Administración y Finanzas",
"Vivienda y Habitat",
"Gestión de tiempo",
"Liderazgo",
"Gestión de Proyectos",
"Autoconocimiento",
"Modelo de trabajo TECHO",
];