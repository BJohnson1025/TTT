const gameboard = document.getElementById("board");
const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restartBtn");
const playerText = document.getElementById("playerText");
const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";


let playerName1 = ''
let playerName2 = ''
let player1Score = 0
let player2Score = 0
let currentPlayer = X_TEXT;



// Applies style to board using for loop. object.assign applies style to each box.

function board() {
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    const styleObj = {};

    if (i < 3) {
      styleObj.borderBottom = "solid,";
    }
    if (i % 3 === 0) {
      styleObj.borderRight = "solid,";
    }
    if (i % 3 === 2) {
      styleObj.borderLeft = "solid,";
    }
    if (i > 5) {
      styleObj.borderTop = "solid,";
    }

    Object.assign(box.style, styleObj);
    box.addEventListener("click", boxClicked);
  }
}

// This function allows players to imput their name in the Player 1 and Player 2 space.

function getPlayerNames() {
  player1Name = prompt('Enter player 1 name');
  player2Name = prompt('Enter player 2 name');
}

getPlayerNames();

// *** Code will not function, not sure why. This function keeps track of the number of games each player has won.***

function winnerScore () {
  if (winner === 'X') {
    player1Score++;
    document.getElementById('player1Score').textContent = player1Score;
  } else if (winner === 'O') {
    player2Score++;
    document.getElementById('player2Score').textContent = player2Score;
  }
}



// This function checks to see if all spaces are filled and displays a message showing that the game is a draw.

function isDraw() {
  return spaces.every((space) => space !== null);
}


// This function inputs player text (X and O) into boxes, displays the players name, shows which player turn it is and alternates after recieving one players input, and shows which player has won the game.

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (PlayerHasWon(currentPlayer)) {
      playerText.innerHTML = `${currentPlayer === X_TEXT ? player1Name : player2Name} Wins!`;
      return;
    }
    if (isDraw()) {
      playerText.innerHTML = `It's a draw!`;
      return;
    }
    if (currentPlayer === X_TEXT) {
      currentPlayer = O_TEXT;
    } else {
      currentPlayer = X_TEXT;
    }
    playerText.innerHTML = `${currentPlayer === X_TEXT ? player1Name : player2Name}'s Turn`;
    }
    
  }


const PlayerHasWon = (player) => {
  
  //This function checks if the player has won starting from the zero index(first square). It checks the top row, left column, and right diagonally. 

  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      console.log(`${player} player wins on top row`);
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      console.log(`${player} player wins on the left column`);
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      console.log(`${player} player wins on right diagonal`);
      return true;
    }
  }
  
  //This function checks if the player wins from index 4 (middle square). It checks middle row, middle column, and left diagonally. 
  
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      console.log(`${player} wins on the middle horizontal`);
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      console.log(`${player} wins on the middle vertical`);
      return true;
    }
    if (spaces[2] === player && spaces[6] === player) {
      console.log(`${player} wins on the middle vertical`);
      return true;
    }
  }

  //This function checks if the player wins from index 8 (bottom square). It checks right column and left
  
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      console.log(`${player} wins on the right`);
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      console.log(`${player} wins on the bottom`);
      return true;
    }
  }
  
}

// This function restarts the game 
restartBtn.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  playerText.innerHTML = `${player1Name}'Lets Play!`;
  currentPlayer = X_TEXT;
  getPlayerNames();
});

board();
