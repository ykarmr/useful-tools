import { PomodoroTimerTranslations } from "@/locales/types/pages/tools/pomodoro-timer";

export const pomodoroTimer: PomodoroTimerTranslations = {
  title: "Temporizador Pomodoro",
  description:
    "Aumenta la productividad con la herramienta de gestión del tiempo Técnica Pomodoro",
  keywords: [
    "pomodoro",
    "temporizador",
    "productividad",
    "enfoque",
    "gestión del tiempo",
  ],
  work: "Trabajar",
  shortBreak: "Descanso Corto",
  longBreak: "Descanso Largo",
  session: "Sesión {current} de {total}",
  workTime: "¡Hora de Trabajar!",
  breakTime: "¡Hora del Descanso!",
  longBreakTime: "¡Hora del Descanso Largo!",
  completed: "¡Sesión Pomodoro Completada!",
  workCompleted: "¡Sesión de Trabajo Completada!",
  breakCompleted: "¡Tiempo de Descanso Terminado!",
  sessionCompleted: "¡Sesión Completada!",
  timeForBreak: "¡Es hora de descansar!",
  timeForWork: "¡Es hora de volver al trabajo!",
  timeForLongBreak: "¡Es hora de un descanso largo!",
  settings: "Configuración",
  workDuration: "Duración del Trabajo",
  shortBreakDuration: "Duración del Descanso Corto",
  longBreakDuration: "Duración del Descanso Largo",
  totalSessions: "Sesiones Totales",
  autoStart: "Inicio Automático",
  soundEnabled: "Notificaciones de Sonido",
  minutes: "minutos",
  applySettings: "Aplicar Configuración",
  closeSettings: "Cerrar Configuración",
  howToUse: {
    title: "Cómo Usar el Temporizador Pomodoro",
    steps: [
      "Presiona el botón 'Iniciar' para comenzar una sesión de trabajo",
      "Concéntrate en tu trabajo durante 25 minutos",
      "Toma un descanso corto de 5 minutos cuando termine el temporizador",
      "Después de 4 sesiones, toma un descanso largo de 15 minutos",
      "Repite este ciclo para aumentar tu productividad",
    ],
  },
  features: {
    title: "Características",
    items: [
      "Intervalos Pomodoro estándar (25min trabajo, 5min descanso corto, 15min descanso largo)",
      "Configuración personalizable de tiempo y número de sesiones",
      "Función de inicio automático para transiciones fluidas entre sesiones",
      "Seguimiento visual del progreso",
      "Almacenamiento local para la persistencia de configuraciones y estado de sesión",
      "Notificaciones de audio (activar/desactivar)",
    ],
  },
  faqList: [
    {
      q: "¿Qué es la Técnica Pomodoro?",
      a: "La Técnica Pomodoro es un método de gestión del tiempo que usa sesiones de trabajo concentrado de 25 minutos seguidas de descansos cortos de 5 minutos. Después de 4 sesiones, tomas un descanso largo de 15 minutos. Es efectivo para mejorar el enfoque y reducir la fatiga.",
    },
    {
      q: "¿Puedo personalizar la configuración de tiempo?",
      a: "Sí, puedes personalizar el tiempo de trabajo, tiempo de descanso y sesiones totales a través del botón de configuración. Tus cambios se guardan automáticamente.",
    },
    {
      q: "¿Qué pasa si interrumpo una sesión?",
      a: "Puedes pausar el temporizador con el botón de pausa. También puedes reiniciar la sesión actual para comenzar desde el principio usando el botón de reinicio.",
    },
    {
      q: "¿Tiene notificaciones de audio?",
      a: "Sí, puedes habilitar o deshabilitar las notificaciones de audio en la configuración. Las notificaciones de audio del navegador te alertarán cuando terminen las sesiones.",
    },
    {
      q: "¿Qué es la función de inicio automático?",
      a: "Cuando el inicio automático está habilitado, la siguiente sesión de trabajo comenzará automáticamente después de que termine el tiempo de descanso, eliminando la necesidad de iniciar manualmente cada sesión.",
    },
    {
      q: "¿Se guardan mis datos?",
      a: "Sí, tu configuración y el progreso de la sesión se guardan automáticamente en el almacenamiento local de tu navegador. Tus preferencias se mantendrán incluso después de cerrar la página.",
    },
  ],
};

export default pomodoroTimer;
