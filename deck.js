class Deck {
  constructor(cards) {
    this.cards = cards;
  }

  dealCards() {
    this.cards = this.shuffle(this.cards);
    const cards = this.cards;
    const playerHand1 = [];
    const playerHand2 = [];
    const playerHand3 = [];
    const playerHand4 = [];
    for (let index = 0; index < cards.length; index++) {
      if (index % 4 === 0 || index === 0) {
        playerHand1.push(cards[index]);
      } else if (index % 2 === 0) {
        playerHand3.push(cards[index]);
      } else if (playerHand2.length < playerHand1.length) {
        playerHand2.push(cards[index]);
      } else if (playerHand4.length < playerHand3.length) {
        playerHand4.push(cards[index]);
      } else {
        console.log("error");
      }
    }

    return [playerHand1, playerHand2, playerHand3, playerHand4];
  }

  shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
