const START = document.querySelector("#start");
const INFO = document.querySelector("#infoBtn");
const PLAYER1 = document.querySelector(".deck--1");
const PLAYER2 = document.querySelector(".deck--2");
const PLAYER3 = document.querySelector(".deck--3");
const PLAYER4 = document.querySelector(".deck--4");
const GAMESPACE = document.querySelector("#game-space");
const SUITS = ["SPADES", "HEARTS", "DIAMONDS", "CLUBS"];
const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const MESSAGE = document.querySelector(".userMessage");

function alertUser(message) {
  MESSAGE.innerHTML = message;
  setTimeout(() => {
    MESSAGE.innerHTML = "";
  }, 2000);
}

function updateScore(player, score) {
  const deck = document.querySelector(`.deck--${player} .bids`);
  deck.style.display = "block";
  deck.innerHTML = score;
}

function showInfo() {
  const info = document.querySelector(".info");
  info.classList.toggle("info--display");
}
