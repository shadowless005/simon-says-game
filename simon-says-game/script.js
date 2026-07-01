const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

const title = document.getElementById("level-title");
const startButton = document.getElementById("start-btn");
const buttons = document.querySelectorAll(".btn");

startButton.addEventListener("click", function () {
  if (!started) {
    title.textContent = "Level " + level;
    startButton.classList.add("hidden");
    nextSequence();
    started = true;
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    if (!started) return; // Ignore clicks if the game hasn't started

    const userChosenColor = event.target.getAttribute("data-color");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  title.textContent = "Level " + level;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  setTimeout(() => {
    animatePress(randomChosenColor);
  }, 500);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    title.textContent = "Game Over! score: " + (level - 1);
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    startOver();
  }
}

function animatePress(currentColor) {
  const activeButton = document.getElementById(currentColor);

  activeButton.classList.add("pressed");

  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  startButton.classList.remove("hidden");
}
