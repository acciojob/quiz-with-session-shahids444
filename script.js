const questionsData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: 0
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: 0
  },
  {
    question: "What is 2 + 2?",
    options: ["4", "3", "5", "6"],
    answer: 0
  },
  {
    question: "Which language runs in a web browser?",
    options: ["JavaScript", "Java", "C", "Python"],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Creative Style System"
    ],
    answer: 0
  }
];

// DOM elements
const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Restore saved progress
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
questionsData.forEach((q, qIndex) => {
  const qContainer = document.createElement("div");
  const question = document.createElement("p");
  question.textContent = q.question; // Do not add number prefix
  qContainer.appendChild(question);

  q.options.forEach((opt, optIndex) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `q${qIndex}`;
    radio.value = optIndex;

    // Restore previous selection
    if (savedProgress[`q${qIndex}`] == optIndex) {
      radio.checked = true;
      radio.setAttribute("checked", "true"); // Important for Cypress
    }

    // Save selection to sessionStorage
    radio.addEventListener("change", () => {
      savedProgress[`q${qIndex}`] = optIndex;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(radio);
    label.append(` ${opt}`);
    qContainer.appendChild(label);
    qContainer.appendChild(document.createElement("br"));
  });

  questionsDiv.appendChild(qContainer);
});

// Handle submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  questionsData.forEach((q, index) => {
    const selected = savedProgress[`q${index}`];
    if (selected !== undefined && parseInt(selected) === q.answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of ${questionsData.length}.`;
  scoreDiv.textContent = scoreText;
  localStorage.setItem("score", score);
});

// Show last score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questionsData.length}.`;
}
