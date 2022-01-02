import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./client/Layout";
import Home from "./client/Home";
import Form from "./client/Form";
import Selfie from "./client/Selfie";
import NoPage from "./client/NoPage";
// import "bootstrap/scss/bootstrap.scss";
import "./css/index.css";
import Swal from "sweetalert2";
import React from "react";

/* App with different Routes */

export default function App() {
  /* Sweetalert (notifications) setup*/
  const swal = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-outline-dark m-2",
      cancelButton: "btn btn-danger m-2",
    },
    buttonsStyling: false,
  });

  /* error, success and confirm are passed as props to components to safe some lines of codes inside of components*/
  const errorSwal = (output) => {
    swal.fire({
      icon: "error",
      title: output,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const successSwal = (output) => {
    const result = swal.fire({
      icon: "success",
      title: output,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    return result;
  };

  const confirmSwal = (output) => {
    const result = swal.fire({
      title: output,
      showConfirmButton: true,
      showCancelButton: true,
    });

    return result;
  };

  /* Return main app with different routes */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home
                errorSwal={errorSwal}
                successSwal={successSwal}
                confirmSwal={confirmSwal}
              />
            }
          />
          <Route path="form" element={<Form successSwal={successSwal} />} />
          <Route path="selfie" element={<Selfie successSwal={successSwal} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
