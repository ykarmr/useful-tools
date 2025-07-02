import { AgeCalculatorTranslations } from "@/locales/types";

export const ageCalculator: AgeCalculatorTranslations = {
  title: "Calculadora de Edad",
  subtitle: "Calcula la edad precisa y los días transcurridos fácilmente",
  description:
    "Una herramienta gratuita para calcular con precisión tu edad actual y los días transcurridos desde tu fecha de nacimiento. Muestra información detallada hasta años, meses, semanas, días, horas, minutos y segundos, además de calcular los días hasta tu próximo cumpleaños.",
  keywords: [
    "calculadora de edad",
    "cálculo de edad",
    "calculadora de días transcurridos",
    "calculadora de fecha de nacimiento",
    "calculadora de cumpleaños",
    "calculadora de años",
    "calculadora de meses",
    "calculadora de días",
    "calculadora de tiempo",
    "cálculo preciso de edad",
  ],
  howToUse: {
    title: "Cómo Usar la Calculadora de Edad",
    steps: [
      "Selecciona o ingresa tu fecha de nacimiento",
      "Establece la fecha de referencia (por defecto es hoy)",
      "Haz clic en el botón 'Calcular' para mostrar los resultados",
      "Ve información detallada de la edad en años, meses, semanas, días, horas, minutos y segundos",
    ],
  },
  features: {
    title: "Características Principales",
    items: [
      "Cálculo preciso de edad (años, meses, semanas, días, horas, minutos, segundos)",
      "Calcula el tiempo transcurrido desde la fecha de nacimiento hasta cualquier fecha especificada",
      "Cuenta regresiva hasta el próximo cumpleaños",
      "Funcionalidad de actualización en tiempo real",
      "Visualización clara y fácil de entender",
      "Interfaz intuitiva con soporte multiidioma",
    ],
  },
  birthdateLabel: "Fecha de Nacimiento",
  birthdatePlaceholder: "Por favor selecciona tu fecha de nacimiento",
  targetDateLabel: "Fecha de Referencia",
  targetDatePlaceholder: "Por favor selecciona la fecha de referencia",
  calculateButton: "Calcular Edad",
  clearButton: "Limpiar",
  resultPlaceholder: "Ingresa tu fecha de nacimiento para calcular la edad",
  resultTitle: "Resultados del Cálculo",
  currentAge: "Edad Actual",
  daysLived: "Días Vividos",
  yearsOld: "años",
  monthsOld: "meses",
  weeksOld: "semanas",
  daysOld: "días",
  hoursOld: "horas",
  minutesOld: "minutos",
  secondsOld: "segundos",
  nextBirthday: "Próximo Cumpleaños",
  daysUntilBirthday: "Días Hasta el Próximo Cumpleaños",
  nextBirthdayAge: "años",
  faqList: [
    {
      q: "¿Qué tan preciso es el cálculo de edad?",
      a: "Esta herramienta calcula la edad precisa basada en cálculos de fecha. Puede calcular en detalle hasta años, meses, días, horas, minutos y segundos.",
    },
    {
      q: "¿Se consideran los años bisiestos?",
      a: "Sí, los años bisiestos se consideran con precisión en el cálculo. Los cálculos de edad para personas nacidas el 29 de febrero también se manejan correctamente.",
    },
    {
      q: "¿Puedo calcular para fechas pasadas o futuras, no solo la edad actual?",
      a: "Cambiando la fecha de referencia, también puedes calcular la edad para fechas específicas del pasado o futuro.",
    },
    {
      q: "¿Cómo se calculan los días hasta el próximo cumpleaños?",
      a: "El sistema calcula automáticamente el número de días desde la fecha actual hasta el próximo cumpleaños y lo muestra en formato de cuenta regresiva.",
    },
    {
      q: "¿Se consideran las zonas horarias?",
      a: "Los cálculos se basan en la hora local de tu navegador. Si necesitas cálculos para diferentes zonas horarias, ajusta la fecha de referencia en consecuencia.",
    },
  ],
};
