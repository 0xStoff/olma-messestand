import TooltipComponent from "../_components/common/tooltip";

const UmfrageStart = (props) => {
  const numbers = new Array(10);
  for (let i = 0; i < numbers.length; i++) numbers[i] = i + 1;

  return (
    <div className="container mt-5">
      <div className="container w-50">
        <div className="d-flex justify-content-end">
          <TooltipComponent
            text={`Setze mit dem Slider eine Bewertung von eins bis zehn. Der Slider dient nur zur Veranschaulichung, die Nummern werden nachher nicht mehr angezeigt. Drücke den Pfeil um die Umfrage zu starten. `}
          />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <p>schlecht</p>
          <p>sehr gut</p>
        </div>
        <div className="d-flex justify-content-between">
          {numbers.map((number) => (
            <p key={number}>{number}</p>
          ))}
        </div>
        <input
          type="range"
          className="form-range"
          min="0"
          max="9"
          step="1"
          id="customRange0"
        />
        <i
          type="button"
          onClick={props.handleClick}
          className="fa fa-angle-down arrow"
        ></i>
      </div>
    </div>
  );
};

export default UmfrageStart;
