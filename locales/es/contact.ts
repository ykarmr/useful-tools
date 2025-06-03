import { ContactTranslations, PrivacyTranslations } from "../types";

export const contact: ContactTranslations = {
  title: "Contáctanos",
  subtitle: "Ponte en contacto con nosotros",
  keywords: [
    "contacto",
    "soporte",
    "consulta",
    "comentarios",
    "preguntas",
    "servicio al cliente",
    "ayuda",
    "contáctanos",
  ],
  description:
    "¿Tienes preguntas, sugerencias o comentarios? Nos encantaría escucharte. Envíanos un mensaje y te responderemos lo antes posible.",
  form: {
    name: "Nombre",
    namePlaceholder: "Tu nombre completo",
    nameRequired: "El nombre es obligatorio",
    email: "Correo electrónico",
    emailPlaceholder: "tu.email@ejemplo.com",
    emailRequired: "El correo electrónico es obligatorio",
    emailInvalid: "Por favor ingresa una dirección de correo válida",
    subject: "Asunto",
    subjectPlaceholder: "¿De qué se trata?",
    subjectRequired: "El asunto es obligatorio",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos más sobre tu consulta...",
    messageRequired: "El mensaje es obligatorio",
    messageMinLength: "El mensaje debe tener al menos 10 caracteres",
    submit: "Enviar Mensaje",
    submitting: "Enviando...",
    success:
      "¡Gracias! Tu mensaje ha sido enviado exitosamente. Te responderemos pronto.",
    error:
      "Lo siento, hubo un error al enviar tu mensaje. Por favor intenta de nuevo más tarde.",
  },
};
