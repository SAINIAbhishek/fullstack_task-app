import { NODE_ENV } from '@/config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLang from './locales/en/en.json';

const languages = ['en'];
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_FALLBACK_LANGUAGE = 'en';

// the translations
const resources = {
  en: {
    translation: enLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: NODE_ENV === 'development',
    resources,
    fallbackLng: DEFAULT_FALLBACK_LANGUAGE,
    supportedLngs: languages,
    lng: DEFAULT_LANGUAGE, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
