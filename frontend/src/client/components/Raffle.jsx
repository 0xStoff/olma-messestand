import { Survey, Model } from "survey-react";
import React, { useState, useEffect } from "react";
import "survey-react/survey.css";
import { raffleQuestions } from "../services/raffleQuestions";

const Raffle = (props) => {
  const surveyJson = raffleQuestions();
  const { isCompleted, setIsCompleted, survey } = props;

  const [surveyResult, setSurveyResult] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);

  const arrayEquals = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  // const survey = new Model(surveyJson);
  // survey.focusFirstQuestionAutomatic = false;
  // const handleComplete = (sender) => {
  //  const results = JSON.stringify(sender.data);
  //   let answers = [];
  //   let index = 0;
  //   for (let prop in sender.data) {
  //     answers[index] = sender.data[prop];
  //     index++;
  //   }
  //   index = 0;
  //   let correctAnswer = [];
  //   for (let i = 0; i < surveyJson.pages.length; i++) {
  //     correctAnswer[i] = surveyJson.pages[i].elements[0].correctAnswer;
  //   }
  //   correctAnswer = correctAnswer.slice(1);

  useEffect(() => {
    // console.log("result: ", surveyResult);
  }, [surveyResult]);

  const handleComplete = (sender) => {
    // const results = JSON.stringify(sender.data);
    let answers = [];
    let index = 0;
    // return sender.data;

    for (let prop in sender.data) {
      answers[index] = sender.data[prop];
      index++;
    }

    let correctAnswer = [];
    for (let i = 0; i < surveyJson.pages.length; i++) {
      correctAnswer[i] = surveyJson.pages[i].elements[0].correctAnswer;
    }
    correctAnswer = correctAnswer.slice(1);

    setTimeout(() => {
      setIsCompleted(() => true);

      setSurveyResult(() => {
        if (arrayEquals(answers, correctAnswer)) return true;
        else return false;
      });
    }, 3000);
    return { surveyResult, isCompleted };
  };

  return (
    <div className="w-75 mt-5 mx-auto mb-5">
      <Survey
        onTimerPanelInfoText={(sender, panel) => {
          let remainingTime = 60 - sender.timeSpent;
          panel.text = `verbleibende Zeit: ${remainingTime}`;
        }}
        onComplete={(sender) => {
          handleComplete(sender);
        }}
        // onComplete={(sender) => {
        //   onQuizComplete(sender);
        //   console.log("test");
        // }}
        model={survey}
      />
    </div>
  );
};

export default Raffle;
