import type { DigitalClockTranslations } from "../types/tools";

export const digitalClock: DigitalClockTranslations = {
  title: "Reloj Digital",
  description: "Reloj digital que muestra la hora actual",
  keywords: [
    "reloj digital",
    "reloj",
    "hora",
    "formato de 24 horas",
    "mostrar segundos",
    "mostrar fecha",
  ],
  showSeconds: "Mostrar Segundos",
  showDate: "Mostrar Fecha",
  format24Hour: "Formato de 24 Horas",
  settings: "Configuración de Visualización",
  faqList: [
    {
      q: "¿Cómo cambio la configuración de visualización del reloj?",
      a: "Utiliza las casillas de verificación en la sección de Configuración de Visualización para activar o desactivar el formato de 24 horas, la visualización de segundos y la visualización de fecha.",
    },
    {
      q: "¿Es precisa la hora mostrada?",
      a: "La hora se basa en la hora del sistema de tu dispositivo, por lo que será precisa siempre que la configuración de hora de tu dispositivo sea correcta.",
    },
    {
      q: "¿Cuál es la diferencia entre el formato de 24 horas y el formato de 12 horas?",
      a: "El formato de 24 horas muestra la hora desde las 00:00 hasta las 23:59, mientras que el formato de 12 horas utiliza AM/PM y muestra desde las 1:00 hasta las 12:59.",
    },
    {
      q: "¿El reloj se actualiza automáticamente?",
      a: "Sí, la hora se actualiza automáticamente cada segundo.",
    },
    {
      q: "¿Puedo mostrar la hora para otras zonas horarias?",
      a: "Actualmente, solo se muestra la hora local del dispositivo. Para otras zonas horarias, utiliza la función Reloj Mundial.",
    },
  ],
};
