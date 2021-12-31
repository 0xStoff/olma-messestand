import { Outlet, NavLink } from "react-router-dom";
import React from "react";
import DarkMode from "./components/dark-mode";
import "./components/dark-mode.css";
// import "../index.css";

/* Navigation-Links with different paths */
const Layout = () => {
  return (
    <>
      <div className="container">
        <div className="dark-mode">
          <DarkMode />
        </div>
        <nav className="nav navbar-dark col navBar">
          <NavLink className="text-reset  nav-link " to="/">
            Übersicht
          </NavLink>

          <NavLink className="text-reset  nav-link " to="/form">
            Gewinnspiel
          </NavLink>

          <NavLink className="text-reset  nav-link " to="/selfie">
            Upload Selfie
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
