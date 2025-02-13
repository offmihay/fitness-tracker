import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ua from "@/locales/ua.json";
import ru from "@/locales/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: ua },
    ru: { translation: ru },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  parseMissingKeyHandler: function (key) {
    const segments = key.split(".");
    return segments[segments.length - 1];
  },
});

export default i18n;
