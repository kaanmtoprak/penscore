import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'tr';
  const saved = window.localStorage.getItem('app_lang');
  if (saved === 'tr' || saved === 'en') return saved;
  return 'tr';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
