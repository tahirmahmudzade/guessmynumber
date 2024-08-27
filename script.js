'use strict';

const MAX_NUMBER = 20;
const MIN_NUMBER = 1;

let randomNumber;
let gameEnd = false;

const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const number = document.querySelector('.number');
const body = document.querySelector('body');

const initialMessage = message.textContent;
const initialScore = score.textContent;
const initialHighScore = highscore.textContent;

function generateRandomNumber() {
  randomNumber = Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
  console.log('random number', randomNumber);
}

function updateMessage(text) {
  message.textContent = text;
}

function updateScore(value) {
  score.textContent = value;
}

function resetGame() {
  generateRandomNumber();
  gameEnd = false;
  updateMessage(initialMessage);
  updateScore(initialScore);
  highscore.textContent = initialHighScore;
  body.style.backgroundColor = '#222';
  number.textContent = '?';
  document.querySelector('.guess').value = '';
}

function checkGuess() {
  if (gameEnd) return;

  const guess = Number(document.querySelector('.guess').value);

  if (!guess || guess < MIN_NUMBER || guess > MAX_NUMBER) {
    return updateMessage(
      `Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}❗️`
    );
  }

  if (guess === randomNumber) {
    number.textContent = guess;
    updateMessage('You Won!🎉');
    highscore.textContent = score.textContent;
    body.style.backgroundColor = 'green';
    gameEnd = true;
  } else {
    updateScore(score.textContent - 1);
    updateMessage(guess > randomNumber ? 'Too high 📈' : 'Too Low 📉');
  }

  if (Number(score.textContent) === 0) {
    gameEnd = true;
    body.style.backgroundColor = 'red';
    updateMessage('You lost, please start again🥲');
  }
}

document.querySelector('.check').addEventListener('click', checkGuess);
document.querySelector('.again').addEventListener('click', resetGame);

// Initialize the game on page load
resetGame();
