import { Survey, Model } from "survey-react";
import React, { useState, useEffect } from "react";
import "survey-react/survey.css";

import Form from "./components/Form";
import Raffle from "./components/Raffle";

import { raffleQuestions } from "./services/raffleQuestions";

const surveyJson = raffleQuestions();

const Gewinnspiel = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // console.log("completed: ", isCompleted);
  }, [isCompleted]);

  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;

  return (
    <React.Fragment>
      {!isCompleted ? (
        <Raffle
          survey={survey}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
      ) : (
        <Form />
      )}
    </React.Fragment>
  );
};

export default Gewinnspiel;
