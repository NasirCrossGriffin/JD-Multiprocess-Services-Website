import { useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageToggle() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<number>(1);

  return (
    <button className="LanguageButton" onClick={() => {i18n.changeLanguage(language === 1 ? "en" : "es"), setLanguage(language * -1)}}>
      {language === 1 ? "English" : "Español"}
    </button>
  );
}

export default LanguageToggle;
