import I18n from 'react-native-i18n';

// Locales
import en from './locales/en';
import vi from './locales/vi';

// Fallback to vi-VN
I18n.fallbacks = true;
I18n.locale = 'vi';

I18n.translations = { en, vi };
