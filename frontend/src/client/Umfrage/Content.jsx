import { Form, Col } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { sendUmfrageResults, getUmfrageResult } from "./umfrageServices";

const UmfrageContent = (props) => {
  let visibleClass = !props.surveyStart ? "fadeIn" : "fadeOut visible";
  let rangeClass = !props.surveyStart ? "form-range mb-4" : "visible";
  let btnClass = "btn btn-outline-dark buttonTheme mt-5 mb-5 mx-auto";
  const {
    successSwal,
    displayChart,
    setIsSubmitted,
    setSurveyStart,
    inputEl,
    surveyStart,
  } = props;
  const [rangeInputs, setRangeInputs] = useState({
    frage0: 10,
    frage1: 10,
    frage2: 10,
    frage3: 10,
    frage4: 10,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendUmfrageResults(rangeInputs);
    await getUmfrageResult().then((data) => {
      displayChart(data);
      successSwal("Vielen Dank für die Teilnahme!");
      setIsSubmitted(() => true);
      setSurveyStart(() => true);
    });
  };

  // const getUmfrageData = async () => {
  //   console.log(response.data);
  // };

  const handleInput = (e) => {
    setRangeInputs((state) => {
      const range = e.target.id;
      const value = parseInt(e.target.value) + 1;
      return { ...state, [range]: value };
    });
  };
  return (
    <form
      className={`${visibleClass} container w-75 d-flex flex-column rangeContainer`}
      onSubmit={handleSubmit}
      onInput={handleInput}
    >
      <div className={!surveyStart ? "fadeIn" : "fadeOut"}>
        <p className={visibleClass}>Wie hat dir unser Stand gefallen?</p>
        <input
          type="range"
          className={rangeClass}
          min="0"
          max="9"
          step="1"
          id="frage0"
        />
        <p className={visibleClass}>Wie empfindest du die Website?</p>
        <input
          type="range"
          className={rangeClass}
          min="0"
          max="9"
          step="1"
          id="frage1"
        />
        <p className={visibleClass}>Würdest du wiederkommen?</p>
        <input
          type="range"
          className={rangeClass}
          min="0"
          max="9"
          step="1"
          id="frage2"
        />
        <p className={visibleClass}>Wie hast du die Betreuung empfunden?</p>

        <input
          type="range"
          className={rangeClass}
          min="0"
          max="9"
          step="1"
          id="frage3"
        />
        <p className={visibleClass}>Würdest du uns weiterempfehlen?</p>
        <input
          type="range"
          className={rangeClass}
          min="0"
          max="9"
          step="1"
          id="frage4"
          // value={value}
        />
      </div>
      <button ref={inputEl} type="submit" className={btnClass}>
        Absenden
      </button>
    </form>
  );
};

export default UmfrageContent;
