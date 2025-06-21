// ........................................................For Quiz section............................................................

// all the variables set to 0 for starting phase
let currentQuestionIndex = 0;
let questions = [];
let correct = 0;

// A function to decode api data into readable form
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// startQuizBtn() which take configuration and start the quiz
document.getElementById("startQuizBtn").onclick = () => {
  correct = 0;
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  document.getElementById("config").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  fetchQuestions(amount, category, difficulty, type);
  document.getElementById("nextBtn").disabled = false;
};

//fetchQuestions()  for feching questions according to confing
async function fetchQuestions(amount, category, difficulty, type) {
  let url = `https://opentdb.com/api.php?amount=${amount}`;
  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;
  const res = await fetch(url);
  const data = await res.json();
  questions = data.results;
  currentQuestionIndex = 0;
  showQuestion(); // call the showQuestion()
}

// To get Questions and there choices from the api data
function showQuestion() {
  const questionData = questions[currentQuestionIndex];
  const questionText = decodeHTML(questionData.question);
  const allAnswers = [
    ...questionData.incorrect_answers,
    questionData.correct_answer,
  ];

  //---------to set text "Question number" and other initial conditions
  document.getElementById("question").innerHTML = `<strong>Question ${
    currentQuestionIndex + 1
  }:</strong> ${decodeHTML(questionData.question)}`;

  const answersEl = document.getElementById("answers");
  answersEl.innerHTML = "";
  let count = ["a", "b", "c", "d"];
  let i = 0;

  //------------- To shuffel all the choices(answers)
  let shuffled;
  if (questionData.type === "boolean") {
    shuffled = ["True", "False"];
  } else {
    shuffled = allAnswers.sort(() => Math.random() - 0.5);
  }
  //---------Creates answer button and append in answers div
  shuffled.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<strong>${count[i % count.length]}</strong> : ${decodeHTML(
      answer
    )}`;
    btn.dataset.answer = answer;
    answersEl.appendChild(btn);
    i++;

    //---------using dataset compare selected answer with correct/incorrect answer
    btn.onclick = () => {
      const selectedAnswer = decodeHTML(btn.dataset.answer);
      const correctAnswer = decodeHTML(questionData.correct_answer);
      const buttons = document.querySelectorAll("#answers button");

      buttons.forEach((b) => {
        const thisAnswer = decodeHTML(b.dataset.answer);
        if (thisAnswer === correctAnswer) {
          b.style.backgroundColor = "green";
        }
        if (thisAnswer === selectedAnswer && selectedAnswer !== correctAnswer) {
          b.style.backgroundColor = "red";
        }
        //-------to disable all the buttons after any answer selected
        b.disabled = true;
      });
      //--------------for score
      if (selectedAnswer === correctAnswer) {
        correct += 1;
      }
    };
  });
}

// nextBtn() will display another question and decide work after the last question
document.getElementById("nextBtn").onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    document.querySelector("#quiz").style.display = "none";
    document.querySelector(".score-board").style.display = "flex";
    const totalQuestions = questions.length;
    document.getElementById(
      "score"
    ).innerText = `Your score is : ${correct} / ${totalQuestions}`;
  }
};

// trybtn will reset all the values in config and redirect to the the config window
let trybtn = document.querySelector("#tryBtn");
trybtn.addEventListener("click", () => {
  document.querySelector(".score-board").style.display = "none";
  document.getElementById("config").style.display = "flex";
  document.querySelector("#quiz").style.display = "none";
  document.getElementById("nextBtn").disabled = true;
  document.getElementById("answers").innerHTML = "";
  document.getElementById("question").innerText = "Loading...";
  document.getElementById("category").value = "";
  document.getElementById("difficulty").value = "";
  document.getElementById("amount").value = 5;
  document.getElementById("type").value = "multiple";
});

// ...........................................................................For Jokes section...........................

// Declare necessary variables and select elements
const startJokesBtn = document.getElementById("startJokes");
const jokesConfig = document.querySelector(".jokes-config");
const showJokes = document.querySelector(".showJokes");
const restartJokes = document.querySelector(".restartJokes");
const jokeTextElement = document.querySelector(".jokeText");
const prevJokeBtn = document.querySelector(".prevJoke");
const nextJokeBtn = document.querySelector(".nextJoke");
const exitJokesBtn = document.querySelector(".exitJokes");
const restartBtn = document.querySelector(".restartBtn");

let jokeIndex = 0;
let jokesArray = [];

// Function to decode HTML entities into readable text
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Event listener to start the jokes
startJokesBtn.addEventListener("click", async function () {
  // Hide config page and show jokes section
  jokesConfig.style.display = "none";
  showJokes.style.display = "flex";

  // Fetch jokes and display the first one
  await fetchJokes();
});

// Fetch jokes from the API
async function fetchJokes() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Any?lang=en&type=single&amount=50"
    );
    const data = await response.json();

    if (data.type === "single") {
      jokesArray = [data];
    } else {
      jokesArray = data.jokes;
    }

    // Initialize the joke index and display the first joke
    jokeIndex = 0;
    displayJoke();
  } catch (error) {
    console.error("Error fetching jokes:", error);
  }
}

// Display the current joke
function displayJoke() {
  if (jokesArray.length === 0) return;

  // Decode the joke text to readable format
  const decodedJoke = decodeHTML(jokesArray[jokeIndex].joke);

  // Update the joke text with the decoded joke
  jokeTextElement.textContent = decodedJoke;

  // Hide the "next joke" button and "restart" section if on the last joke
  if (jokeIndex === jokesArray.length - 1) {
    nextJokeBtn.style.display = "none";
    restartJokes.style.display = "flex";
    showJokes.style.display = "none";
  } else {
    nextJokeBtn.style.display = "flex";
    restartJokes.style.display = "none";
  }
}

// Previous joke button
prevJokeBtn.addEventListener("click", function () {
  if (jokeIndex > 0) {
    jokeIndex--;
    displayJoke();
  }
});

// Next joke button
nextJokeBtn.addEventListener("click", function () {
  if (jokeIndex < jokesArray.length - 1) {
    jokeIndex++;
    displayJoke();
  }
});

// Restart button to start from the beginning
restartBtn.addEventListener("click", function () {
  jokeIndex = 0;
  displayJoke();
  showJokes.style.display = "flex";
});

// Exit button to go back to the config page
exitJokesBtn.addEventListener("click", function () {
  showJokes.style.display = "none";
  jokesConfig.style.display = "flex";
});
