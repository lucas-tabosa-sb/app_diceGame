"use strict"

// Selecting elements
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.querySelector("#score--0")
const score1El = document.getElementById("score--1")
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")

const diceEl = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const btnSetScore = document.querySelector(".btn--set-score")
const btnSetScoreM = document.querySelector(".btn--set-score-mobile")
const maxScoreInput = document.querySelector(".set-max-score")
const maxScoreInputLg = document.querySelector(".set-max-score-lg")

const toggleSwitch = document.getElementById("theme-switcher")
const toggleIcon = document.getElementById("toggle-icon")
const menuToggle = document.getElementById("menu-toggle")

let scores, currentScore, activePlayer, playing, maxScore

// Starting conditions
const init = function () {
	scores = [0, 0]
	currentScore = 0
	activePlayer = 0
	playing = true

	score0El.textContent = 0
	score1El.textContent = 0
	current0El.textContent = 0
	current1El.textContent = 0

	// players
	player0El.classList.remove("player--winner")
	player0El.childNodes[1].innerText = "Player 1"
	player1El.classList.remove("player--winner")
	player1El.childNodes[1].innerText = "Player 2"
	player0El.classList.add("player--active")
	player1El.classList.remove("player--active")

	// CTAs
	btnSetScore.classList.remove("btn-disabled")
	btnSetScore.disabled = false



	btnNew.classList.add("btn--hidden-m")

	// dice
	diceEl.classList.remove("hidden")
	diceEl.src = `./assets/diceRoll.gif`

	if(window.screen.width <= 1000 ){
		return (
		btnRoll.disabled == false,
		btnRoll.classList.remove('btn-disabled'),
		btnRoll.classList.remove('btn--hidden-m'),
		
		btnHold.disabled == false,
		btnHold.classList.remove("btn--hidden-m"),
		btnHold.classList.remove('btn-disabled')
		)
	} else {
		return(
		btnHold.disabled = true,
		btnHold.classList.remove("btn--hidden-m"),
		btnHold.classList.add('btn-disabled'),
		btnRoll.disabled = true,
		btnRoll.classList.remove("btn--hidden-m"),
		btnRoll.classList.add('btn-disabled')
		)
	}
}

init()

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0
	currentScore = 0
	activePlayer = activePlayer === 0 ? 1 : 0
	player0El.classList.toggle("player--active")
	player1El.classList.toggle("player--active")
}

// Rolling dice functionality
function play() {
	if (playing) {
		// 1. Generating a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1

		// 2. Display dice
		diceEl.src = `./assets/dice-${dice}.png`
		diceEl.classList.add("dice-animated")

		// 3. Check for rolled 1
		if (dice !== 1) {
			// Add dice to current score
			currentScore += dice
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore
			if (currentScore >= maxScore) {
				endGame()
			}
		} else {
			// Switch to next player
			switchPlayer()
			diceEl.src = `./assets/diceRoll.gif`
		}
	}
}

function setMaxScore(e) {
	if (e.target == btnSetScore) {
		maxScore = maxScoreInputLg.value
		btnHold.disabled = false
		btnHold.classList.remove('btn-disabled')
		btnRoll.disabled = false
		btnRoll.classList.remove('btn-disabled')
	} else if (e.target == btnSetScoreM) {
		maxScore = maxScoreInput.value
		btnHold.disabled = false
		btnHold.classList.remove('btn-disabled')
		btnRoll.disabled = false
		btnRoll.classList.remove('btn-disabled')
		console.log(maxScore)
	}
	document.getElementById("menu-toggle").checked = false
	return maxScore
}

function holdTurn() {
	if (playing) {
		diceEl.src = `./assets/diceRoll.gif`

		// 1. Add current score to active player's score
		scores[activePlayer] += currentScore
		// scores[1] = scores[1] + currentScore

		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer]

		// 2. Check if player's score is >= 100
		if (scores[activePlayer] >= maxScore) {
			// Finish the game
			playing = false
			diceEl.classList.add("hidden")

			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner")
			document.querySelector(".player--winner").childNodes[1].innerText =
				"Winner!"
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active")
			btnHold.classList.add("btn-disabled")
			btnRoll.classList.add("btn-disabled")
			btnSetScore.classList.add("btn-disabled")
		} else {
			// Switch to the next player
			switchPlayer()
		}
	}
}

function endGame() {
	playing = false
	diceEl.classList.add("hidden")

	document
		.querySelector(`.player--${activePlayer}`)
		.classList.add("player--winner")
	if (document.getElementById("rules-title").textContent === "HOW TO PLAY: ") {
		document.querySelector(".player--winner").childNodes[1].innerText =
			"Winner!"
	} else {
		document.querySelector(".player--winner").childNodes[1].innerText =
			"Ganhou!"
	}
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.remove("player--active")
	btnHold.classList.add("btn-disabled")
	btnHold.classList.add("btn--hidden-m")
	btnRoll.classList.add("btn-disabled")
	btnRoll.classList.add("btn--hidden-m")
	btnNew.classList.remove("btn--hidden-m")
	btnSetScore.classList.add("btn-disabled")
	btnSetScore.disabled = true

	scores[activePlayer] += currentScore
	document.getElementById(`score--${activePlayer}`).textContent =
		scores[activePlayer]
}


//CTAs
btnRoll.addEventListener("click", play)
btnSetScoreM.addEventListener("click", setMaxScore)
btnSetScore.addEventListener("click", setMaxScore)
btnHold.addEventListener("click", holdTurn)
btnNew.addEventListener("click", init)

// THEME FUNCTIONS

function darkMode() {
	toggleIcon.children[0].textContent = "Dark Mode"
	toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
}

// Light Mode Styles
function lightMode() {
	toggleIcon.children[0].textContent = "Light Mode"
	toggleIcon.children[1].classList.replace("fa-moon", "fa-sun")
}

function switchTheme(event) {
	if (event.target.checked) {
		document.documentElement.setAttribute("data-theme", "dark")
		localStorage.setItem("theme", "dark")
		darkMode()
	} else {
		document.documentElement.setAttribute("data-theme", "light")
		localStorage.setItem("theme", "light")
		lightMode()
	}
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme)
const currentTheme = localStorage.getItem("theme")
if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme)

	if (currentTheme === "dark") {
		toggleSwitch.checked = true
		darkMode()
	}
}
