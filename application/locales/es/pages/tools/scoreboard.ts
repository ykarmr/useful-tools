import { ScoreboardTranslations } from "@/locales/types/pages/tools/scoreboard";

export const scoreboard: ScoreboardTranslations = {
  title: "Marcador",
  subtitle: "Gestión de puntuaciones para deportes y juegos",
  description:
    "Seguimiento de puntuaciones de equipos y jugadores en tiempo real con detección automática de ganadores",
  keywords: [
    "marcador",
    "puntuaciones",
    "equipos",
    "jugadores",
    "seguimiento",
    "deportes",
    "juegos",
    "competencia",
  ],
  teamName: "Introduce nombre del equipo",
  addTeam: "Agregar equipo",
  resetScores: "Reiniciar puntuaciones",
  winner: "¡Ganador!",
  tied: "¡Empate!",
  defaultTeamA: "Equipo A",
  defaultTeamB: "Equipo B",
  maxTeamsReached: "Se pueden agregar máximo 8 equipos",
  howToUse: {
    title: "Cómo usar",
    steps: [
      "Introduce un nombre de equipo y haz clic en 'Agregar equipo' para registrar equipos",
      "Usa los botones '+' y '-' en cada tarjeta de equipo para ajustar puntuaciones",
      "Haz clic en los nombres de equipo para editarlos y cambiarlos",
      "El equipo con mayor puntuación aparece automáticamente como ganador",
      "Usa 'Reiniciar puntuaciones' para poner todas las puntuaciones en 0",
    ],
    features: {
      title: "Características",
      items: [
        "Gestiona hasta 8 equipos simultáneamente",
        "Identificación de equipos con código de colores",
        "Detección de ganador en tiempo real",
        "Controles intuitivos",
        "Guardado automático de datos",
      ],
    },
  },
  faqList: [
    {
      q: "¿Cuántos equipos puedo agregar?",
      a: "Puedes agregar hasta 8 equipos. Cada equipo recibe automáticamente un color diferente para facilitar la identificación.",
    },
    {
      q: "¿Pueden las puntuaciones ser negativas?",
      a: "No, las puntuaciones no pueden ser menores a cero. Si la puntuación de un equipo ya es 0, el botón menos no la disminuirá más.",
    },
    {
      q: "¿Puedo cambiar los nombres de los equipos?",
      a: "Sí, puedes hacer clic en el ícono de editar junto al nombre del equipo o hacer clic en el nombre del equipo para editarlo.",
    },
    {
      q: "¿Se guardan mis datos?",
      a: "Todos los datos de equipo y puntuaciones se guardan automáticamente en tu navegador. Tus datos se restaurarán cuando recargues la página.",
    },
    {
      q: "¿Cómo se muestran los empates?",
      a: "Cuando varios equipos tienen la misma puntuación más alta, todos los nombres de equipo se muestran como '¡Empate!'.",
    },
    {
      q: "¿Qué pasa cuando elimino un equipo?",
      a: "Cuando eliminas un equipo, todos sus datos se eliminan permanentemente. Si eliminas un equipo por accidente, tendrás que crear uno nuevo.",
    },
  ],
};
