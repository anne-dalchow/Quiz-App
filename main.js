let selectedQuiz;
let currentQuestion = 0;
let currentQuestionNumber = 1;
let score = 0;

const startMenu = document.querySelector(".start-menu-body");
const cardBody = document.querySelector(".card-body");
const endcardBody = document.querySelector(".endcard-body");

const audioGameOver = new Audio("./assets/audio/win.mp3");

function init() {
  startMenu.style.display = "flex";
  endcardBody.style.display = "none";
}

function renderQA() {
  showQuestion();
  showAnswers();
}
function startQuiz() {
  score = 0;

  setTimeout(() => {
    document.getElementById("welcome-text").style.display ="none";
    startMenu.classList.remove("start-menu-body");
    startMenu.classList.add("quiz-topics-container","visible");
    cardBody.style.display ="flex";

    setTimeout(() => {
      cardBody.classList.add("visible");
    }, 1); 
  }, 100);

  document.getElementById("question-array-length").innerHTML =
    selectedQuiz.length;
  document.getElementById("current-question-number").innerHTML =
    currentQuestionNumber;

  renderQA();
}

function initSelectedQuiz(event) {
  const htmlQuiz = document.getElementById("html-quiz");
  const cssQuiz = document.getElementById("css-quiz");
  const jsQuiz = document.getElementById("js-quiz");

  if (event.target === htmlQuiz) {
    selectedQuiz = allHTMLQuestions;
    htmlQuiz.parentNode.classList.add("current-quiz-topic");
  } else if (event.target === cssQuiz) {
    selectedQuiz = allCSSQuestions;
    cssQuiz.parentNode.classList.add("current-quiz-topic");
  } else if (event.target === jsQuiz) {
    selectedQuiz = allJSQuestions;
    jsQuiz.parentNode.classList.add("current-quiz-topic");
  }
  document.querySelectorAll(".quiz-topics h4").forEach((h4)=>{
    h4.removeAttribute("onclick");
    h4.parentNode.style.cursor ="default";
  })

  startQuiz();
} 

function nextQuestionBtn() {
  currentQuestion++;
  currentQuestionNumber++;

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
  document.querySelectorAll(".answer-card-container").forEach((div) => {
    div.classList.remove("bg-danger", "bg-success", "disabled");
    div.style.opacity = 1;
  });
}

function showQuestion() {
  let question = selectedQuiz[currentQuestion].question;
  document.getElementById("questions").innerHTML = question;
}

function showAnswers() {
  let answers = selectedQuiz[currentQuestion].answers;
  let answerContainers = document.querySelectorAll(".answer-card");

  answerContainers.forEach((container, index) => {
    container.innerHTML = "";
    if (index < answers.length) {
      container.innerHTML = answers[index];
    } else {
      container.style.display = "none";
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
  if(!event.target.querySelector("i.fa-check")){
    event.target.innerHTML += `<i class="fa-solid fa-check">`;
    event.target.parentNode.classList.add("bg-success");
    score += 1;
  }
  showDisabledAnswers();
}

function showWrongAnswer(event, correctAnswerIndex) {
  if(!event.target.querySelector("i.fa-xmark")){
    event.target.innerHTML += `<i class="fa-solid fa-xmark"></i>`;
    event.target.parentNode.classList.add("bg-danger");
  }

  const rightAnswerElement =
    document.querySelectorAll(".answer-card")[correctAnswerIndex];

  if(!rightAnswerElement.querySelector("i.fa-check")){
    rightAnswerElement.parentNode.classList.add("bg-success");
    rightAnswerElement.innerHTML += `<i class="fa-solid fa-check">`;
  }
  showDisabledAnswers();
}

function showDisabledAnswers() {
  document.querySelectorAll(".answer-card-container").forEach((div) => {
    div.classList.add("disabled");

    if(!div.classList.contains("bg-success") && !div.classList.contains("bg-danger")){
      div.style.opacity = 0.5;
    }
  });
}

function updateProgressBar() {
  let progressBar = document.querySelector(".progress-bar");
  let progressBarWidth = Math.round((currentQuestion / selectedQuiz.length) * 100);

  progressBar.style.width = progressBarWidth + "%";
  progressBar.innerHTML = `${progressBarWidth}%`;
}

function showEndcard() {
  setTimeout(() => {
    cardBody.style.display = "none";
    startMenu.style.display = "none";
    endcardBody.style.display = "flex";
    setTimeout(() => {
      endcardBody.classList.add("visible");
    }, 10); 
  }, 300);
  showScore();

  if (selectedQuiz === allHTMLQuestions) {
    document.querySelector(".quiz-topic-tag").innerHTML = "HTML";
  } else if (selectedQuiz === allCSSQuestions) {
    document.querySelector(".quiz-topic-tag").innerHTML = "CSS";
  } else if (selectedQuiz === allJSQuestions) {
    document.querySelector(".quiz-topic-tag").innerHTML = "JavaScript";
  }

  let reloadBtn = document.getElementById("reload-btn");
  reloadBtn.removeEventListener("click", reloadPage);
  reloadBtn.addEventListener("click", reloadPage);
}
function reloadPage() {
  location.reload();
}

function showScore() {
  let scoreContainer = document.getElementById("score-container");
  if (score === selectedQuiz.length) {
    scoreContainer.innerHTML = ` ${score} / ${selectedQuiz.length} <br> You are amazing! `;
  } else {
    scoreContainer.innerHTML = ` ${score} / ${selectedQuiz.length} <br> Keep going!`;
  }
  audioGameOver.play();
}



/*
- Onclick Events entfernen und durch addEventlistener ersetzen
  <body onload="init()">
  -----------------------------------------------------------------------------------------------

<div class="quiz-topics">
<div>
<h4 id="html-quiz" onclick="initSelectedQuiz(event)">HTML</h4>
</div>
<div>
<h4 id="css-quiz" onclick="initSelectedQuiz(event)">CSS</h4>
</div>
<div>
<h4 id="js-quiz" onclick="initSelectedQuiz(event)">JS</h4>
</div>
</div>
-----------------------------------------------------------------------------------------------

<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Cancel </button>
<button type="button" class="btn btn-primary" onclick="reloadPage()"> Yes </button>
</div>
-----------------------------------------------------------------------------------------------

<div class="question-footer">
<button
type="button"
class="btn btn-primary"
id="next-question-btn"
onclick="nextQuestionBtn()"
disabled> 
Next Question
</button>
</div>
-----------------------------------------------------------------------------------------------
 */