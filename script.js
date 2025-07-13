const questionsData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Creative Style System"
    ],
    answer: 1
  }
];

// DOM elements
const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load saved progress
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
questionsData.forEach((q, qIndex) => {
  const qContainer = document.createElement("div");
  const question = document.createElement("p");
  question.textContent = `${qIndex + 1}. ${q.question}`;
  qContainer.appendChild(question);

  q.options.forEach((opt, optIndex) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `q${qIndex}`;
    radio.value = optIndex;

    // Restore saved selection
    if (savedProgress[`q${qIndex}`] == optIndex) {
      radio.checked = true;
    }

    // Save progress to sessionStorage
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

  const scoreMessage = `Your score is ${score} out of ${questionsData.length}.`;
  scoreDiv.textContent = scoreMessage;
  localStorage.setItem("score", score);

  // Optional: Clear sessionStorage after submission
  // sessionStorage.removeItem("progress");
});

// Show previous score if available
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questionsData.length}.`;
}
