import i18n from "i18next";
import {initReactI18next} from 'react-i18next'

i18n.use(initReactI18next).init({
  resources:{
    en:{
      translations:{
        'Sign Up': 'Sign Up',
        'Password mismatch':'Password mismatch',
        'Username':'Username',
        'Display Name':'Display Name',
        'Password':'Password',
        'Password Repeat':'Password Repeat'
      }
    },
    tr:{
      translations: {
        'Sign Up': 'Kayıt Ol',
        'Password mismatch':'Şifreler eşleşmiyor.',
        'Username':'Kullanıcı Adı',
        'Password':'Şifre',
        'Display Name':'Profil İsmi',
        'Password Repeat':'Şifre tekrarı'
      }
    }
  },
  fallbackLng:'en',
  ns:['translations'],
  defaultNS:'translations',
  keySeparator:false,
  interpolation:{
    escapeValue:false,
    formatSeparator:','
  },
  react:{
    wait:true
  }
})

export default i18n;