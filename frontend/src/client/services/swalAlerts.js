import Swal from "sweetalert2";

const swal = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-outline-dark m-2",
    cancelButton: "btn btn-danger m-2",
  },
  buttonsStyling: false,
});

export const swalAlerts = {
  /* error, success and confirm are passed as props to components to safe some lines of codes inside of components*/
  errorSwal: (output) => {
    swal.fire({
      icon: "error",
      title: output,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },
  successSwal: (output) => {
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
  },

  confirmSwal: (output) => {
    const result = swal.fire({
      title: output,
      showConfirmButton: true,
      showCancelButton: true,
    });

    return result;
  },
};
