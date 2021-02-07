class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;

    if (suit === "SPADES") {
      if (rank === "J") {
        this.value = 11;
      } else if (rank === "Q") {
        this.value = 12;
      } else if (rank === "K") {
        this.value = 13;
      } else if (rank === "A") {
        this.value = 14;
      } else {
        this.value = rank;
      }
      this.color = "black";
      this.icon = "fa fa-heart";
    } else if (suit === "HEARTS") {
      if (rank === "J") {
        this.value = 31;
      } else if (rank === "Q") {
        this.value = 32;
      } else if (rank === "K") {
        this.value = 33;
      } else if (rank === "A") {
        this.value = 34;
      } else {
        this.value = rank + 20;
      }
      this.color = "red";
      this.icon = "fa fa-heart";
    } else if (suit === "CLUBS") {
      if (rank === "J") {
        this.value = 51;
      } else if (rank === "Q") {
        this.value = 52;
      } else if (rank === "K") {
        this.value = 53;
      } else if (rank === "A") {
        this.value = 54;
      } else {
        this.value = rank + 40;
      }
      this.color = "black";
      this.icon = "fa fa-pagelines";
    } else {
      if (rank === "J") {
        this.value = 71;
      } else if (rank === "Q") {
        this.value = 72;
      } else if (rank === "K") {
        this.value = 73;
      } else if (rank === "A") {
        this.value = 74;
      } else {
        this.value = rank + 60;
      }
      this.color = "red";
      this.icon = "fa fa-diamond";
    }
  }
}
