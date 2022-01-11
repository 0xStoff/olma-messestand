const UmfrageContent = (props) => {
  let visibleClass = !props.surveyStart ? "fadeIn" : "fadeOut visible";
  let rangeClass = !props.surveyStart ? "form-range mb-4" : "visible";
  return (
    <div className={`${visibleClass} container w-50 d-flex flex-column`}>
      <p className={visibleClass}>Wie hat dir unser Stand gefallen?</p>
      <input
        type="range"
        className={rangeClass}
        min="0"
        max="9"
        step="1"
        id="customRange1"
      />
      <p className={visibleClass}>Wie empfindest du die Website?</p>
      <input
        type="range"
        className={rangeClass}
        min="0"
        max="9"
        step="1"
        id="customRange2"
      />
      <p className={visibleClass}>Würdest du wiederkommen?</p>
      <input
        type="range"
        className={rangeClass}
        min="0"
        max="9"
        step="1"
        id="customRange3"
      />
      <p className={visibleClass}>Wie hast du die Betreuung empfunden?</p>

      <input
        type="range"
        className={rangeClass}
        min="0"
        max="9"
        step="1"
        id="customRange4"
      />
      <p className={visibleClass}>Würdest du uns weiterempfehlen?</p>
      <input
        type="range"
        className={rangeClass}
        min="0"
        max="9"
        step="1"
        id="customRange5"
      />
      <button className="btn btn-outline-dark buttonTheme mt-5 mb-5 mx-auto">
        Absenden
      </button>
    </div>
  );
};

export default UmfrageContent;
