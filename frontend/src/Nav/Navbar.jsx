import { Outlet, NavLink } from "react-router-dom";
import React from "react";
import DarkMode from "../_components/common/dark-mode";

/* Navigation-Links with different paths */
const Layout = () => {
  const classes = "text-reset  nav-link mb-3";
  return (
    <>
      <div className="container">
        <div className="d-flex">
          <nav className="nav navbar-dark col navBar">
            <NavLink className={classes} to="/">
              Übersicht
            </NavLink>
            <NavLink className={classes} to="/raffle">
              Gewinnspiel
            </NavLink>
            <NavLink className={classes} to="/selfie">
              Upload Selfie
            </NavLink>
            <NavLink className={classes} to="/umfrage">
              Umfrage
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
