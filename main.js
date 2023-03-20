// arrays in use for the game:: alphabet(const) (creates an array of available inputs), and pokemon (cost) which are the available answers. As well as declaring the empty (let) answerKey which can be manipulated later by player input, a (let)playerInputKey which will be compared against the answer key for win conditions, and a (let)GameBoard being the visual representation of the Board itself.

const alphabet = ['Q', 'W' , 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const pokemon = ['BULBASAUR', 'IVYSAUR', 'VENUSAUR', 'CHARMANDER', 'CHARMELEON', 'CHARIZARD', 'SQUIRTLE', 'WARTORTLE', 'BLASTOISE'];

let answerKey = [];

let gameBoard = [];

let playerInputKey = [];

// Strike Tallying System variable starts at 0

let strikeNumber = 0;

// Keyboard created using forEach function to create div buttons with preimplimented class and individual id's, as well as an onClick function for each of those IDs.

alphabet.forEach(function(letter, idx) {
  const keyboard_key = document.createElement('div');
  keyboard_key.className = "key"
  keyboard_key.id = idx;
  keyboard_key.innerText = letter;
  // This part was tricky, but used the function onClick to activate user input.
  keyboard_key.onclick = function() {
    userInput(letter, idx);
  };
  
// It's dumb but I wanted the keyboard to match the standard key layout, with the grid system I couldn't have different columns per row, so I decided to make individual grids per row to make it look clean.
  if (idx < 10 ) {
  document.querySelector(".keyboard-row-one").appendChild(keyboard_key);
  } else if (idx < 19) {
    document.querySelector(".keyboard-row-two").appendChild(keyboard_key);
  } else {
    document.querySelector(".keyboard-row-three").appendChild(keyboard_key);
  }
});

// Event Listeners

// Page Load Create Start Button and Displays Current Strikes

window.addEventListener("load", (event) => {
  createStartButton();
  renderStrikeInfo();
});

//Accessable Function list

//Function which will call a random num from the pokemon array then return an array of letters from that pull to give an answer key!

function callForAnswerKey() {
  let pulledPokemon = pokemon[Math.floor(Math.random() * 10)];
  let answerKey = pulledPokemon.split('');
  return answerKey
}

//User Input Function which is activated from onClick from on screen alphabet keys.

function userInput(letter) {
  let userInput = letter
  answerKey.forEach(function (entry, idx) {
    if (answerKey[idx] === userInput) {
      gameBoard[idx] = letter;
    }
  });
  playerInputKey.push(letter);
  inputBoardRender();
  console.log(gameBoard);
  console.log(playerInputKey);
}

//Function for creating the EMPTY player board for render, will update with a count based on how long the actual array is.

function emptyGameBoard(arr) {
  let playerInputKey = [];
  let answerLength = arr.length;
  let i = 0;
  while (i < answerLength) {
    playerInputKey.push('___');
    i++;
  }
  return playerInputKey;
}

// Game Start Function

function gameStart() {
  strikeNumber = 0;
  answerKey = callForAnswerKey();
  gameBoard = emptyGameBoard(answerKey);
  inputBoardRender();
}

// Win Condition Check

function winConCheck() {
  if(gameBoard === answerKey) {
    return true;    
    } else {
      return false;
    }
}

// Loss Condition Check

function lossConCheck() {
  if (strikeNumber < 3) {
    return false;
  } else {
    return true;
  }
}

// input board render

function inputBoardRender() {
  gameBoardClear();
  gameBoard.forEach(function(letter, idx) {
  let gameBoardDiv = document.createElement('div');
  gameBoardDiv.className = "answer-board"
  gameBoardDiv.innerText = letter;
  document.querySelector(".answer-key-display").appendChild(gameBoardDiv)
})
}

// board hint render

function boardHintRender(num) {
  let renderedHint = document.createElement('img');
  renderedHint.style.src = '';
}

// game board clear function

function gameBoardClear() {
  let gameBoardClear = document.querySelector(".answer-key-display");
  gameBoardClear.innerHTML = '';
}

//Start Button Creation will target the start-game-button id and produce a button which will restart the game.

function createStartButton() {
  let newStartButton = document.createElement('div');
  newStartButton.innerHTML = `<img src="https://i.imgur.com/74CxdZy.png"></img>`;
  newStartButton.onclick = function() {
    gameStart();
  }
  document.querySelector(".start-game-button").appendChild(newStartButton);
}

//Tally Information render

function renderStrikeInfo() {
  let strikeTarget = document.querySelector(".tally-counter");
  strikeTarget.innerText = strikeNumber;
}