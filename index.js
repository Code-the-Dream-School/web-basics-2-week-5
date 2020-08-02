

//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board)
//the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'.
//  the reset button has to start the game again and the new game create a new game with new players and a new random board.
// Step 1: Create Players

// Entering players info
let player1 = {
  name: prompt("Player 1 enter your name"), //Ask the players for their names (use propmt)
  shipCount: 4,
  gameBoard: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
};
let player2 = {
  name: prompt("Player 2 enter your name"), //Ask the players for their names (use propmt)
  shipCount: 4,
  gameBoard: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
};
const board_Player1 = document.getElementById("board_player1");
const board_Player2 = document.getElementById("board_player2");
if (player1.name && player2.name != null) {
  document.getElementById("name_player1").innerHTML = player1.name;
  document.getElementById("name_player2").innerHTML = player2.name;
}

// Game function 
function gameBattleship () {
  //Add lives to HTML
  document.getElementById("ships_player1").innerHTML = player1.shipCount;
  document.getElementById("ships_player2").innerHTML = player2.shipCount;
  createButtons();
  //Deciding who is going to play first
  function coinFlip (){
    if (Math.random() < 0.5) {
      turnPlayer = player2;
      alert (`The first turn is for ${player2.name}`);
      document.getElementById("board_player1").style.display = "none";
      document.getElementById("board_player2").style.display = "block";
    } else {
      turnPlayer = player1;
      alert (`The first turn is for ${player1.name}`);
      document.getElementById("board_player2").style.display = "none";
      document.getElementById("board_player1").style.display = "block";
    }
  };
  coinFlip(player1, player2);
  document.getElementById("turn_player").textContent = turnPlayer.name;

  //Function to get boards
  function playerBoard(boardId, player) {
    const board = document.getElementById(boardId);
    for (var x = 0; x < 4; x++) {
      const li = document.createElement("li"); // creating childs for the list (board), in this case represent a row number 'x' of the board
      for (var y = 0; y < 4; y++) {
        const cell = document.createElement("div");
        cell.className = "square"; // adding css properties to make it looks like a square
        cell.textContent = `${x},${y}`; // saves the coordinates as a string value 'x,y'
        cell.value = 0; //state of the cell
        //this function adds the click event to each cell
        cell.addEventListener("click", e => {
          // document.getElementById ("turn_player").textContent = turnPlayer;
          let cell = e.target; // get the element clicked
          console.log(cell); //display the coordinates in the console
          cell.style.visibility = "hidden"; // this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          // cell.style.background = "purple"; //with this propertie you can change the background color of the clicked cell.
          // try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
          // whoIsPlaying(player);
          shoot(cell, player);
          // shoot(cell, player2);
          if (player.shipCount == 0) {
            document.getElementById("board_player1").style.display = "none";
            document.getElementById("board_player2").style.display = "none";
            alert("Congratulations " + player.name + " you WIN!!!");

          }
        });
        li.appendChild(cell); //adding each cell into the row number x
      }
      board.appendChild(li); //adding each row into the board
      player.gameBoard = board;
    }
  }
  playerBoard("board_player1", player1);
  playerBoard("board_player2", player2);


  //Function to positioning ships
  const placeShips = boardId => {
    console.log(boardId);
    let shipPlaced = 0;
    //loop that runs until 4 ships have been added to the board
    while (shipPlaced < 4) {
      // Inside the loop, generate a random x and a random y coordinate (must be between 0 and 3)
      let x = Math.floor(Math.random() * Math.floor(4));
      let y = Math.floor(Math.random() * Math.floor(4));
      const board = document.getElementById(boardId);
      let boardRow = board.getElementsByTagName("li")[x];
      let boardCell = boardRow.getElementsByTagName("div")[y];
      console.log(boardCell.value);
      if (boardCell.value !== 1) {
        console.log(boardCell.value);
        boardCell.value = 1;
        console.log(boardCell.value, "placed a ship");
        // extra debugging.
        // boardCell.innerHTML = "1";
        shipPlaced++;
      }

    }
  };
  placeShips("board_player1");
  placeShips("board_player2");

  //Hide oponent's board 
    const changeTurn = () => {
    console.log(turnPlayer);
    if (turnPlayer == player1) {
      turnPlayer = player2;
      const playerTurnName = document.getElementById("turn_player");
      playerTurnName.innerHTML = turnPlayer.name;
      console.log("Test 1", playerTurnName)
      document.getElementById("board_player1").style.display = "none";
      document.getElementById("board_player2").style.display = "block";
      return;
    }
    if (turnPlayer == player2) {
      turnPlayer = player1;
      const playerTurnName2 = document.getElementById("turn_player");
      playerTurnName2.innerHTML = turnPlayer.name;
      console.log("Test 2", playerTurnName2)
      document.getElementById("turn_player").textContent = turnPlayer.name;
      document.getElementById("board_player2").style.display = "none";
      document.getElementById("board_player1").style.display = "block";
      return;
    }
  };

  //Shooting function
  function shoot(cell, player) {
    if (cell.value == 1) {
      alert("Hit!!!");
      cell.value = 0;
      player.shipCount--;
      console.log("sunken ships", player.shipCount);
        if(player == player1){
          document.getElementById("ships_player2").innerHTML = player.shipCount;
        }
        if(player == player2){
          document.getElementById("ships_player1").innerHTML = player.shipCount;
        }
    } else {
      alert("Missed!!!");
      changeTurn();
    }  
  }
}
gameBattleship();

// Buttons function
function createButtons () {
  const NodeButt = document.getElementById('buttons');
  const buttonRes = document.createElement("button");
  buttonRes.innerHTML = "Reset Game";
  var buttonNew = document.createElement("button");
  buttonNew.innerHTML = "New Game";
  NodeButt.appendChild(buttonRes);
  NodeButt.appendChild(buttonNew);
  buttonNew.addEventListener("click", refreshPage);
  buttonRes.addEventListener("click", resetGame);
return;
}

//for new game
function refreshPage(){
  window.location.reload();
} 
//for reset game
function resetGame(){
  board_Player1.innerHTML = "";
  board_Player2.innerHTML = "";
  placeShips("board_player1");
  placeShips("board_player2");
}

  


