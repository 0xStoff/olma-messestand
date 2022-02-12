import { Tooltip, OverlayTrigger } from "react-bootstrap";

const Button = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";

  const { queryData } = props;

  const handleClickGet = async () => {
    queryData();
  };

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 1000, hide: 400 }}
      overlay={
        <Tooltip>
          Liest vorhandene Daten aus der Datenbank und zeigt sie unter
          Teilnehmer an. Ist die Datenbank leer, gibt es eine entsprechende
          Fehlermeldung.
        </Tooltip>
      }
    >
      <button
        onClick={() => {
          handleClickGet();
        }}
        type="button"
        className={buttonClass}
      >
        Query{" "}
      </button>
    </OverlayTrigger>
  );
};

export default Button;
