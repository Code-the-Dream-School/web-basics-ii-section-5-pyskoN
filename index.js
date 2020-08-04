//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

let board_Player1 = document.getElementById("board_player1");
let board_Player2 = document.getElementById("board_player2");

const name_player1 = document.getElementById("name_player1");
const name_player2 = document.getElementById("name_player2");
name_player1.textContent = prompt("What is your name?");
name_player2.textContent = prompt("What is your name?");
// if (name_player1.textContent === null) {
//   name_player1.textContent = "Player1";
// } else if (name_player2.textContent === null) {
//   name_player2.textContent = "Player2";
// }

const lives1 = document.getElementById("ships_player1");
const lives2 = document.getElementById("ships_player2");

let PlayerTurn = document.getElementById("turn_player");

//creating buttons
let buttonReset = document.createElement("button");
let buttonNew = document.createElement("button");
const buttons = document.getElementById("buttons");
buttons.appendChild(buttonNew);
buttons.appendChild(buttonReset);
buttonNew.innerHTML = "New Game";
buttonReset.innerHTML = "Start again";

buttonNew.addEventListener("click", RR);
buttonReset.addEventListener("click", RR);
//function restart and reset
function RR(e) {
  let button = e.target;
  if (button === buttonNew) {
    location.reload();
  } else if (button === buttonReset) {
    lives1.innerHTML = 4;
    lives2.innerHTML = 4;
    board_Player1.innerHTML = "";
    board_Player2.innerHTML = "";
    createBoard(board_Player1);
    addingshipsToBoard(board_Player1);
    createBoard(board_Player2);
    addingshipsToBoard(board_Player2);
  }
}

//objects containing players info
const Player1 = {
  name: name_player1.textContent,
  shipsLeft: lives1.innerHTML,
};
const Player2 = {
  name: name_player2.textContent,
  shipsLeft: lives2.innerHTML,
};

//creating and changing lives

lives1.innerHTML = 4;
lives2.innerHTML = 4;

createBoard(board_Player1);
addingshipsToBoard(board_Player1);
createBoard(board_Player2);
addingshipsToBoard(board_Player2);

//function that adds random ships to the dom table.
function addingshipsToBoard(playerBoard) {
  let ship = 0;
  do {
    let a = Math.floor(Math.random() * 3) + 0;
    let b = Math.floor(Math.random() * 3) + 0;
    let row = playerBoard.getElementsByTagName("li")[a];
    let cell = row.getElementsByTagName("div")[b];
    if (cell.value === 0) {
      cell.value = 1;
      ship++;
    } else {
      continue;
    }
  } while (ship < 4);
}
//creates gameboard
function createBoard(board) {
  for (var x = 0; x < 4; x++) {
    const li = document.createElement("li"); // creating children for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement("div");
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`; // saves the coordinates as a string value 'x,y'
      cell.value = 0; //state of the cell

      //this function adds the click event to each cell
      cell.addEventListener("click", clickEvent);
      li.appendChild(cell); //adding each cell into the row number x
    }
    board.appendChild(li); //adding each row into the board
  }
}
let CurrentPlayer = Player1;
PlayerTurn.textContent = Player1.name;
//the actual game play
function clickEvent(e) {
  let cell = e.target; // get the element clicked
  if (CurrentPlayer === Player1 && board_Player2.contains(cell)) {
    if (cell.value === 1 && cell.textContent !== "ship!") {
      cell.style.background = "red";
      cell.textContent = "ship!";
      lives2.innerHTML--;
      if (lives2.innerHTML === "0") {
        alert(`You win! You've found all the ships, ${CurrentPlayer.name}`);
        return;
      }
      CurrentPlayer = Player1;
    } else if (cell.value === 0) {
      cell.style.visibility = "hidden";
      CurrentPlayer = Player2;
      PlayerTurn.textContent = Player2.name;
    } else {
    }
  } else if (CurrentPlayer === Player2 && board_Player1.contains(cell)) {
    if (cell.value === 1 && cell.textContent !== "ship!") {
      cell.style.background = "red";
      cell.textContent = "ship!";
      lives1.innerHTML--;
      if (lives1.innerHTML === "0") {
        PlayerTurn.textContent = `The WINNER is ${CurrentPlayer.name}`;
        alert(`You win! You've found all the ships, ${CurrentPlayer.name}`);
        return;
      }
      CurrentPlayer = Player2;
    } else if (cell.value === 0) {
      cell.style.visibility = "hidden";
      CurrentPlayer = Player1;
      PlayerTurn.textContent = Player1.name;
    } else {
    }
  }
  return `The winner is ${CurrentPlayer.name}!`;
}
