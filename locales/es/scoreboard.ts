import { ScoreboardTranslations } from "../types/pages/tools/scoreboard";

export const scoreboard: ScoreboardTranslations = {
  title: "Marcador",
  description: "Seguimiento de puntuaciones de juegos y competencias",
  keywords: ["marcador", "puntuaciones", "equipos", "jugadores", "seguimiento"],
  teamName: "Nombre del equipo...",
  addTeam: "Agregar equipo",
  resetScores: "Reiniciar todas las puntuaciones",
  winner: "¡Ganador!",
  tied: "¡Empate!",
  defaultTeamA: "Equipo A",
  defaultTeamB: "Equipo B",
  faqList: [
    {
      q: "¿Cuántos equipos puedo agregar al marcador?",
      a: "Puedes agregar hasta 8 equipos al marcador. Este límite ayuda a mantener la interfaz manejable y fácil de usar.",
    },
    {
      q: "¿Pueden las puntuaciones volverse negativas?",
      a: "No, las puntuaciones no pueden bajar de cero. Si la puntuación de un equipo ya es 0, hacer clic en el botón menos no la disminuirá más.",
    },
    {
      q: "¿Puedo cambiar los nombres de los equipos?",
      a: "Sí, puedes hacer clic en cualquier nombre de equipo para entrar en modo de edición, luego escribir un nuevo nombre y guardar los cambios.",
    },
    {
      q: "¿Se guardan los datos de mi marcador?",
      a: "Todos los datos de equipos y puntuaciones se guardan automáticamente en el almacenamiento local de tu navegador. Cuando recargues la página, tus datos serán restaurados.",
    },
  ],
};
