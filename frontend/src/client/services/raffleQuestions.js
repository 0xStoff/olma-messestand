export const raffleQuestions = () => {
  let json = {
    title: "Gewinnspiel",
    showProgressBar: "bottom",
    showTimerPanel: "bottom",
    maxTimeToFinishPage: 20,
    maxTimeToFinish: 60,
    firstPageIsStarted: true,
    startSurveyText: "Starte Quiz",
    timerMin: "min",
    timerSec: "sec",
    timerMin: "min",
    timerSec: "sec",
    timerSpentNext: "verbleibende Zeit: {0} / bis nächst Frage {1}",
    completedHtml: `<h2>Vielen Dank für die Teilnahme!</h2><br><br>
      <p class='small'>Du wirst automatisch zum Formular weitergeleitet.</p><br>
      <div class="loader mx-auto"></div>`,

    pages: [
      {
        elements: [
          {
            type: "html",
            html: `Nutze deine Chance ein Auto im Wert von <b>20'000 Fr. zu gewinnen.</b><br>
            <br/>Beantworte die 5 Quizfragen und fülle anschliessend das Formular aus.
            <br/>Du hast pro Frage <b>20 Sekunden</b>, insgesamt aber nur <b>1 Minute Zeit</b>,
             alle Fragen richtig zu beantworten. <br>Klicke auf Starte Quiz, sobald du bereit bist.
             <br><br>Viel Glück!`,
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            isRequired: "true",
            name: "founding",
            choicesOrder: "random",
            choices: ["", "", "", ""],
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            isRequired: "true",
            name: "mascot",
            choicesOrder: "random",
            choices: ["", "", "", ""],
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            isRequired: "true",
            name: "headquarter",
            choicesOrder: "random",
            choices: ["", "", "", ""],
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            isRequired: "true",
            name: "products",
            choicesOrder: "random",
            choices: ["", "", "", ""],
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            isRequired: "true",
            name: "motto",
            choicesOrder: "random",
            choices: ["", "", "", ""],
            // correctAnswer: "Software die begeistert",
          },
        ],
      },
    ],
  };
  return json;
};
