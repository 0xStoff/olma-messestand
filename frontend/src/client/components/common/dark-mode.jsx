import React, { useState, useEffect } from "react";
import "./dark-mode.css";

const DarkMode = () => {
  const [userTheme, setUserTheme] = useState("light-theme");

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
    setUserTheme(theme);
    document.documentElement.className = theme;
  };

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

  return (
    <div>
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
          className={
            userTheme === "dark-theme"
              ? "switch-toggle"
              : "switch-toggle switch-toggle-checked"
          }
        ></div>
      </label>
    </div>
  );
};

export default DarkMode;
