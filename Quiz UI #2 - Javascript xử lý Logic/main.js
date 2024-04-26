// ________FAKE_DATA_______________
const questions = [
  {
    quiz_id: 1,
    question:
      "You can learn a lot about the local _______ by talking to local people.",
    answers: ["territory", "area", "land", "nation"],
  },
  {
    quiz_id: 2,
    question:
      "It's good to have someone to ________ you when you are visiting a new place.",
    answers: ["lead", "take", "guide", "bring"],
  },
  {
    quiz_id: 3,
    question:
      "When you ______ your destination, your tour guide will meet you at the airport.",
    answers: ["arrive", "reach", "get", "achieve"],
  },
  {
    quiz_id: 4,
    question: "It can be quite busy here during the tourist ______",
    answers: ["season", "phase", "period", "stage"],
  },
  {
    quiz_id: 5,
    question:
      "Make sure you _______ a hotel before you come to our island, especially in the summer.",
    answers: ["book", "keep", "put", "buy"],
  },
  {
    quiz_id: 6,
    question: "Captain Cook discovered Australia on a _______ to the Pacific.",
    answers: ["vacation", "travel", "cruise", "voyage"],
  },
  {
    quiz_id: 7,
    question:
      " Most tourist attractions in London charge an admission ________.",
    answers: ["fare", "ticket", "fee", "pay"],
  },
  {
    quiz_id: 8,
    question: "The hotel where we are _______ is quite luxurious.",
    answers: ["living", "existing", "remaining", "staying"],
  },
  {
    quiz_id: 9,
    question: "Is English an ________ language in your country?",
    answers: ["mother", "official", "living", "old"],
  },
  {
    quiz_id: 10,
    question: "He spoke a ______ of French that we found hard to understand.",
    answers: ["slang", "jargon", "dialect", "language"],
  },
];
const results = [
  {
    quiz_id: 1,
    answers: "area",
  },
  {
    quiz_id: 2,
    answers: "guide",
  },
  {
    quiz_id: 3,
    answers: "reach",
  },
  {
    quiz_id: 4,
    answers: "season",
  },
  {
    quiz_id: 5,
    answers: "book",
  },
  {
    quiz_id: 6,
    answers: "voyage",
  },
  {
    quiz_id: 7,
    answers: "fee",
  },
  {
    quiz_id: 8,
    answers: "staying",
  },
  {
    quiz_id: 9,
    answers: "official",
  },
  {
    quiz_id: 10,
    answers: "dialect",
  },
];
// ________QUIZ_APP________________
const quizTimer = document.querySelector("#quiz_timer");
const quizSubmit = document.querySelector("#quiz_submit");
const quizProgress = document.querySelector("#progress");
const quizProgressText = document.querySelector("#progress_text");
const quizCount = document.querySelector(".quiz_question h5");
const quizTitle = document.querySelector("#quiz_title");
const quizPrev = document.querySelector("#quiz_prev");
const quizNext = document.querySelector("#quiz_next");
const quizAnswerList = document.querySelectorAll(".quiz_question ul li");
const quizQuestionList = document.querySelector(".quiz_numbers ul");
let quizQuestionListItems = document.querySelectorAll(".quiz_numbers ul li");
const quizAnswerListItems = document.querySelectorAll(".quiz_answer_item");

let currentIndex = null;
let listSubmit = [];

const quiz = {
  renderQuestionList: function () {
    let renderUI = "";
    questions.forEach((question, index) => {
      renderUI += ` <li>${index + 1}</li>`;
    });
    quizQuestionList.innerHTML = renderUI;
    quizQuestionListItems = document.querySelectorAll(".quiz_numbers ul li");
  },
  handleSubmit: function () {
    quizSubmit.addEventListener("click", () => {
      results.forEach((item, index) => {
        if (questions[index].answers[listSubmit[index]] === item.answers) {
          return;
        } else {
          quizQuestionListItems[index].classList.add("incorrect");
        }
      });
    });
  },
  handleProgress: function () {
    const progressNumber = listSubmit.filter((item) => item >= 0);
    const r = quizProgress.getAttribute("r");
    quizProgress.style = ` stroke-dasharray: ${
      (2 * Math.PI * r * progressNumber.length) / questions.length
    } 9999;`;
    quizProgressText.innerText = `${progressNumber.length}/${questions.length}`;
  },
  renderProgress: function () {
    quizProgress.style = ` stroke-dasharray: 0 9999;`;
    quizProgressText.innerText = `0/${questions.length}`;
  },
  renderTimer: function () {
    // Set the countdown time (15 minutes)
    var countdownTime = 15 * 60; // 15 minutes in seconds

    // Function to update the countdown timer
    function updateTimer() {
      var minutes = Math.floor(countdownTime / 60);
      var seconds = countdownTime % 60;

      // Add leading zero if seconds is less than 10
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Display the countdown timer
      document.getElementById("quiz_timer").innerText = minutes + ":" + seconds;

      // Update the countdown time
      countdownTime--;

      // Check if the countdown has reached zero
      if (countdownTime < 0) {
        clearInterval(timerInterval);
        document.getElementById("quiz_timer").innerText = "Time's up!";
      }
    }

    // Initial call to updateTimer to display the initial time
    updateTimer();

    // Update the countdown timer every second
    var timerInterval = setInterval(updateTimer, 1000);
  },
  renderCurrentQuestion: function () {
    quizCount.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
    quizTitle.innerText = questions[currentIndex].question;
    quizAnswerListItems.forEach((item, index) => {
      item.innerText = questions[currentIndex].answers[index];
    });
  },
  handleAnswerItem: function () {
    quizAnswerList.forEach((item, index) => {
      item.addEventListener("click", () => {
        quizAnswerList.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
        listSubmit[currentIndex] = index;
        quizQuestionListItems[currentIndex].classList.add("selected");
        console.log(listSubmit);
        this.handleProgress();
      });
    });
  },
  handleNext: function () {
    quizNext.addEventListener("click", () => {
      ++currentIndex;
      if (currentIndex > questions.length - 1) {
        currentIndex = 0;
      }
      quizQuestionListItems[currentIndex].click();
    });
  },
  handlePrev: function () {
    quizPrev.addEventListener("click", () => {
      --currentIndex;
      if (currentIndex < 0) {
        currentIndex = questions.length - 1;
      }
      quizQuestionListItems[currentIndex].click();
    });
  },
  handleQuestionList: function () {
    quizQuestionListItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        item.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
        quizQuestionListItems.forEach((item) =>
          item.classList.remove("active")
        );
        item.classList.add("active");
        currentIndex = index;
        this.renderCurrentQuestion();
        quizAnswerList.forEach((item) => item.classList.remove("active"));
        const selected = listSubmit[currentIndex];
        selected >= 0 && quizAnswerList[selected].classList.add("active");
      });
    });
    quizQuestionListItems[0].click();
  },
  start: function () {
    this.renderQuestionList();
    this.renderProgress();
    this.renderTimer();
    this.handleQuestionList();
    this.handleAnswerItem();
    this.handleNext();
    this.handlePrev();
    this.handleSubmit();
  },
};
quiz.start();
