import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import ja from './ja';
import en from './en';

// デバイスの言語を取得
const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
const supportedLanguage = deviceLanguage === 'ja' ? 'ja' : 'en';

i18next.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    en: { translation: en },
  },
  lng: supportedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
