import Swal from "sweetalert2";
import { Card, Table, InputGroup, FormControl } from "react-bootstrap";

const ButtonsTest = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";
  const {
    queryData,
    query,
    successSwal,
    dropTable,
    errorSwal,
    getRandomUsers,
    luckyDraw,
    confirmSwal,
    teilnehmerInput,
  } = props;

  return (
    <div className="mt-5">
      <button
        onClick={async () => {
          try {
            queryData();
            console.log(queryData());
          } catch {
            if (query.response == undefined) {
              errorSwal("Generate Data First!");
            }
          }
        }}
        type="button"
        className={buttonClass}
      >
        Query{" "}
      </button>
      <button
        onClick={async () => {
          if (query.response == undefined || query.response.data.length == 0) {
            errorSwal("Nothing to drop, generate first!");
          } else {
            const confirm = await confirmSwal("Are you Sure?");

            if (confirm.isConfirmed) {
              successSwal(`Database dropped successfully`);
              dropTable();
            }
          }
        }}
        type="button"
        className={buttonClass}
      >
        Drop{" "}
      </button>
      <button
        onClick={() => {
          if (!teilnehmerInput) {
            errorSwal("No Input");
          } else {
            if (
              query.response == undefined ||
              query.response.data.length == 0
            ) {
              Swal.fire({
                title: "Loading Data into Database?",
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                customClass: {
                  confirmButton: "btn",
                  cancelButton: "btn btn-danger m-2",
                },
                buttonsStyling: false,
                preConfirm: async () => {
                  document.getElementsByClassName(
                    "swal2-cancel"
                  )[0].style.display = "none";

                  Swal.showLoading();
                  try {
                    await getRandomUsers();
                    queryData();
                  } catch (err) {
                    Swal.showValidationMessage(`Request failed: ${err}`);
                  }
                },
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    successSwal("Participants successfully load");
                  }
                })
                .catch((error) => {
                  Swal.showValidationMessage(`Request failed: ${error}`);
                });
            } else {
              errorSwal("Drop Database first!");
            }
          }
        }}
        type="button"
        className={buttonClass}
      >
        Generate{" "}
      </button>
      <button
        onClick={() => {
          if (query == 0) {
            errorSwal("Generate and Query Data first");
          } else {
            queryData();
            luckyDraw();
          }
        }}
        type="button"
        className={buttonClass}
      >
        Lucky Draw{" "}
      </button>
    </div>
  );
};

export default ButtonsTest;
