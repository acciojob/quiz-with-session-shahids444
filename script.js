const questionsData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: 0 // ✅ First option = correct
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: 0 // ✅ First option = correct
  },
  {
    question: "What is the largest country by area?",
    options: ["China", "USA", "India", "Russia"],
    answer: 3 // ❌ First option is wrong
  },
  {
    question: "Which language runs in a web browser?",
    options: ["JavaScript", "Python", "C++", "Java"],
    answer: 0 // ✅ First option = correct
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheet", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheet"],
    answer: 1 // ❌ First option is wrong
  }
];

// DOM elements
const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Restore progress from sessionStorage
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
questionsData.forEach((q, qIndex) => {
  const qContainer = document.createElement("div");
  const question = document.createElement("p");
  question.textContent = q.question;
  qContainer.appendChild(question);

  q.options.forEach((opt, optIndex) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `q${qIndex}`;
    radio.value = optIndex;

    // Restore checked radio
    if (savedProgress[`q${qIndex}`] == optIndex) {
      radio.checked = true;
      radio.setAttribute("checked", "true"); // required for Cypress
    }

    // Save answer on change
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

// Submit button logic
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

// Restore previous score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questionsData.length}.`;
}
