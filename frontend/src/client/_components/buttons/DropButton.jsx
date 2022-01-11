import { Tooltip, OverlayTrigger } from "react-bootstrap";

const Buttons = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";
  const { query, dropTable } = props;
  const { successSwal, confirmSwal, errorSwal } = props.swalAlerts;

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

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 1000, hide: 400 }}
      overlay={
        <Tooltip>
          Löscht alle Teilnehmer aus der Datenbank. Die Tabelle wird nicht
          effektiv gelöscht, nur alle darin enthaltenen Einträge.
        </Tooltip>
      }
    >
      <button
        onClick={() => {
          handleClickDrop();
        }}
        type="button"
        className={buttonClass}
      >
        Drop{" "}
      </button>
    </OverlayTrigger>
  );
};

export default Buttons;
