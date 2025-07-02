import { RandomStringTranslations } from "@/locales/types/pages/tools/random-string";

export const randomString: RandomStringTranslations = {
  title: "Generador de Cadenas Aleatorias",
  subTitle: "Genera contraseñas e IDs seguros al instante",
  description:
    "Crea contraseñas fuertes e IDs únicos con configuraciones personalizables. Ajusta los niveles de seguridad con combinaciones de números y símbolos usando nuestro potente generador de cadenas aleatorias.",
  keywords: [
    "cadena aleatoria",
    "generador de contraseñas",
    "generador de ID",
    "generador de cadenas",
    "seguridad",
    "generación aleatoria",
    "herramienta contraseñas",
    "creador de cadenas",
  ],
  length: "Longitud",
  includeNumbers: "Incluir Números",
  includeSymbols: "Incluir Símbolos",
  generate: "Generar Cadena",
  result: "Cadena Generada",
  howToUse: {
    title: "Cómo Usar el Generador de Cadenas Aleatorias",
    steps: [
      "Establece la longitud deseada con el deslizador (4-50 caracteres)",
      "Marca 'Incluir Números' para agregar dígitos",
      "Marca 'Incluir Símbolos' para agregar caracteres especiales",
      "Haz clic en el botón 'Generar Cadena'",
      "Copia la cadena generada para usarla",
    ],
  },
  features: {
    title: "Características del Generador de Cadenas Aleatorias",
    items: [
      "Longitud ajustable de 4 a 50 caracteres",
      "Soporta combinación de letras, números y símbolos",
      "Función de copia con un clic para facilitar el uso",
      "Opciones de nivel de seguridad personalizables",
      "Completamente basado en navegador y seguro",
      "Compatibilidad total con móviles y tablets",
    ],
  },
  faqList: [
    {
      q: "¿Qué caracteres se incluyen?",
      a: "Por defecto se incluyen letras mayúsculas y minúsculas. Opcionalmente puedes agregar números (0-9) y símbolos (!@#$%^&* etc.). Más tipos de caracteres resultan en contraseñas más fuertes.",
    },
    {
      q: "¿Qué tan seguras son las cadenas generadas?",
      a: "La seguridad depende de la longitud y variedad de caracteres. Cadenas con 12+ caracteres incluyendo números y símbolos proporcionan fuerza adecuada para uso general. Para cuentas críticas se recomiendan 16+ caracteres.",
    },
    {
      q: "¿Puede esto reemplazar un administrador de contraseñas?",
      a: "Esta herramienta es excelente para generar contraseñas pero no tiene capacidad de almacenamiento. Recomendamos encarecidamente almacenar las contraseñas generadas en un administrador de contraseñas confiable.",
    },
    {
      q: "¿Es posible generar la misma cadena dos veces?",
      a: "Teóricamente posible pero extremadamente improbable. Por ejemplo, con 12 caracteres usando todos los tipos de caracteres, la probabilidad de generar cadenas idénticas es astronómicamente pequeña.",
    },
    {
      q: "¿Se almacenan las cadenas generadas en algún lugar?",
      a: "No, todo el procesamiento ocurre dentro de tu navegador y las cadenas generadas nunca se transmiten a servidores. Es completamente privado y seguro.",
    },
  ],
};

export default randomString;
