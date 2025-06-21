const resetBtn = document.querySelector('.str');
const attLimitField = document.querySelector('.att-limit');
const remLimitText = document.querySelector('.rem-limit');
const inputField = document.querySelector('.in');
const submitBtn = document.querySelector('.sub');
const hint = document.querySelector('.hint');
const guessList = document.querySelector('.guess');
const revealBtn = document.querySelector('.see-ans');
const resultTextBox = document.querySelector('.result');
const correctAnsText = document.querySelector('.cor-ans');
const resultText = document.querySelector('.res');




let randomNumber = Math.floor(Math.random() * 100) + 1;
let count = 5;
let incorrectGuesses = [];
submitBtn.disabled = true;


resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  attLimitField.disabled = false;
  attLimitField.value = 5;
  count = parseInt(attLimitField.value);
  remLimitText.innerText = `Remaining attempts : ${count}`;
  inputField.disabled = false;
  inputField.value = '';
  submitBtn.disabled = false;
  resultTextBox.style.visibility = 'hidden';
  revealBtn.disabled = false;
  revealBtn.innerText = `Reveal`;
  randomNumber = Math.floor(Math.random() * 100) + 1;
  hint.innerText = `Hint : `;
  incorrectGuesses = [];
  guessList.innerText = `Incorrect Guesses : ${incorrectGuesses}`;
  attLimitField.style.backgroundColor = 'white';
  submitBtn.disabled = true;
  enablePointerEvents();
});


attLimitField.addEventListener('input', () => {
  count = parseInt(attLimitField.value);
  if (count > 10 || count <= 0 || isNaN(count)) {
    inputField.disabled = true;
    attLimitField.style.backgroundColor = 'red';

    remLimitText.innerText = `Remaining attempts : 0`;
  } else {
    attLimitField.style.backgroundColor = 'white';
    inputField.disabled = false;
    remLimitText.innerText = `Remaining attempts : ${count}`;
  }});


revealBtn.addEventListener('click', () => {
  revealBtn.innerText = `${randomNumber}`;
  revealBtn.disabled = true;
  correctAnsText.innerText = `Correct answer is : ${randomNumber}`;
  resultText.innerText = `Draw`;
  disablePointerEvents();
  resultTextBox.style.backgroundColor = 'white';
  resultTextBox.style.visibility = 'visible';
  inputField.disabled = true;
  submitBtn.disabled = true;
  attLimitField.disabled = true;
  revealBtn.style.backgroundColor = 'white';
  revealBtn.style.color = 'black';
});


inputField.addEventListener('input', () => {
  hint.innerText = `Hint : `;
  if (parseInt(inputField.value) > 100 || parseInt(inputField.value) <= 0 || isNaN(parseInt(inputField.value))) {
    submitBtn.disabled = true;
  }
  else {
    submitBtn.disabled = false;
  }
})

submitBtn.addEventListener('click', () => {
  attLimitField.disabled = true;
  const guessValue = parseInt(inputField.value);

  if (guessValue === randomNumber) {
    count--;
    remLimitText.innerText = `Remaining attempts : ${count}`;
    resultTextBox.style.visibility = 'visible';
    correctAnsText.innerText = `Correct answer is : ${randomNumber}`;
    resultText.innerText = `You Win 🎉 `;
    resultTextBox.style.backgroundColor = 'Green';
    disablePointerEvents();
    revealBtn.disabled = true;
    submitBtn.disabled = true;
    inputField.disabled = true;
  }else {
    count--;
    remLimitText.innerText = `Remaining attempts : ${count}`;
    inputField.value = "";
    if (guessValue > randomNumber) {
      hint.innerText = `Hint : Too high`;
    } else {
      hint.innerText = `Hint : Too low`;
    }};
  if (count <= 0 && guessValue === randomNumber) {
    resultTextBox.style.visibility = 'visible';
    correctAnsText.innerText = `Correct answer is : ${randomNumber}`;
    resultText.innerText = `You Win 🎉`;
    resultTextBox.style.backgroundColor = 'Green';
    disablePointerEvents();
    revealBtn.disabled = true;
    submitBtn.disabled = true;
    attLimitField.disabled = true;
    inputField.disabled = true;
  }
  if (count <= 0 && guessValue !== randomNumber) {
    resultTextBox.style.visibility = 'visible';
    correctAnsText.innerText = `Correct answer is : ${randomNumber}`;
    resultText.innerText = `You Loss ❌`;
    resultTextBox.style.backgroundColor = 'red';
    disablePointerEvents();
    revealBtn.disabled = true;
    submitBtn.disabled = true;
    attLimitField.disabled = true;
    inputField.disabled = true;
  }
  incorrectGuesses.push(guessValue);
  guessList.innerText = `Incorrect guesses : ${incorrectGuesses}`;
});


function disablePointerEvents() {
  document.querySelector('.box').style.pointerEvents = 'none'; 
  resetBtn.style.pointerEvents = 'auto';
}

function enablePointerEvents() {
  document.querySelector('.box').style.pointerEvents = 'auto'; 
}









































// let correctNumber;
// let remainingAttempts;
// let attemptLimit;
// let incorrectGuesses = [];
// let gameOver = false;

// // Initialize game state
// function startGame() {
//   attemptLimit = parseInt(attLimitField.value, 10) || 5;
//   remainingAttempts = attemptLimit;
//   correctNumber = Math.floor(Math.random() * 101); // 0–100
//   incorrectGuesses = [];
//   gameOver = false;

//   // Reset UI
//   inputField.value = '';
//   hint.textContent = 'Hint :';
//   guessList.textContent = 'Incorrect guesses :';
//   remLimitText.textContent = `Remaining attempts : ${remainingAttempts}`;
//   correctAnsText.textContent = 'Correct answer is : ?';
//   resultText.textContent = '';

//   // Reset result section visibility
//   document.querySelector('.result').style.visibility = 'hidden';

//   // Enable inputs
//   inputField.disabled = false;
//   submitBtn.disabled = false;
//   revealBtn.disabled = false;
//   revealBtn.textContent = 'Reveal';  // Reset the button text back to 'Reveal'
// }

// // Handle submit guess
// submitBtn.addEventListener('click', function () {
//   if (gameOver) return; // Prevent guessing if the game is over

//   const guess = parseInt(inputField.value, 10);

//   // Validate input
//   if (isNaN(guess) || guess < 0 || guess > 100) {
//     hint.textContent = 'Hint: Please enter a number between 0 and 100.';
//     return;
//   }

//   if (remainingAttempts <= 0) {
//     hint.textContent = 'No more attempts! Click Start / Reset to play again.';
//     return;
//   }

//   if (guess === correctNumber) {
//     hint.textContent = 'Correct!';
//     resultText.textContent = '🎉 You win!';
//     correctAnsText.textContent = `Correct answer is : ${correctNumber}`;
//     inputField.disabled = true;
//     submitBtn.disabled = true;
//     gameOver = true;

//     // Make result div visible after the game ends
//     document.querySelector('.result').style.visibility = 'visible';
//   } else {
//     remainingAttempts--;
//     hint.textContent = guess > correctNumber ? 'Too high!' : 'Too low!';
//     incorrectGuesses.push(guess);
//     guessList.textContent = 'Incorrect guesses : ' + incorrectGuesses.join(', ');
//     remLimitText.textContent = `Remaining attempts : ${remainingAttempts}`;

//     if (remainingAttempts === 0) {
//       resultText.textContent = '❌ You lost! Click Start / Reset.';
//       correctAnsText.textContent = `Correct answer is : ${correctNumber}`;
//       inputField.disabled = true;
//       submitBtn.disabled = true;
//       gameOver = true;

//       // Make result div visible after the game ends
//       document.querySelector('.result').style.visibility = 'visible';
//     }
//   }

//   inputField.value = '';
// });

// // Handle reveal answer button
// revealBtn.addEventListener('click', function () {
//   if (!gameOver) {
//     revealBtn.textContent = correctNumber;  // Change button text to the correct answer
//     revealBtn.disabled = true;  // Disable the reveal button after showing the answer
//   } else {
//     // If game is over, show the answer again (optional, just in case)
//     correctAnsText.textContent = `Correct answer is : ${correctNumber}`;
//   }
// });

// // Handle Start / Reset
// resetBtn.addEventListener('click', function (e) {
//   e.preventDefault(); // Prevent form submission
//   startGame();
// });

// // When attempt limit changes, update remaining attempts
// attLimitField.addEventListener('input', function () {
//   attemptLimit = parseInt(attLimitField.value, 10) || 5; // Get new attempt limit
//   remainingAttempts = attemptLimit; // Set remaining attempts to new limit
//   remLimitText.textContent = `Remaining attempts : ${remainingAttempts}`; // Update display
// });

// // Start the game initially
// startGame();

















