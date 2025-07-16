import { CalculatorTranslations } from "@/locales/types/pages/tools/calculator";

export const calculator: CalculatorTranslations = {
  title: "Calculadora Científica",
  subTitle: "Calculadora científica avanzada con funciones",
  description:
    "Una calculadora científica completa que soporta funciones trigonométricas, logaritmos, exponenciales, raíces cuadradas y más. Incluye historial de cálculos para realizar cálculos complejos de manera eficiente.",
  keywords: [
    "calculadora científica",
    "calculadora de funciones",
    "funciones trigonométricas",
    "logaritmo",
    "exponencial",
    "raíz cuadrada",
    "calculadora matemática",
    "historial de cálculos",
    "calculadora web",
  ],
  howToUse: {
    title: "Cómo usar la calculadora científica",
    steps: [
      "Usa botones numéricos y operadores para operaciones aritméticas básicas",
      "Selecciona funciones científicas (sin, cos, tan, etc.) para cálculos avanzados",
      "Usa paréntesis para construir expresiones matemáticas complejas",
      "Utiliza constantes (π, e) para cálculos matemáticos",
      "Accede al historial de cálculos para reutilizar cálculos anteriores",
      "Usa funciones de memoria para almacenar y recuperar valores",
    ],
  },
  features: {
    title: "Características de la calculadora científica",
    items: [
      "Funciones trigonométricas (sin, cos, tan) e inversas",
      "Funciones logarítmicas (log, ln) y exponencial (exp)",
      "Cálculos de raíz cuadrada, potencia y valor absoluto",
      "Constantes matemáticas (π, e) disponibles",
      "Funcionalidad de guardar y reutilizar historial de cálculos",
      "Funciones de memoria (MC, MR, M+, M-, MS)",
      "Soporte para expresiones complejas con paréntesis",
      "Cálculos trigonométricos basados en grados",
    ],
  },
  history: {
    title: "Historial de Cálculos",
    empty: "Aún no hay cálculos",
  },
  faqList: [
    {
      q: "¿Cómo uso la calculadora científica?",
      a: "Ingresa valores usando botones numéricos y selecciona operadores o botones de función. Para funciones científicas, presiona el botón de función y luego ingresa el valor en paréntesis.",
    },
    {
      q: "¿Cómo calculo funciones trigonométricas?",
      a: "Presiona los botones sin, cos o tan para ingresar la función. Por ejemplo: sin(30) calcula el seno de 30 grados. Ingresa ángulos en grados.",
    },
    {
      q: "¿Cómo uso el historial de cálculos?",
      a: "El panel del historial a la derecha muestra cálculos anteriores. Haz clic en cualquier elemento del historial para reutilizar esa expresión de cálculo. Usa el botón de limpiar para eliminar todo el historial.",
    },
    {
      q: "¿Cómo funcionan las funciones de memoria?",
      a: "MS (Almacenar en Memoria) guarda el valor actual, MR (Recordar Memoria) recupera el valor guardado, M+/M- suma/resta al valor de memoria, y MC limpia la memoria.",
    },
    {
      q: "¿Cómo calculo logaritmos?",
      a: "Usa el botón log para logaritmo común (base 10) y el botón ln para logaritmo natural (base e). Por ejemplo: log(100) es igual a 2, ln(e) es igual a 1.",
    },
    {
      q: "¿Puedo usar paréntesis en los cálculos?",
      a: "Sí, usa los botones ( y ) para ingresar paréntesis. Cálculos complejos como (2+3)×4 son procesados con precisión.",
    },
    {
      q: "¿Cómo uso las constantes π y e?",
      a: "Presiona el botón π para pi (3.14159...) y el botón e para el número de Euler (2.71828...). Puedes usar estas constantes en cálculos.",
    },
    {
      q: "¿Qué debo hacer si ocurre un error?",
      a: "Si ocurre un error debido a cálculos inválidos, presiona el botón C para reiniciar y recalcular con la expresión correcta.",
    },
  ],
};
