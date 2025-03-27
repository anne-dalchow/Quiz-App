let currentQuestion = 0; // wenn auf next question button müssen diese eins plus bekommen
let currentAnswers = 0;
let currentRightAnswer = 0;
let currentQuestionNumber = 1;

function init() {
  document.getElementById("question-array-length").innerHTML =
    allQuestions.length;
  document.getElementById("current-question-number").innerHTML =
    currentQuestionNumber;
  renderQA();
}

function renderQA() {
  showQuestion();
  showAnswers();
}

function nextQuestionBtn() {
  currentQuestion += 1;
  currentAnswers += 1;
  currentRightAnswer += 1;
  currentQuestionNumber += 1;
  document.getElementById("current-question-number").innerHTML =
    currentQuestionNumber;


    document.querySelectorAll(".answer").forEach(button => {
     button.style.backgroundColor = "";
    })

  renderQA();
}

function showQuestion() {
  document.getElementById("questions").innerHTML = "";
  let question = allQuestions[currentQuestion].question;
  document.getElementById("questions").innerHTML = question;
}

function showAnswers() {
  let answers = allQuestions[currentAnswers].answers;
  let answerContainers = document.querySelectorAll(".answer");
  answerContainers.innerHTML = "";

  answerContainers.forEach((container, index) => {
    container.innerHTML = "";
    if (index < answers.length) {
      container.innerHTML = answers[index];
    }
  });
}

function checkAnswers(answerIndex, event) {
  let clickedAnswer = allQuestions[currentQuestion].answers[answerIndex];
  let correctAnswerIndex = allQuestions[currentQuestion].right_answer;
  let correctAnswer = allQuestions[currentQuestion].answers[correctAnswerIndex];

  if (clickedAnswer === correctAnswer) {
    event.target.style.backgroundColor = "green";
  } else {
    event.target.style.backgroundColor = "red";

    const rightAnswerElement =
      document.querySelectorAll(".answer")[correctAnswerIndex];
    rightAnswerElement.style.backgroundColor = "green";
  }
}

document.querySelectorAll(".answer").forEach((button, index) => {
  button.addEventListener("click", function (event) {
    checkAnswers(index, event);
  });
});
