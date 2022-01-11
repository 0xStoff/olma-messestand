import Swal from "sweetalert2";

const Buttons = (props) => {
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

  const handleClickGet = async () => {
    queryData();
  };

  const handleClickDrop = async () => {
    if (query.response == undefined || query.response.data.length == 0) {
      errorSwal("Nothing to drop, generate first!");
    } else {
      const confirm = await confirmSwal("Are you Sure?");

      if (confirm.isConfirmed) {
        successSwal(`Database dropped successfully`);
        dropTable();
      }
    }
  };

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

  const handleClickLuckyDraw = () => {
    if (query == 0) {
      errorSwal("Generate and Query Data first");
    } else {
      queryData();
      if (query > 32) {
        luckyDraw();
      } else {
        errorSwal("Need more Pariticipants (min 32)");
      }
    }
  };

  return (
    <div className="mt-5">
      <button
        onClick={() => {
          handleClickGet();
        }}
        type="button"
        className={buttonClass}
      >
        Query{" "}
      </button>
      <button
        onClick={() => {
          handleClickDrop();
        }}
        type="button"
        className={buttonClass}
      >
        Drop{" "}
      </button>
      <button
        onClick={() => {
          handleClickGenerate();
        }}
        type="button"
        className={buttonClass}
      >
        Generate{" "}
      </button>
      <button
        onClick={() => {
          handleClickLuckyDraw();
        }}
        type="button"
        className={buttonClass}
      >
        Lucky Draw{" "}
      </button>
    </div>
  );
};

export default Buttons;
