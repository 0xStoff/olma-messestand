import React, { useState, useEffect } from "react";
import "./dark-mode.css";
import "font-awesome/css/font-awesome.css";

const DarkMode = () => {
  const getMediaPreference = () => {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (hasDarkPreference) {
      return "dark-theme";
    } else {
      return "light-theme";
    }
  };

  const [userTheme, setUserTheme] = useState(getMediaPreference());

  useEffect(() => {
    const initUserTheme = getMediaPreference();
    setTheme(initUserTheme);
  }, []);

  const toggleTheme = () => {
    const activeTheme = localStorage.getItem("user-theme");
    if (activeTheme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  const setTheme = (theme) => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.className = theme;
    setUserTheme(theme);
  };

  const toggleClass =
    userTheme === "dark-theme"
      ? "switch-toggle"
      : "switch-toggle switch-toggle-checked";

  return (
    <React.Fragment>
      <input
        onChange={toggleTheme}
        id="checkbox"
        type="checkbox"
        className="switch-checkbox"
      />
      <label htmlFor="checkbox" className="switch-label">
        <span>
          <i className="fa fa-moon-o moon" />
        </span>
        <span>
          <i className="fa fa-sun-o sun" />
        </span>
        <div className={toggleClass}></div>
      </label>
    </React.Fragment>
  );
};

export default DarkMode;
