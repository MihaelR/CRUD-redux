import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const DarkModeToggle = () => {
  const [darkModeOn, setDarkMode] = useState<any>(true);

  //Translation
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("data-dark-mode", darkModeOn);
  });

  return (
    <button
      className="dark-mode__btn"
      aria-pressed={darkModeOn}
      onClick={() => setDarkMode(!darkModeOn)}
    >
      <span className="dark-mode__content-wrap">
        <span className="dark-mode__icon" aria-hidden="true" />
        {t("home.darkMode")}
        <span className="dark-mode__status">
          {darkModeOn ? `${t("home.on")}` : `${t("home.off")}`}
        </span>
      </span>
    </button>
  );
};
