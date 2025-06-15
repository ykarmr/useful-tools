import { PomodoroTimerTranslations } from "@/locales/types/pages/tools/pomodoro-timer";

export const pomodoroTimer: PomodoroTimerTranslations = {
  title: "Temporizador Pomodoro",
  description: "Aumenta la productividad con la Técnica Pomodoro",
  keywords: [
    "pomodoro",
    "temporizador",
    "productividad",
    "enfoque",
    "gestión del tiempo",
  ],
  shortBreak: "Descanso Corto",
  longBreak: "Descanso Largo",
  session: "Sesión {current} de {total}",
  completed: "¡Sesión Pomodoro Completada!",
  breakTime: "¡Hora del Descanso!",
  longBreakTime: "¡Hora del Descanso Largo!",
  workTime: "¡Hora de Trabajar!",
  work: "Trabajar",
  faqList: [
    {
      q: "¿Qué es la Técnica Pomodoro?",
      a: "La Técnica Pomodoro es un método de gestión del tiempo que alterna períodos de trabajo concentrado (25 minutos) con descansos cortos (5 minutos), con descansos largos después de 4 ciclos.",
    },
    {
      q: "¿Puedo personalizar la duración de los intervalos?",
      a: "Actualmente, el temporizador usa los intervalos tradicionales de Pomodoro: 25 minutos de trabajo, 5 minutos de descanso corto y 15 minutos de descanso largo.",
    },
    {
      q: "¿Cómo funciona el sistema de sesiones?",
      a: "El temporizador alterna automáticamente entre períodos de trabajo y descanso. Después de 4 sesiones de trabajo, obtienes un descanso largo antes de comenzar un nuevo ciclo.",
    },
    {
      q: "¿Qué debo hacer durante los descansos?",
      a: "Durante los descansos cortos, levántate, estírate o haz algo relajante. Los descansos largos son perfectos para tomar un refrigerio, dar un paseo o descansar completamente.",
    },
  ],
};

export default pomodoroTimer;
