'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnSetScore = document.querySelector('.btn--set-points')

const toggleSwitch = document.getElementById('theme-switcher');
const toggleIcon = document.getElementById('toggle-icon');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.childNodes[1].innerText = "Player 1";

  player1El.classList.remove('player--winner');
  player1El.childNodes[1].innerText = "Player 2";

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  btnHold.classList.remove('btn-disabled')
  btnRoll.classList.remove('btn-disabled')
  btnSetScore.classList.remove('btn-disabled')

  diceEl.classList.remove('hidden');
  diceEl.src = `./assets/diceRoll.gif`;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.src = `./assets/dice-${dice}.png`;
    diceEl.classList.add('dice-animated')

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      if(currentScore >= 50){
        endGame()
      }
    } else {
      // Switch to next player
      switchPlayer();
    diceEl.src = `./assets/diceRoll.gif`;

    }
  }
});


function endGame(){
  if (playing) {
    diceEl.src = `./assets/diceRoll.gif`;

    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector('.player--winner').childNodes[1].innerText = "Winner!";
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      btnHold.classList.add('btn-disabled')
      btnRoll.classList.add('btn-disabled')
      btnSetScore.classList.add('btn-disabled')

    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
}

btnHold.addEventListener('click', endGame);


btnNew.addEventListener('click', init);

// THEME FUNCTIONS

function darkMode() {
  toggleIcon.children[0].textContent = 'Dark Mode';
  toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
}

// Light Mode Styles
function lightMode() {
  toggleIcon.children[0].textContent = 'Light Mode';
  toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
}

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    darkMode();
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    lightMode();
  }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    darkMode();
  }
}