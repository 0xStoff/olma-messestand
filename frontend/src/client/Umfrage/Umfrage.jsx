import React, { useState, useEffect, useRef } from "react";
import Start from "./Start";
import Content from "./Content";
import Chart from "./Chart";
import { sendUmfrageResults, getUmfrageResult } from "./umfrageServices";
// let resultFragen = [40, 50, 50, 60, 70];
const Umfrage = (props) => {
  const { successSwal } = props;
  const [surveyStart, setSurveyStart] = useState(true);
  const [resultFragen, setResultFragen] = useState([40, 50, 50, 60, 70]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [surveySite, setSurveySite] = useState(0);

  const inputEl = useRef(null);

  const handleClick = () => {
    setSurveyStart(() => false);
    inputEl.current.focus();
  };

  useEffect(() => {
    console.log(surveySite);

    displayChart();
  }, []);

  const displayChart = async () => {
    let results = [0, 0, 0, 0, 0];
    const response = await getUmfrageResult();
    for (let z = 0; z < resultFragen.length; z++) {
      for (let i = 0; i < response.data.length; i++) {
        results[z] += response.data[i][`frage_${z}`];
        // console.log(response.data[i][`frage_${z}`]);
      }
    }

    const resultMap = results.map(
      (result) => Math.round((result / response.data.length) * 100) / 100
    );

    // console.log(resultMap);
    // for (let z = 0; z < resultFragen.length; z++) {
    //   for (let i = 0; i < response.data.length; i++) {
    //     resultArr[z] += response.data[i][`frage_${z}`];
    //     // console.log(response.data[i][`frage_${z}`]);
    //   }
    // }

    // const objresultFragen = { ...resultFragen };
    setResultFragen(() => {
      return resultMap;
    });
    // console.log(data);
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
      />
      <div className={isSubmitted && surveyStart ? "fadeIn mb-5" : "fadeOut"}>
        <Chart resultFragen={resultFragen} />
      </div>
    </div>
  );
};

export default Umfrage;
