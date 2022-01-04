import React, { useState, useCallback } from "react";
import * as Survey from "survey-react";
import { Model } from "survey-react";
import "survey-react/survey.css";
import { raffleQuestions } from "./services/raffleQuestions";

const json = raffleQuestions();

const SurveyComponent = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [surveyResult, setSurveyResult] = useState(false);

  const arrayEquals = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  const onComplete = (survey) => {
    setIsCompleted(() => true);

    let answers = [];
    let index = 0;
    for (let prop in survey.data) {
      answers[index] = survey.data[prop];
      index++;
    }
    index = 0;

    let correctAnswer = [];
    for (let i = 0; i < json.pages.length; i++) {
      correctAnswer[i] = json.pages[i].elements[0].correctAnswer;
    }
    correctAnswer = correctAnswer.slice(1);

    setSurveyResult(() => {
      if (arrayEquals(answers, correctAnswer)) return true;
      else return false;
    });
  };

  const handlePanel = (sender, panel) => {
    // console.log(panel.text);
    // return <h1></h1>;
  };

  // const handleTimer = (data) => {
  //   console.log(data);
  //   return <h1>hello</h1>;
  // };

  let remainingTime;
  let surveyRender = !isCompleted ? (
    <Survey.Survey
      json={json}
      showCompletedPage={true}
      onComplete={onComplete}
      // onCurrentPageChanged={() => {

      // }}
      onTimerPanelInfoText={(sender, panel) => {
        remainingTime = 60 - sender.timeSpent;

        panel.text = `verbleibende Zeit: ${remainingTime}`;
      }}
    />
  ) : null;

  return <div>{surveyRender}</div>;
};

const Raffle = () => {
  return (
    <div className="w-75 mt-5 mx-auto">
      <SurveyComponent />
    </div>
  );
};

export default Raffle;
