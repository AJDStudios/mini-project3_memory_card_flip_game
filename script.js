// An array of card symbols
const cardSymbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

// Double the symbols to create pairs
const cardPairs = [...cardSymbols, ...cardSymbols];

// Shuffle the cards using the Fisher-Yates algorithm
const shuffledCards = shuffle(cardPairs);

// Create card elements dynamically
const gameBoard = document.querySelector('.game-board');
shuffledCards.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');
  
  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.innerHTML = symbol;
  
  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  gameBoard.appendChild(card);

  card.addEventListener('click', () => {
    flipCard(card);
  });
});

let flippedCards = [];
let matchedCards = [];

function flipCard(card) {
  // Ignore if the card is already flipped or matched
  if (card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  // Check for a match when two cards are flipped
  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.querySelector('.card-front').innerHTML;
    const symbol2 = card2.querySelector('.card-front').innerHTML;

    if (symbol1 === symbol2) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards.push(card1, card2);
    } else {
      // Delay flipping the cards back if they don't match
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
      }, 1000);
    }

    flippedCards = [];
  }

  // Check if the player has won
  if (matchedCards.length === shuffledCards.length) {
    setTimeout(() => {
      alert('Congratulations! You won!');
    }, 500);
  }
}

// Shuffle function using the Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
