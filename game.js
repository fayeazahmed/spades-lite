class Game {
  constructor() {
    const cards = [];
    SUITS.forEach((suit) => {
      RANKS.forEach((rank) => {
        const card = new Card(suit, rank);
        cards.push(card);
      });
    });

    const deck = new Deck(cards);
    this.deck = deck;
    this.activePlayer = 3;
  }

  init(
    prevPlayersHand = [
      { value: 0, bids: 0 },
      { value: 0, bids: 0 },
      { value: 0, bids: 0 },
      { value: 0, bids: 0 },
    ]
  ) {
    const [hand1, hand2, hand3, hand4] = this.deck.dealCards();
    hand1.sort((a, b) => b.value - a.value);
    this.hands = [hand1, hand2, hand3, hand4];
    this.activePlayersHand = prevPlayersHand;
    this.leadingCardValue = 0;
    hand1.forEach((card) => {
      const { rank, value, color, icon } = card;
      const cardEl = document.createElement("div");
      cardEl.classList.add("card");
      cardEl.style.color = color;
      cardEl.setAttribute("key", value);
      cardEl.innerHTML = `
						  <p><i class="${icon}" aria-hidden="true"></i></p>
						  <p>${rank}</p>
				  `;
      cardEl.addEventListener("click", () => this.playACard(card, true));
      PLAYER1.appendChild(cardEl);
    });
    appendCardInBoard(hand2, hand3, hand4);
    this.controlGame();
  }

  controlGame() {
    if (isTurnCompleted(this.activePlayersHand.map((item) => item.value))) {
      this.activePlayer =
        maxValueIndex(
          this.activePlayersHand.map((item) => item.value),
          this.leadingCardValue
        ) + 1;
      this.leadingCardValue = 0;
      this.activePlayersHand = this.activePlayersHand.map((item, i) => {
        item.value = 0;
        if (i === this.activePlayer - 1) item.bids++;
        return item;
      });
      updateScore(
        this.activePlayer,
        this.activePlayersHand[this.activePlayer - 1].bids
      );
      setTimeout(() => {
        GAMESPACE.innerHTML = "";
        if (checkIfGameFinished(this.hands)) this.init(this.activePlayersHand);
        else this.controlGame();
      }, 1500);
    } else {
      if (
        this.activePlayer > 1 &&
        this.activePlayer < 5 &&
        this.activePlayersHand[this.activePlayer - 1].value === 0
      )
        setTimeout(() => this.cpuTurns(), 1500);
      else this.activePlayer = 1;
    }
  }

  playACard(card, userAction = false) {
    if (!userAction || (userAction && this.activePlayer === 1)) {
      const { color, value, icon, rank } = card;
      if (userAction) {
        if (!checkIfValidMove(this.hands[0], value, this.leadingCardValue))
          return alertUser("Play a card of valid suit");
      }
      this.activePlayersHand[this.activePlayer - 1].value = value;
      if (this.leadingCardValue === 0) {
        this.leadingCardValue = value;
      }
      const cardEl = document.createElement("div");
      cardEl.classList.add(`playedcard`, `playedcard--${this.activePlayer}`);
      cardEl.style.color = color;
      cardEl.setAttribute("key", value);
      cardEl.innerHTML = `
					  <p><i class="${icon}" aria-hidden="true"></i></p>
					  <p>${rank}</p>
			  `;
      GAMESPACE.appendChild(cardEl);
      document
        .querySelector(`.deck--${this.activePlayer} .card[key="${value}"]`)
        .remove();
      this.hands[this.activePlayer - 1] = this.hands[
        this.activePlayer - 1
      ].filter((card) => card.value !== value);
      this.activePlayer++;
    }
    this.controlGame();
  }

  cpuTurns() {
    const hand = this.hands[this.activePlayer - 1];
    const card = selectCardToPlay(
      hand,
      this.leadingCardValue,
      this.activePlayersHand.map((value) => value)
    );
    this.playACard(card);
  }
}

const newGame = new Game();
START.addEventListener("click", () => {
  newGame.init();
  START.remove();
});

INFO.addEventListener("click", showInfo);
