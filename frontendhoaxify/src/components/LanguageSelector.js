import React from 'react';
import {ChangeLanguage} from "../api/apiCalls";
import {useTranslation} from "react-i18next";

const LanguageSelector = (props) => {

  const translation=useTranslation()
  const onChangeLanguage= language =>{
    const {i18n} = translation
    i18n.changeLanguage(language)
    ChangeLanguage(language)
  }

  return (
    <div className="container">
      <img src="https://flagsapi.com/TR/flat/24.png" alt="Turkish Flag" onClick={()=>onChangeLanguage("tr")} style={{cursor:"pointer"}}></img>
      <img src="https://flagsapi.com/US/flat/24.png" alt="USA Flag" onClick={()=>onChangeLanguage("en")} style={{cursor:"pointer"}}></img>
    </div>
  );
};

export default LanguageSelector;