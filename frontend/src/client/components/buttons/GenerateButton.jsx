import Swal from "sweetalert2";

const Buttons = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";
  const {
    queryData,
    query,
    successSwal,
    errorSwal,
    getRandomUsers,
    teilnehmerInput,
  } = props;

  const handleClickGenerate = () => {
    if (!teilnehmerInput) {
      errorSwal("No Input");
    } else {
      if (query.response == undefined || query.response.data.length == 0) {
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
            document.getElementsByClassName("swal2-cancel")[0].style.display =
              "none";
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
  };

  return (
    <button
      onClick={() => {
        handleClickGenerate();
      }}
      type="button"
      className={buttonClass}
    >
      Generate{" "}
    </button>
  );
};

export default Buttons;
