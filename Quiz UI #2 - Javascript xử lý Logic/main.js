// ________FAKE_DATA_______________
let questions = [
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
    answer: "area",
  },
  {
    quiz_id: 3,
    answer: "reach",
  },
  {
    quiz_id: 2,
    answer: "guide",
  },
  {
    quiz_id: 4,
    answer: "season",
  },
  {
    quiz_id: 5,
    answer: "book",
  },
  {
    quiz_id: 6,
    answer: "voyage",
  },
  {
    quiz_id: 7,
    answer: "fee",
  },
  {
    quiz_id: 8,
    answer: "staying",
  },
  {
    quiz_id: 9,
    answer: "official",
  },
  {
    quiz_id: 10,
    answer: "dialect",
  },
];
// ________QUIZ_APP________________
const quizTimer = document.querySelector("#timer");
const quizProgress = document.querySelector("#progress");
const quizProgressText = document.querySelector("#progress_text");
const quizSubmit = document.querySelector("#quiz_submit");
const quizPrev = document.querySelector("#quiz_prev");
const quizNext = document.querySelector("#quiz_next");
const quizCount = document.querySelector(".quiz_question h5");
const quizAnswers = document.querySelectorAll(".quiz_question ul li");
let quizQuestions = document.querySelectorAll(".quiz_numbers ul li");
const quizQuestionList = document.querySelector(".quiz_numbers ul");
const quizAnswersItem = document.querySelectorAll(".quiz_answer_item");
const quizTitle = document.querySelector("#quiz_title");
let currentIndex = null;
let listSubmit = [];
function randomArray(array) {
  return (array = array.sort(() => Math.random() - Math.random()));
}
const quiz = {
  randomQuestion: function () {
    questions = randomArray(questions);
    questions.forEach((q) => {
      q.answers = randomArray(q.answers);
    });
    console.log(questions);
  },
  handleSubmit: function () {
    quizSubmit.addEventListener("click", () => {
      const progressLen = listSubmit.filter((item) => item >= 0);
      if (progressLen.length === questions.length) {
        questions.forEach((item, index) => {
          const result = results.find((r) => r.quiz_id === item.quiz_id);
          if (item.answers[listSubmit[index]] === result.answer) {
            return;
          } else {
            quizQuestions[index].classList.add("incorrect");
          }
        });
      } else {
        alert("Bạn chưa chọn hết đáp án");
      }
    });
  },
  handleQuestionList: function () {
    quizQuestions.forEach((item, index) => {
      item.addEventListener("click", () => {
        item.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
        quizQuestions.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
        currentIndex = index;
        this.renderCurrentQuestion();
        quizAnswers.forEach((item) => item.classList.remove("active"));
        const selected = listSubmit[currentIndex];
        selected >= 0 && quizAnswers[selected].click();
      });
    });
    quizQuestions[0].click();
  },
  handleAnswer: function () {
    quizAnswers.forEach((answer, index) => {
      answer.addEventListener("click", () => {
        quizAnswers.forEach((item) => item.classList.remove("active"));
        answer.classList.add("active");
        quizQuestions[currentIndex].classList.add("selected");
        listSubmit[currentIndex] = index;
        console.log(listSubmit);
        this.handleProgress();
      });
    });
  },
  renderCurrentQuestion: function () {
    quizCount.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
    quizTitle.innerText = questions[currentIndex].question;
    quizAnswersItem.forEach((answer, index) => {
      answer.innerText = questions[currentIndex].answers[index];
    });
  },
  renderTimer: function () {
    var timer = 15 * 60;

    // Lấy thẻ p có id là "timer"
    var countdownElement = document.getElementById("timer");

    // Hàm cập nhật thời gian
    function updateTimer() {
      var minutes = Math.floor(timer / 60);
      var seconds = timer % 60;

      // Định dạng thời gian thành chuỗi HH:MM:SS
      var timerString =
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds;

      // Gán thời gian đã định dạng vào thẻ p
      countdownElement.innerHTML = timerString;

      // Giảm thời gian mỗi giây
      timer--;

      // Kiểm tra nếu hết thời gian
      if (timer < 0) {
        clearInterval(intervalId);
        countdownElement.innerHTML = "Hết thời gian!";
      }
    }

    // Gọi hàm updateTimer mỗi giây
    var intervalId = setInterval(updateTimer, 1000);
  },
  handleNext: function () {
    quizNext.addEventListener("click", () => {
      ++currentIndex;
      if (currentIndex > questions.length - 1) {
        currentIndex = 0;
      }
      quizQuestions[currentIndex].click();
    });
  },
  handlePrev: function () {
    quizPrev.addEventListener("click", () => {
      --currentIndex;
      if (currentIndex < 0) {
        currentIndex = questions.length - 1;
      }
      quizQuestions[currentIndex].click();
    });
  },
  handleProgress: function () {
    const progressLen = listSubmit.filter((item) => item >= 0);
    const r = quizProgress.getAttribute("r");
    quizProgress.style = `stroke-dasharray: ${
      (2 * Math.PI * r * progressLen.length) / questions.length
    } 9999;`;
    quizProgressText.innerText = `${progressLen.length}/${questions.length}`;
  },
  renderProgress: function () {
    quizProgress.style = `stroke-dasharray: 0 9999;`;
    quizProgressText.innerText = `0/${questions.length}`;
  },
  renderQuestionList: function () {
    let render = "";
    questions.forEach((question, index) => {
      render += `<li>${index + 1}</li>`;
    });
    quizQuestionList.innerHTML = render;
    quizQuestions = document.querySelectorAll(".quiz_numbers ul li");
  },
  render: function () {
    this.renderQuestionList();
    this.renderProgress();
    this.renderTimer();
  },
  handle: function () {
    this.handleQuestionList();
    this.handleAnswer();
    this.handleNext();
    this.handlePrev();
    this.handleSubmit();
  },
  start: function () {
    this.randomQuestion();
    this.render();
    this.handle();
  },
};
quiz.start();
