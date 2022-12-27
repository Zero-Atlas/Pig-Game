'use strict';
const player0SL = document.querySelector('.player--0');
const player1SL = document.querySelector('.player--1');

const score0SL = document.querySelector('#score--0');
const score1SL = document.querySelector('#score--1');

const currentScore0SL = document.querySelector('#current--0');
const currentScore1SL = document.querySelector('#current--1');

const diceSL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score0, score1, current, dice, playing, playerActive;

// repeating function
function switchPlayer() {
  if (playerActive === 0) {
    playerActive = 1;
    player0SL.classList.remove('player--active');
    player1SL.classList.add('player--active');
  } else {
    playerActive = 0;
    player0SL.classList.add('player--active');
    player1SL.classList.remove('player--active');
  }
}
function resetCurrent() {
  current = 0;
  currentScore0SL.textContent = 0;
  currentScore1SL.textContent = 0;
}

function currentPlayer() {
  if (playerActive === 0) {
    return document.querySelector(`.player--${0}`);
  } else {
    return document.querySelector(`.player--${1}`);
  }
}
function currentPlayerScore() {
  if (playerActive === 0) {
    return document.querySelector(`#score--${0}`);
  } else {
    return document.querySelector(`#score--${1}`);
  }
}
function currentPlayerCurrentScore() {
  if (playerActive === 0) {
    return document.querySelector(`#current--${0}`);
  } else {
    return document.querySelector(`#current--${1}`);
  }
}

// game start
function newGame() {
  score1 = 0;
  score0 = 0;
  current = 0;
  player0SL.classList.remove('player--winner');
  player1SL.classList.remove('player--winner');
  score0SL.textContent = 0;
  score1SL.textContent = 0;
  currentScore0SL.textContent = 0;
  currentScore1SL.textContent = 0;

  diceSL.classList.add('hidden');
  playing = true;
  playerActive = 1;
  switchPlayer();
}

newGame();

// click button Roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    dice = Number(Math.trunc(Math.random() * 6) + 1);
    diceSL.setAttribute('src', `dice-${dice}.png`);
    diceSL.classList.remove('hidden');
    current += dice;

    if (dice === 1) {
      switchPlayer();
      resetCurrent();
    } else {
      currentPlayerCurrentScore().textContent = current;
    }
  }
});

// click button Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    if (playerActive === 0) {
      score0 += current;
      currentPlayerScore().textContent = score0;
    } else {
      score1 += current;
      currentPlayerScore().textContent = score1;
    }
    if (score0 >= 100 || score1 >= 100) {
      playing = false;
      currentPlayer().classList.add('player--winner');
    }
    resetCurrent();
    switchPlayer();
  }
});

// click button reset
btnNew.addEventListener('click', newGame);
