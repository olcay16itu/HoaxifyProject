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
        'Password Repeat':'Password Repeat',
        'Login':'Login',
        'Users':'Users',
        'next':'Next>',
        'prev':'<Prev',
        'Load Failure':'Load Failure',
        'User not Found':'User not Found'
      }
    },
    tr:{
      translations: {
        'Sign Up': 'Kayıt Ol',
        'Password mismatch':'Şifreler eşleşmiyor.',
        'Username':'Kullanıcı Adı',
        'Password':'Şifre',
        'Display Name':'Profil İsmi',
        'Password Repeat':'Şifre tekrarı',
        'Login':'Giriş Yap',
        'Users':'Kullanıcılar',
        'next':'İleri>',
        'prev':'<Geri',
        'Load Failure':'Yükleme Başarısız',
        'User not Found':'Kullanıcı Bulunamadı'
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