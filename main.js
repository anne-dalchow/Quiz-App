let currentQuestion = 0; // wenn auf next question button müssen diese eins plus bekommen
let currentAnswers = 0;
let currentRightAnswer = 0;
let currentQuestionNumber = 1;
let score = 0;


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

  if(currentQuestion >= allQuestions.length){
    showEndcard();
  }
  else{
  document.getElementById("current-question-number").innerHTML =
    currentQuestionNumber;

  document.querySelectorAll(".answer-card-container").forEach((button) => {
    button.classList.remove("bg-danger");
    button.classList.remove("bg-success");
      });
  document.querySelector("#next-question-btn").disabled = true;

  renderQA();
    }
    
}

function showQuestion() {

  document.getElementById("questions").innerHTML = "";
  let question = allQuestions[currentQuestion].question;
  document.getElementById("questions").innerHTML = question;
  }


function showAnswers() {

  let answers = allQuestions[currentAnswers].answers;
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
  let clickedAnswer = allQuestions[currentQuestion].answers[answerIndex];
  let correctAnswerIndex = allQuestions[currentQuestion].right_answer;
  let correctAnswer = allQuestions[currentQuestion].answers[correctAnswerIndex];

  if (clickedAnswer === correctAnswer) {
    event.target.parentNode.classList.add("bg-success");
    event.target.innerHTML += `<i class="fa-solid fa-check">`;
    score += 1;
  } else {
    event.target.parentNode.classList.add("bg-danger");
    event.target.innerHTML += `<i class="fa-solid fa-xmark"></i>`;

    const rightAnswerElement = document.querySelectorAll(".answer-card")[correctAnswerIndex];
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


function showEndcard(){
  document.querySelector(".card-body").innerHTML ="";
}