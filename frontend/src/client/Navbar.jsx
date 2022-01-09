import { Outlet, NavLink } from "react-router-dom";
import React from "react";
import DarkMode from "./components/common/dark-mode";
import Footer from "./Footer";

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
            <NavLink className={classes} to="/selfie">
              Upload Selfie
            </NavLink>
            <NavLink className={classes} to="/raffle">
              Raffle
            </NavLink>
          </nav>
          <DarkMode />
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
