import { TimerTranslations } from "@/locales/types/pages/tools/timer";

export const timer: TimerTranslations = {
  title: "Temporizador",
  description: "Temporizador de cuenta regresiva para cualquier duración",
  keywords: ["temporizador", "cuenta regresiva", "cronómetro", "reloj"],
  start: "Iniciar",
  pause: "Pausar",
  reset: "Restablecer",
  minutes: "Minutos",
  seconds: "Segundos",
  timeUp: "¡Tiempo agotado!",
  faqList: [
    {
      q: "¿Cuál es el tiempo máximo que puedo configurar?",
      a: "Puedes configurar cualquier combinación de minutos y segundos. También son posibles temporizadores de varias horas.",
    },
    {
      q: "¿El temporizador continúa si cierro el navegador?",
      a: "El temporizador se detiene si cierras la pestaña del navegador. Necesitas mantener la pestaña abierta.",
    },
    {
      q: "¿Recibiré una notificación de audio?",
      a: "Recibirás una notificación del navegador cuando se acabe el tiempo. Asegúrate de que las notificaciones estén habilitadas.",
    },
    {
      q: "¿Funciona en segundo plano?",
      a: "El temporizador continúa ejecutándose mientras ves otras pestañas, pero puede pausarse si tu computadora entra en modo de suspensión.",
    },
  ],
};

export default timer;
