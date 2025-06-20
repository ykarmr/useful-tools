import { ContactTranslations } from "@/locales/types/pages/contact";

export const contact: ContactTranslations = {
  title: "Contáctanos",
  subtitle: "Nos encantaría conocer tu opinión",
  keywords: [
    "contacto",
    "soporte",
    "consulta",
    "comentarios",
    "preguntas",
    "sugerencias",
    "ayuda",
    "contáctanos",
  ],
  description:
    "¿Tienes preguntas sobre USEFUL TOOLS? ¿Ideas para nuevas funciones? Damos la bienvenida a todos los comentarios, sugerencias y consultas. Tu opinión nos ayuda a crear mejores herramientas para todos. Como este es un proyecto personal, los tiempos de respuesta pueden variar, pero definitivamente te responderemos.",
  form: {
    name: "Nombre",
    namePlaceholder: "Juan Pérez",
    nameRequired: "Por favor ingresa tu nombre",
    email: "Correo electrónico",
    emailPlaceholder: "tu.email@ejemplo.com",
    emailRequired: "Por favor ingresa tu correo electrónico",
    emailInvalid: "Por favor ingresa una dirección de correo válida",
    message: "Mensaje",
    messagePlaceholder:
      "Comparte tus preguntas, comentarios o sugerencias de funciones...",
    messageRequired: "Por favor ingresa tu mensaje",
    messageMinLength: "Por favor ingresa al menos 10 caracteres",
    submit: "Enviar Mensaje",
    submitting: "Enviando...",
    success:
      "¡Gracias! Tu mensaje ha sido enviado exitosamente. Podemos tardar un tiempo en responder, pero definitivamente te contactaremos.",
    error:
      "Lo sentimos, hubo un error al enviar tu mensaje. Por favor espera un momento e intenta de nuevo.",
  },
};
