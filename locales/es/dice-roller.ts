import { DiceRollerTranslations } from "../types/pages/tools/dice-roller";

export const diceRoller: DiceRollerTranslations = {
  title: "Lanzador de Dados",
  description: "Lanza dados con lados personalizables",
  keywords: [
    "lanzador de dados",
    "dados",
    "lanzar dados",
    "número aleatorio",
    "juegos",
    "juegos de mesa",
  ],
  roll: "Lanzar Dados",
  sides: "Lados",
  result: "Resultado",
  resultMessage: "¡Has lanzado un {result}!",
  selectCount: "Selecciona el número de dados a lanzar",
  faqList: [
    {
      q: "¿Cómo lanzo los dados?",
      a: "Haz clic en el botón 'Lanzar Dados' para lanzar los dados y ver el resultado.",
    },
    {
      q: "¿Cómo se determina el resultado?",
      a: "El resultado se determina aleatoriamente, mostrando el número obtenido en el dado lanzado.",
    },
    {
      q: "¿Cuándo se actualiza el resultado del lanzamiento?",
      a: "El resultado se actualiza cada vez que lanzas los dados.",
    },
    {
      q: "¿Hay un historial de lanzamientos de dados?",
      a: "Esta herramienta no guarda un historial; los resultados se muestran solo para la sesión actual.",
    },
    {
      q: "¿Puedo lanzar varios dados a la vez?",
      a: "Sí, puedes seleccionar el número de dados a lanzar antes de comenzar.",
    },
  ],
};
