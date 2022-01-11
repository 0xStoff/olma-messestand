import React, { useState, useEffect } from "react";
import "./dark-mode.css";

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

  // userTheme === "dark-theme"
  //     ? "switch-toggle"
  //     : "switch-toggle switch-toggle-checked"
  return (
    <React.Fragment>
      <input
        onChange={toggleTheme}
        id="checkbox"
        type="checkbox"
        className="switch-checkbox"
      />
      <label htmlFor="checkbox" className="switch-label">
        <span>🌙</span>
        <span>☀️</span>
        <div
          // :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
          // className={
          //   userTheme === "dark-theme" ? " switch-toggle-checked" : null
          // }

          className={toggleClass}
          // className={
          //   userTheme === "dark-theme"
          //     ? "switch-toggle"
          //     : "switch-toggle switch-toggle-checked"
          // }
        ></div>
      </label>
    </React.Fragment>
  );
};

export default DarkMode;
