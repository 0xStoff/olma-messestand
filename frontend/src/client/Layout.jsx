import { Outlet, NavLink } from "react-router-dom";
import React from "react";
import DarkMode from "./components/common/dark-mode";
import "./components/common/dark-mode.css";

/* Navigation-Links with different paths */
const Layout = () => {
  return (
    <>
      <div className="container">
        <div className="d-flex">
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
            <NavLink className="text-reset  nav-link " to="/raffle">
              Raffle
            </NavLink>
          </nav>
          <DarkMode />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
