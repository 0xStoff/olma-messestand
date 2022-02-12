import React, { useState, useEffect, useRef } from "react";
import Start from "./Start";
import Content from "./Content";
import Chart from "./Chart";
import { getUmfrageQuestions, getUmfrageResult } from "./umfrageServices";

const Umfrage = (props) => {
  const { successSwal } = props;
  const [surveyStart, setSurveyStart] = useState(true);
  const [resultFragen, setResultFragen] = useState([40, 50, 50, 60, 70]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [surveySite, setSurveySite] = useState(0);
  const [umfrage, setUmfrage] = useState(0);

  const inputEl = useRef(null);

  const handleClick = () => {
    setSurveyStart(() => false);
    inputEl.current.focus();
  };

  useEffect(() => {
    displayChart();
    getQuestions();
  }, []);

  const getQuestions = async () => {
    let arrQuestions = [];
    const response = await getUmfrageQuestions();
    for (let i = 0; i < response.data.length; i++) {
      arrQuestions[i] = response.data[i].fragen;
    }
    setUmfrage(() => {
      return arrQuestions;
    });
  };
  const displayChart = async () => {
    let results = [];
    const response = await getUmfrageResult();
    for (let z = 0; z < resultFragen.length; z++) {
      results[z] = 0;
      for (let i = 0; i < response.data.length; i++) {
        results[z] += response.data[i][`frage_${z}`];
      }
    }
    const resultMap = results.map(
      (result) => Math.round((result / response.data.length) * 100) / 100
    );
    setResultFragen(() => {
      return resultMap;
    });
  };

  return (
    <div className="container">
      <h1 className="text-center feedbackTitle">
        Wir wären dir für dein Feedback sehr verbunden!
      </h1>
      <Start handleClick={handleClick} />
      <Content
        inputEl={inputEl}
        surveyStart={surveyStart}
        successSwal={successSwal}
        displayChart={displayChart}
        setIsSubmitted={setIsSubmitted}
        setSurveyStart={setSurveyStart}
        umfrage={umfrage}
      />
      <div className={isSubmitted && surveyStart ? "fadeIn mb-5" : "fadeOut"}>
        <Chart resultFragen={resultFragen} umfrage={umfrage} />
      </div>
    </div>
  );
};

export default Umfrage;
