"use strict"

const diceEl = document.querySelector(".dice")

// buttons
const btnRoll = document.querySelector(".btn--roll")
const btnNewGame = document.querySelector(".btn--new")
const btnHold = document.querySelector(".btn--hold")
const btnInputPoints = document.querySelector(".btn--set-points")

//selecting score elements
const score0El = document.getElementById("score--0")
const score1El = document.getElementById("score--1")

//selecting players
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")

// player current score
const currentScoreEl0 = document.getElementById("current--0")
const currentScoreEl1 = document.getElementById("current--1")

// player name:
const playerName0El = document.getElementById("name--0")
const playerName1El = document.getElementById("name--1")

let scores, currentScore, activePlayer, playing, winningScore

//starting conditions:
const init = function () {
	diceEl.classList.add("hidden")

	score0El.textContent = 0
	score1El.textContent = 0

	currentScoreEl0.textContent = 0
	currentScoreEl1.textContent = 0

	player0El.classList.remove("player--winner")
	player0El.classList.add("player--active")

	player1El.classList.remove("player--winner")
	player1El.classList.remove("player--active")

	playerName0El.textContent = "PLAYER 1"
	playerName1El.textContent = "PLAYER 2"

	scores = [0, 0]
	winningScore = 50
	btnInputPoints.placeholder = `ganha quem fizer ${winningScore} pontos primeiro`

	currentScore = 0
	activePlayer = 0
	playing = true
}

init()

const switchPlayer = function () {
	currentScore = 0
	document.getElementById(`current--${activePlayer}`).textContent = 0
	activePlayer = activePlayer === 0 ? 1 : 0
	player0El.classList.toggle("player--active")
	player1El.classList.toggle("player--active")
}

btnRoll.addEventListener("click", function () {
	if (playing) {
		// generate a random dice roll:
		const diceRoll = Math.trunc(Math.random() * 6) + 1

		// display the dice:
		diceEl.classList.remove("hidden")
		diceEl.src = `./assets/dice-${diceRoll}.png`

		// check for rolled 1:
		if (diceRoll !== 1) {
			// add dice value to current score
			currentScore += diceRoll
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore
		} else {
			switchPlayer()
		}

		// check if rolled no = 1 ? switch player
		console.log(diceRoll)
	}
})

btnHold.addEventListener("click", function () {
	if (playing) {
		// add current score to active player's score:
		scores[activePlayer] += currentScore
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer]
		//check if score is >= 100 -> finish game
		if (scores[activePlayer] >= winningScore) {
			playing = false

			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner")
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active")

			document.getElementById(`name--${activePlayer}`).textContent = "Winner!"

			diceEl.classList.add("hidden")
		} else {
			switchPlayer()
		}
	}
})

btnNewGame.addEventListener("click", init)

// //TODO
// // IMPLEMENT A FEATURE TO ADJUST THE WINNING SCORE BY THE USER
// btnInputPoints.addEventListener("click", function () {
// 	btnInputPoints.placeholder = ""
// 	btnInputPoints.style.textAlign = "center"

// 	// console.log(btnInputPoints)
// 	console.log(typeof btnInputPoints.value)
// })
