import { ContactTranslations, PrivacyTranslations } from "../types";

export const contact: ContactTranslations = {
  title: "Contact Us",
  subtitle: "Get in touch with us",
  description:
    "Have questions, suggestions, or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  keywords: [
    "contact",
    "support",
    "inquiry",
    "feedback",
    "questions",
    "customer service",
    "help",
    "contact us",
  ],
  form: {
    name: "Name",
    namePlaceholder: "Your full name",
    nameRequired: "Name is required",
    email: "Email",
    emailPlaceholder: "your.email@example.com",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    message: "Message",
    messagePlaceholder: "Tell us more about your inquiry...",
    messageRequired: "Message is required",
    messageMinLength: "Message must be at least 10 characters long",
    submit: "Send Message",
    submitting: "Sending...",
    success:
      "Thank you! Your message has been sent successfully. We'll get back to you soon.",
    error:
      "Sorry, there was an error sending your message. Please try again later.",
  },
};
