import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./client/Nav/Navbar";
import Home from "./client/Home/Home";
import Selfie from "./client/Selfie/Selfie";
import Umfrage from "./client/Umfrage/Umfrage";
import NoPage from "./client/NoPage/NoPage";
import React from "react";
import Gewinnspiel from "./client/Gewinnspiel/Gewinnspiel";
import { swalAlerts } from "./client/_services/swalAlerts";

const App = () => {
  /* Return main app with different routes */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home swalAlerts={swalAlerts} />} />
          <Route path="selfie" element={<Selfie swalAlerts={swalAlerts} />} />
          <Route
            path="umfrage"
            element={<Umfrage successSwal={swalAlerts.successSwal} />}
          />
          <Route
            path="raffle"
            element={<Gewinnspiel successSwal={swalAlerts.successSwal} />}
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
