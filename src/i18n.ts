import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  es: { translation: es },
} as const;

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: localStorage.getItem("lang") || (navigator.language?.startsWith("es") ? "es" : "en"),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
