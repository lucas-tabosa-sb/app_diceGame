"use strict"

const rules = document.getElementById("rules")
const rulesTitle = document.getElementById("rules-title")
const maxScoreBtn = document.querySelector(".btn--set-score")
const maxScoreBtnM = document.querySelector(".btn--set-score-mobile")
const ctaTextHolder = document.getElementById("cta-holder-text")
const currentLabel = document.querySelector(".current-label")
const currentLabel1 = document.querySelector(".current-label-1")
const btnNewGame = document.querySelector(".btn--new.btn--hidden-m")
const btnRollDice = document.querySelector(".btn--roll")
const btnHoldDice = document.querySelector(".btn--hold")

let enUSTitle = `HOW TO PLAY: `
let enSetMax = `📥 Set Max Score`
let enCTAText = `CURRENT MAX SCORE: `
let enCurrentLabel = `CURRENT: `
let enBtnNEW = `🔄 New Game`
let enRollDice = `🎲 Roll`
let enHoldDice = `📥 Hold`
let enUsRules = `- Set the max score in the button below
- Start the game by Rolling the dice to get a random number
- the rolled number will be added to your CURRENT score
- if you roll a 1, the CURRENT will go back to 0 and the turn will change to the opponent's side
- You can stop and change to the opponent's turn by pressing "Hold" and your CURRENT will be added to the TOTAL score
- Wins the one who reaches the Max score first`

let ptBRTitle = `COMO JOGAR: `
let ptSetMax = `📥 Defina Max Score`
let ptCTAText = `SCORE MÁXIMO ATUAL: `
let ptCurrentLabel = `ATUAL: `
let ptBtnNEW = `🔄 Novo Jogo`
let ptRollDice = `🎲 Rolar`
let ptHoldDice = `📥Parar`
let ptBrRules = `- Defina a pontuação máxima no botão abaixo
- Comece o jogo rolando o dado para obter um valor aleatório
- o numero sorteado será adicionado ao seu valor ATUAL
- se rolar 1, o valor ATUAL volta para 0 e passa a vez para o adversário
- Você também pode parar e passar a vez apertando o botão "Parar" e o valor ATUAL será somado ao seu valor TOTAL
- Ganha quem chegar no valor máximo primeiro`

rules.textContent = ptBrRules
rulesTitle.textContent = ptBRTitle
maxScoreBtn.textContent = ptSetMax
maxScoreBtnM.textContent = ptSetMax
ctaTextHolder.textContent = ptCTAText
currentLabel.textContent = ptCurrentLabel
currentLabel1.textContent = ptCurrentLabel
btnNewGame.textContent = ptBtnNEW
btnRollDice.textContent = ptRollDice
btnHoldDice.textContent = ptHoldDice




function translatePT(){
	rules.textContent = ptBrRules
	rulesTitle.textContent = ptBRTitle
	maxScoreBtn.textContent = ptSetMax
	maxScoreBtnM.textContent = ptSetMax
	ctaTextHolder.textContent = ptCTAText
	currentLabel.textContent = ptCurrentLabel
	currentLabel1.textContent = ptCurrentLabel
	btnNewGame.textContent = ptBtnNEW
	btnRollDice.textContent = ptRollDice
	btnHoldDice.textContent = ptHoldDice
}

function translateEN(){
	rules.textContent = enUsRules
	rulesTitle.textContent = enUSTitle
	maxScoreBtn.textContent = enSetMax
	maxScoreBtnM.textContent = enSetMax
	ctaTextHolder.textContent = enCTAText
	currentLabel.textContent = enCurrentLabel
	currentLabel1.textContent = enCurrentLabel
	btnNewGame.textContent = enBtnNEW
	btnRollDice.textContent = enRollDice
	btnHoldDice.textContent = enHoldDice
}

document.getElementById("ptbr").addEventListener('click', translatePT)
document.getElementById("ptbr-lg").addEventListener('click', translatePT)

document.getElementById("enus").addEventListener('click', translateEN)
document.getElementById("enus-lg").addEventListener('click', translateEN)
