import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';
import blogEn from '../../messages/blog.en.json';
import blogTr from '../../messages/blog.tr.json';
import paymentEn from '../../messages/payment.en.json';
import paymentTr from '../../messages/payment.tr.json';

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
      en: { translation: { ...en, blog: blogEn, payment: paymentEn } },
      tr: { translation: { ...tr, blog: blogTr, payment: paymentTr } },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
