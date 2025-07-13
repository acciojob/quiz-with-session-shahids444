// Your JS code here

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// HTML elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Restore saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous
  questions.forEach((question, i) => {
    const questionContainer = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    question.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.setAttribute("type", "radio");
      radio.setAttribute("name", `question-${i}`);
      radio.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        radio.checked = true;
        radio.setAttribute("checked", "true"); // Important for Cypress
      }

      // Save progress on change
      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      questionContainer.appendChild(label);
      questionContainer.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionContainer);
  });
}

// Handle quiz submission
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((question, i) => {
    const selected = userAnswers[i];
    if (selected === question.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = resultText;
  localStorage.setItem("score", score);
});

// Display score if it exists in localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Initial render
renderQuestions();
