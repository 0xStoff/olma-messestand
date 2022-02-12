import { Tooltip, OverlayTrigger } from "react-bootstrap";
<Tooltip
  text={`Wählt zufällige Gewinner aus der Datenbank (erhöhte Chance mit Selfie). Wurden Teilnehmer generiert, so wird automatisch angenommen, sie hätten die Fragen im Gewinnspiel richtig beantwortet. Neue Teilnehmer (hinzugefügt über das Formular) sind nur Teilnahmeberechtigt, wenn alle Fragen richtig beantwortet wurden.`}
/>;
const Buttons = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";
  const { queryData, query, errorSwal, luckyDraw } = props;

  const handleClickLuckyDraw = async () => {
    if (query == 0) {
      errorSwal("Generate and Query Data first");
    } else {
      const teilnehmer = await queryData();
      if (teilnehmer.data.length >= 32) {
        luckyDraw();
      } else {
        errorSwal("Need more Pariticipants (min 32)");
      }
    }
  };

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 1000, hide: 400 }}
      overlay={
        <Tooltip>
          Wählt zufällige Gewinner aus der Datenbank (erhöhte Chance mit
          Selfie). Wurden Teilnehmer generiert, so wird automatisch angenommen,
          sie hätten die Fragen im Gewinnspiel richtig beantwortet. Neue
          Teilnehmer (hinzugefügt über das Formular) sind nur
          Teilnahmeberechtigt, wenn alle Fragen richtig beantwortet wurden.
        </Tooltip>
      }
    >
      <button
        onClick={() => {
          handleClickLuckyDraw();
        }}
        type="button"
        className={buttonClass}
      >
        Lucky Draw{" "}
      </button>
    </OverlayTrigger>
  );
};

export default Buttons;
