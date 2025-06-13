import { RandomStringTranslations } from "../types/pages/tools/random-string";

export const randomString: RandomStringTranslations = {
  title: "Generador de Cadenas Aleatorias",
  description: "Genera cadenas aleatorias para contraseñas o IDs",
  keywords: [
    "cadena aleatoria",
    "generador",
    "contraseña",
    "ID",
    "aleatorio",
    "cadena",
  ],
  generate: "Generar Cadena",
  length: "Longitud",
  result: "Cadena Generada",
  includeNumbers: "Incluir Números",
  includeSymbols: "Incluir Símbolos",
  faqList: [
    {
      q: "¿Qué caracteres se incluyen?",
      a: "Por defecto se incluyen letras (mayúsculas y minúsculas). Opcionalmente puedes agregar números y símbolos.",
    },
    {
      q: "¿Qué tan fuertes son las cadenas generadas?",
      a: "La fuerza depende de la longitud y tipos de caracteres usados. Las cadenas más largas con números y símbolos son más fuertes.",
    },
    {
      q: "¿Es seguro usar para contraseñas?",
      a: "Es adecuado para uso general, pero para cuentas importantes recomendamos usar un administrador de contraseñas dedicado.",
    },
    {
      q: "¿Es posible generar la misma cadena?",
      a: "Depende del número de caracteres y combinaciones usadas, pero con suficiente longitud, la posibilidad de duplicación es muy baja.",
    },
  ],
};

export default randomString;
