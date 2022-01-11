import React, { useState } from "react";
import UmfrageStart from "./UmfrageStart";
import UmfrageContent from "./UmfrageContent";
const Umfrage = () => {
  const [surveyStart, setSurveyStart] = useState(true);

  const handleClick = () => {
    setSurveyStart(() => false);
  };
  return (
    <div className="container">
      <h1 className="text-center feedbackTitle">
        Wir wären dir für dein Feedback sehr verbunden!
      </h1>
      <div className={surveyStart ? "fadeIn" : "fadeOut"}>
        <UmfrageStart handleClick={handleClick} />
      </div>
      <div className={!surveyStart ? "fadeIn" : "fadeOut"}>
        <UmfrageContent surveyStart={surveyStart} />
      </div>

      {/* <div className={!surveyStart ? "fadeIn" : "fadeOut"}>
        <UmfrageContent />
      </div> */}
    </div>
  );
};

export default Umfrage;
