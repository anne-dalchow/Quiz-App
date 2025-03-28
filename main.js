/*Best Pratice for Clean Code

function showQuestion (){
if (gameIsOver()){
showEndScreen();}
else{
updateProgressBar();
updateToNextQuestion()};
}*/

let currentQuestion = 0;
let currentAnswers = 0;
let currentRightAnswer = 0;
let currentQuestionNumber = 1;
let score = 0;

let audioSuccsess = new Audio("./assets/audio/win.mp3");
let audioFail = new Audio("./assets/audio/fail.mp3");

function init() {
  document.querySelector(".start-menu-body").style.display = "flex";
  document.querySelector(".endcard-body").style.display = "none";
}

function renderQA() {
  showQuestion();
  showAnswers();
}
function startQuizBtn() {
  document.querySelector(".start-menu-body").style.display = "none";
  document.querySelector(".card-body").style.display = "flex";
  document.getElementById("question-array-length").innerHTML =
    allHTMLQuestions.length;
  document.getElementById("current-question-number").innerHTML =
    currentQuestionNumber;
  renderQA();
}
function nextQuestionBtn() {
  currentQuestion += 1;
  currentAnswers += 1;
  currentRightAnswer += 1;
  currentQuestionNumber += 1;

  if (currentQuestion >= allHTMLQuestions.length) {
    showEndcard();
  } else {
    document.getElementById("current-question-number").innerHTML =
      currentQuestionNumber;
    document.querySelectorAll(".answer-card-container").forEach((button) => {
      button.classList.remove("bg-danger");
      button.classList.remove("bg-success");
    });
    document.querySelector("#next-question-btn").disabled = true;
    updateProgressBar();
    renderQA();
  }
}

function showQuestion() {
  document.getElementById("questions").innerHTML = "";
  let question = allHTMLQuestions[currentQuestion].question;
  document.getElementById("questions").innerHTML = question;
}

function showAnswers() {
  let answers = allHTMLQuestions[currentAnswers].answers;
  let answerContainers = document.querySelectorAll(".answer-card");
  answerContainers.innerHTML = "";

  answerContainers.forEach((container, index) => {
    container.innerHTML = "";
    if (index < answers.length) {
      container.innerHTML = answers[index];
    }
  });
}
function checkAnswers(answerIndex, event) {
  let clickedAnswer = allHTMLQuestions[currentQuestion].answers[answerIndex];
  let correctAnswerIndex = allHTMLQuestions[currentQuestion].right_answer;
  let correctAnswer =
    allHTMLQuestions[currentQuestion].answers[correctAnswerIndex];

  if (clickedAnswer === correctAnswer) {
    event.target.parentNode.classList.add("bg-success");
    event.target.innerHTML += `<i class="fa-solid fa-check">`;
    score += 1;
  } else {
    event.target.parentNode.classList.add("bg-danger");
    event.target.innerHTML += `<i class="fa-solid fa-xmark"></i>`;

    const rightAnswerElement =
      document.querySelectorAll(".answer-card")[correctAnswerIndex];
    rightAnswerElement.parentNode.classList.add("bg-success");
    rightAnswerElement.innerHTML += `<i class="fa-solid fa-check">`;
  }

  document.querySelector("#next-question-btn").disabled = false;
}

document.querySelectorAll(".answer-card").forEach((button, index) => {
  button.addEventListener("click", function (event) {
    checkAnswers(index, event);
  });
});

function updateProgressBar() {
  let progressBar = document.querySelector(".progress-bar");
  let progressBarWidth = parseInt(progressBar.style.width);
  let addProgressWidth = Math.round(100 / allHTMLQuestions.length);

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

  if (allHTMLQuestions) {
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
  if (score === allHTMLQuestions.length) {
    audioSuccsess.play();
    scoreContainer.innerHTML = ` ${score} / ${allHTMLQuestions.length} <br> You are amazing! `;
  } else {
    scoreContainer.innerHTML = ` ${score} / ${allHTMLQuestions.length}`;
    audioFail.play();
  }
}
