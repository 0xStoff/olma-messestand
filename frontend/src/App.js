import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./client/Navbar";
import Home from "./client/Home";
import Selfie from "./client/Selfie";
import NoPage from "./client/NoPage";
import React from "react";
import Gewinnspiel from "./client/Gewinnspiel";
import { swalAlerts } from "./client/services/swalAlerts";

const App = () => {
  /* Return main app with different routes */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home swalAlerts={swalAlerts} />} />
          <Route
            path="selfie"
            element={<Selfie successSwal={swalAlerts.successSwal} />}
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
