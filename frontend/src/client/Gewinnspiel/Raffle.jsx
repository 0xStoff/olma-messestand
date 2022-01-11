import { Survey } from "survey-react";
import React from "react";
import "survey-react/survey.css";
import { raffleQuestions } from "../_services/raffleQuestions";
import { getQuestionsFunctions } from "../_services/tableFunctions";

const Raffle = (props) => {
  let surveyJson = raffleQuestions();

  const { isCompleted, setIsCompleted, survey } = props;

  const arrayEquals = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  const handleComplete = async (sender) => {
    const questions = await getQuestionsFunctions();

    let answers = [];
    let index = 0;
    for (let prop in sender.data) {
      answers[index] = sender.data[prop];
      index++;
    }

    let correctAnswer = [];
    for (let i = 1; i < surveyJson.pages.length; i++) {
      correctAnswer[i] = questions.data[i - 1].antwort;
    }
    correctAnswer = correctAnswer.slice(1);

    props.setSurveyResult(() => {
      if (arrayEquals(answers, correctAnswer)) return true;
      else return false;
    });
    setTimeout(() => {
      setIsCompleted(() => true);
    }, 3000);
    const surveyResult = props.surveyResult;

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
        model={survey}
      />
    </div>
  );
};

export default Raffle;
