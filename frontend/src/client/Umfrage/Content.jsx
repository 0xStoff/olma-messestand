import { Form, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  sendUmfrageResults,
  getUmfrageResult,
  getUmfrageQuestions,
} from "./umfrageServices";

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
    umfrage,
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
        {umfrage
          ? umfrage.map((um, i) => {
              return (
                <div key={i}>
                  {" "}
                  <p className={visibleClass}>{um}?</p>
                  <input
                    type="range"
                    className={rangeClass}
                    min="0"
                    max="9"
                    step="1"
                    id={`frage${i}`}
                  />
                </div>
              );
            })
          : null}
      </div>
      <button ref={inputEl} type="submit" className={btnClass}>
        Absenden
      </button>
    </form>
  );
};

export default UmfrageContent;
