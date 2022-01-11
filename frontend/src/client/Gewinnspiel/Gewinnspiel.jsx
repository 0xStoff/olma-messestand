import { Survey, Model } from "survey-react";
import React, { useState, useEffect } from "react";
import "survey-react/survey.css";
import { Container } from "react-bootstrap";

import Form from "./Form";
import Raffle from "./Raffle";

import { raffleQuestions } from "../_services/raffleQuestions";
import { getQuestionsFunctions } from "../_services/tableFunctions";

// const surveyJson = raffleQuestions();
// const getSurveyJson = () => {
//   const test = raffleQuestions();
//   console.log(test);
//   return test;
// };

const Gewinnspiel = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [surveyJson, setSurveyJson] = useState();
  const [survey, setSurvey] = useState(new Model(surveyJson));
  const [startSurvey, setStartSurvey] = useState(false);
  const [surveyResult, setSurveyResult] = useState(false);

  const getQuestions = async () => {
    try {
      const questions = await getQuestionsFunctions();

      if (surveyJson) {
        for (let i = 1; i < surveyJson.pages.length; i++) {
          const survey = surveyJson.pages[i].elements[0];
          survey.title = `${questions.data[i - 1].frage}?`;

          for (let z = 1; z < 4; z++) {}
          survey.choices[0] = `${questions.data[i - 1].antwort}`;
          // survey.correctAnswer = `${questions.data[i - 1].antwort}`;
          survey.choices[1] = `${questions.data[i - 1].choice1}`;
          survey.choices[2] = `${questions.data[i - 1].choice2}`;
          survey.choices[3] = `${questions.data[i - 1].choice3}`;

          surveyJson.pages[i].elements[0].correctAnswer =
            questions.data[i - 1].antwort;
        }

        // let correctAnswer = [];

        // correctAnswer = correctAnswer.slice(1);
      }

      setSurvey(() => {
        return new Model(surveyJson);
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    setSurveyJson(() => raffleQuestions());
  }, []);

  // survey.focusFirstQuestionAutomatic = false;
  useEffect(() => {
    // console.log("completed: ", isCompleted);
  }, [isCompleted]);

  return (
    <React.Fragment>
      {!startSurvey ? (
        <div className="container d-flex">
          <button
            onClick={async () => {
              await getQuestions();
              setStartSurvey(() => true);
            }}
            type="button"
            className="btn btn-outline-dark mx-auto buttonTheme"
          >
            Hier gehts zum Gewinnspiel{" "}
          </button>{" "}
        </div>
      ) : null}

      {!startSurvey ? null : !isCompleted ? (
        <Raffle
          survey={survey}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          surveyResult={surveyResult}
          setSurveyResult={setSurveyResult}
        />
      ) : (
        <Form successSwal={props.successSwal} surveyResult={surveyResult} />
      )}
    </React.Fragment>
  );
};

export default Gewinnspiel;
