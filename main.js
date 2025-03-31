/*Best Pratice for Clean Code

function showHTMLQuestion (){
if (gameIsOver()){
showEndScreen();}
else{
updateProgressBar();
updateToNextQuestion()};
}*/

/**
<!-- onclick load allHTMLQuestion -->
<h4>HTML</h4>
<!-- onclick load allCSSQuestion -->
<h4>CSS</h4>
<!-- onclick load allJSQuestion -->
<h4>JS</h4>
 */

let selectedQuiz;
let currentQuestion = 0;
let currentQuizAnswers = 0;
let currentQuestionNumber = 1;
let score = 0;

let audioSuccess = new Audio("./assets/audio/win.mp3");
let audioFail = new Audio("./assets/audio/fail.mp3");

function init() {
  document.querySelector(".start-menu-body").style.display = "flex";
  document.querySelector(".endcard-body").style.display = "none";
}

function renderQA() {
  showQuestion();
  showAnswers();
}
function startQuiz(selectedQuiz) {
  const startMenu = document.querySelector(".start-menu-body");
  const topicsContainer = document.querySelector(".quiz-topics-container");
  const cardBody = document.querySelector(".card-body");

  setTimeout(() => {
    startMenu.style.display ="none";
    topicsContainer.style.display = "flex";
    cardBody.style.display ="flex";
    setTimeout(() => {
      topicsContainer.classList.add("visible");
      cardBody.classList.add("visible");
    }, 1); // Kleines Delay für die Transition
  }, 100);

  document.getElementById("question-array-length").innerHTML =
    selectedQuiz.length;
  document.getElementById("current-question-number").innerHTML =
    currentQuestionNumber;
  renderQA();
}

function initSelectedQuiz(event) {
 // Startet nach der Breiten-Animation

  if (event.target === document.getElementById("html-quiz")) {
    selectedQuiz = allHTMLQuestions;
  } else if (event.target === document.getElementById("css-quiz")) {
    selectedQuiz = allCSSQuestions;
  } else if (event.target === document.getElementById("js-quiz")) {
    selectedQuiz = allJSQuestions;
  }
  startQuiz(selectedQuiz);
}

function nextQuestionBtn() {
  currentQuestion++;
  currentQuestionNumber++;
  currentQuizAnswers++;

  if (currentQuestion >= selectedQuiz.length) {
    showEndcard();
  } else {
    document.getElementById("current-question-number").innerHTML =
      currentQuestionNumber;
    document.querySelector("#next-question-btn").disabled = true;
    resetAnswerStyles();
    updateProgressBar();
    renderQA();
  }
}

function resetAnswerStyles() {
  document.querySelectorAll(".answer-card-container").forEach((button) => {
    button.classList.remove("bg-danger", "bg-success");
  });
}

function showQuestion() {
  let question = selectedQuiz[currentQuestion].question;
  document.getElementById("questions").innerHTML = question;
}

function showAnswers() {
  let answers = selectedQuiz[currentQuizAnswers].answers;
  let answerContainers = document.querySelectorAll(".answer-card");

  answerContainers.forEach((container, index) => {
    container.innerHTML = "";
    if (index < answers.length) {
      container.innerHTML = answers[index];
    }
  });
}

document.querySelectorAll(".answer-card").forEach((button, index) => {
  button.addEventListener("click", function (event) {
    checkAnswers(index, event);
  });
});

function checkAnswers(answerIndex, event) {
  let clickedAnswer = selectedQuiz[currentQuestion].answers[answerIndex];
  let correctAnswerIndex = selectedQuiz[currentQuestion].right_answer;
  let correctAnswer = selectedQuiz[currentQuestion].answers[correctAnswerIndex];

  if (clickedAnswer === correctAnswer) {
    showRightAnswer(event);
  } else {
    showWrongAnswer(event, correctAnswerIndex);
  }
  document.querySelector("#next-question-btn").disabled = false;
}

function showRightAnswer(event) {
  event.target.parentNode.classList.add("bg-success");
  event.target.innerHTML += `<i class="fa-solid fa-check">`;
  score += 1;
}

function showWrongAnswer(event, correctAnswerIndex) {
  event.target.parentNode.classList.add("bg-danger");
  event.target.innerHTML += `<i class="fa-solid fa-xmark"></i>`;

  const rightAnswerElement =
    document.querySelectorAll(".answer-card")[correctAnswerIndex];
  rightAnswerElement.parentNode.classList.add("bg-success");
  rightAnswerElement.innerHTML += `<i class="fa-solid fa-check">`;
}

function updateProgressBar() {
  let progressBar = document.querySelector(".progress-bar");
  let progressBarWidth = parseInt(progressBar.style.width) || 0;
  let addProgressWidth = Math.round(100 / selectedQuiz.length);

  progressBarWidth += addProgressWidth;
  progressBar.style.width = progressBarWidth + "%";
  progressBar.innerHTML = `${progressBarWidth}%`;
}

function showEndcard() {
  let cardBody = document.querySelector(".card-body");
  cardBody.style.display = "none";

  let endcardBody = document.querySelector(".endcard-body");
  endcardBody.style.display = "flex";
  showScore();

  if (selectedQuiz) {
    document.querySelector(".quiz-topic-tag").innerHTML = "HTML";
  } else if (allCSSQuestions) {
    document.querySelector(".quiz-topic-tag").innerHTML = "CSS";
  } else if (allJSQuestions) {
    document.querySelector(".quiz-topic-tag").innerHTML = "JavaScript";
  }

  let reloadBtn = document.getElementById("reload-btn");
  reloadBtn.addEventListener("click", () => {
    location.reload();
  });
}

function showScore() {
  let scoreContainer = document.getElementById("score-container");
  if (score === selectedQuiz.length) {
    audioSuccess.play();
    scoreContainer.innerHTML = ` ${score} / ${selectedQuiz.length} <br> You are amazing! `;
  } else {
    scoreContainer.innerHTML = ` ${score} / ${selectedQuiz.length}`;
    audioFail.play();
  }
}
