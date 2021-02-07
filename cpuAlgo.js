function isTurnCompleted(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 0) return false;
  }
  return true;
}

function maxValueIndex(array, leadingCardValue) {
  const trump = getMaxTrump(array);
  if (trump) {
    return array.indexOf(trump);
  } else {
    let index = 0;
    const cardRange = getSuit(leadingCardValue);
    for (let i = 0; i < array.length; i++) {
      if (
        array[i] >= cardRange[0] &&
        array[i] <= cardRange[1] &&
        array[i] > array[index]
      )
        index = i;
    }
    return index;
  }
}

function getMaxTrump(array) {
  let maxTrump = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 2 && array[i] <= 14 && !maxTrump) {
      maxTrump = array[i];
    } else if (array[i] >= 2 && array[i] <= 14 && maxTrump < array[i]) {
      maxTrump = array[i];
    }
  }
  return maxTrump ? maxTrump : null;
}

function selectCardToPlay(hand, leadingCard, activeCards) {
  const cardRange = getSuit(leadingCard);
  const validCardsToPlay = hand.filter(
    (card) => card.value >= cardRange[0] && card.value <= cardRange[1]
  );
  activeCards.sort((a, b) => b - a);
  const trumpInPlay = getMaxTrump(activeCards);
  let card;
  let trumpsInHand = null;

  if (validCardsToPlay.length > 0) {
    validCardsToPlay.sort((a, b) => b.value - a.value);
    card = validCardsToPlay[0];
    if (!trumpInPlay && card.value > activeCards[0]) {
      validCardsToPlay.forEach((item) => {
        if (item.value < card.value && item.value > activeCards[0]) card = item;
      });
    } else {
      card = validCardsToPlay[validCardsToPlay.length - 1];
    }
  } else {
    trumpsInHand = hand.filter((card) => card.value >= 2 && card.value <= 14);
    if (trumpsInHand.length > 0) {
      trumpsInHand.sort((a, b) => b - a);
      card = trumpsInHand[trumpsInHand.length - 1];
      let maxTrump = getMaxTrump(activeCards);
      if (maxTrump) {
        trumpsInHand.forEach((item) => {
          if (item.value < card.value && item.value > maxTrump) card = item;
        });
      } else {
        card = trumpsInHand[trumpsInHand.length - 1];
      }
    } else {
      card = getLowestCard(hand);
    }
  }

  return card;
}

function getSuit(leadingCardValue) {
  if (leadingCardValue >= 2 && leadingCardValue <= 14) return [2, 14];
  else if (leadingCardValue >= 22 && leadingCardValue <= 34) return [22, 34];
  else if (leadingCardValue >= 42 && leadingCardValue <= 54) return [42, 54];
  else return [62, 74];
}

function getLowestCard(hand) {
  let card;
  for (let i = 0; i < hand.length; i++) {
    if (
      (hand[i].value >= 22 && hand[i].value <= 27) ||
      (hand[i].value >= 42 && hand[i].value <= 47) ||
      (hand[i].value >= 62 && hand[i].value <= 67)
    ) {
      card = hand[i];
      break;
    } else if (
      (hand[i].value >= 28 && hand[i].value <= 34) ||
      (hand[i].value >= 48 && hand[i].value <= 54) ||
      (hand[i].value >= 68 && hand[i].value <= 74)
    ) {
      card = hand[i];
      break;
    }
  }
  return card;
}

function checkIfValidMove(hand, cardValue, leadingCardValue) {
  if (leadingCardValue === 0) {
    return true;
  } else {
    const cardRange = getSuit(leadingCardValue);
    if (cardValue >= cardRange[0] && cardValue <= cardRange[1]) return true;
    else
      for (let i = 0; i < hand.length; i++) {
        if (hand[i].value >= cardRange[0] && hand[i].value <= cardRange[1])
          return false;
      }
    return true;
  }
}

function checkIfGameFinished(hands) {
  for (let i = 0; i < 4; i++) {
    if (hands[i].length > 0) return false;
  }
  return true;
}

function appendCardInBoard(hand2, hand3, hand4) {
  hand2.forEach(({ value }) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.setAttribute("key", value);
    PLAYER2.appendChild(cardEl);
  });

  hand3.forEach(({ value }) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.setAttribute("key", value);
    PLAYER3.appendChild(cardEl);
  });

  hand4.forEach(({ value }) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.setAttribute("key", value);
    PLAYER4.appendChild(cardEl);
  });
}
