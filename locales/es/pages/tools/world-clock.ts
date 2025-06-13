import { WorldClockTranslations } from "@/locales/types/pages/tools/world-clock";

export const worldClock: WorldClockTranslations = {
  title: "Reloj Mundial",
  description:
    "Reloj que muestra la hora en diferentes zonas horarias del mundo",
  keywords: [
    "reloj mundial",
    "zonas horarias",
    "hora actual",
    "hora internacional",
    "reloj global",
  ],
  addTimezone: "Agregar Zona Horaria",
  local: "Local",
  faqList: [
    {
      q: "¿Cómo agregar una nueva zona horaria?",
      a: "Haz clic en el botón 'Agregar Zona Horaria' y selecciona de la lista de zonas horarias disponibles. Puedes agregar múltiples zonas horarias para comparar horarios entre diferentes regiones.",
    },
    {
      q: "¿Son precisas las horas mostradas?",
      a: "Las horas se basan en el tiempo del sistema de tu dispositivo y datos estándar de zonas horarias. Serán precisas siempre que la configuración de tiempo de tu dispositivo sea correcta.",
    },
    {
      q: "¿Con qué frecuencia se actualiza el reloj?",
      a: "Los relojes se actualizan automáticamente cada segundo para mostrar la hora actual en cada zona horaria seleccionada.",
    },
    {
      q: "¿Puedo eliminar zonas horarias que ya no necesito?",
      a: "Sí, puedes eliminar cualquier zona horaria agregada haciendo clic en el botón de eliminar (×) junto a cada pantalla de zona horaria.",
    },
  ],
};
