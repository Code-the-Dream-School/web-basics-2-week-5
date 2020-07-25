
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file

//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) 
//the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

  // Step 1: Create Players
  let player1 = {
    name: prompt('Player 1 enter your name'), //Ask the players for their names (use propmt)
    shipCount: parseInt(4),
    gameBoard: [ 
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
    ]
    }
  let player2 = {
    name: prompt('Player 2 enter your name'), //Ask the players for their names (use propmt)
    shipCount: parseInt(4),
    gameBoard: [ 
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
    ]
    }


const board_Player1 = document.getElementById('board_player1');
const board_Player2 = document.getElementById('board_player2');



if (player1.name && player2.name != null ) {
  document.getElementById('name_player1').innerHTML =
  player1.name;
  document.getElementById('name_player2').innerHTML =
  player2.name;
};


//Add lives to HTML

document.getElementById('ships_player1').innerHTML =
  player1.shipCount;

document.getElementById('ships_player2').innerHTML =
  player2.shipCount;


// First Player Board
for (var x = 0; x < 4; x++) {

    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell

      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
          let cell = e.target; // get the element clicked
          console.log( cell.textContent) //display the coordinates in the console
          cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
      });

      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player1.appendChild(li); //adding each row into the board
}


// Second Player Board

for (var x = 0; x < 4; x++) {

    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell

      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
          let cell = e.target; // get the element clicked
          console.log( cell.textContent) //display the coordinates in the console
          // create turn function 
          cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
      });

      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player2.appendChild(li); //adding each row into the board
}




//Step 2: Randomly Add Ships to each Board
let shipPlaced1 = 0; 
let shipPlaced2 = 0; 
// 1.-Create a loop that runs until 4 ships have been added to the board
while (shipPlaced1 < 4 && shipPlaced2 <4){
// Inside the loop, generate a random x and a random y coordinate (must be between 0 and 3)
  let xPos1 = Math.floor(Math.random() * 4);
  let xPos2 = Math.floor(Math.random() * 4);
    // console.log(xPos);
  let yPos1 = Math.floor(Math.random() * 4);
  let yPos2 = Math.floor(Math.random() * 4);
    // console.log(yPos);
  let shipRandom1 = [xPos1, yPos1]
  let shipRandom2 = [xPos2, yPos2]
  console.log(shipRandom1);
  console.log(shipRandom2);
  if (player1.gameBoard[xPos1][yPos1] === 0 && player2.gameBoard[xPos2][yPos2] === 0) {
    player1.gameBoard[xPos1][yPos1] = 1;
    player2.gameBoard[xPos2][yPos2] = 1;
    shipPlaced1 ++;
    shipPlaced2 ++;
        
  } 
}
  console.log(player1.gameBoard);  
  console.log(player2.gameBoard);

let currentUser = player1.Name;

const checkForHit = (player, x, y) => {
  if (player.gameBoard[x][y] === 1) {
    // If yes, "sink the ship" (change the value from 1 to 0)
    player.gameBoard[x][y] = 0;
    // decrement the opponent's ship count,
    player.shipCount -= 1;
    console.log (player.gameBoard);
    // and show an alert that says "Hit!"
    alert (`Hit!`)
  } else if (player.shipCount === 0) {
    alert (`Congratulations ${currentUser} you WIN!!!`)
    return;
  } else {
    alert (`You missed!`);
    currentUser = player.name; 
  }
}
while (player1.ships !== 0 || player2.ships !== 0) {
  if (currentUser === player1.name) {
    // Using the prompt() function, ask the current player to choose an x and y coordinate to strike.
    // You will need to store the user's input in a variable(s) for the next step.
    let hitX1 = parseInt(prompt(`${currentUser} Enter X coordinates to strike - from 0 to 3`));
    let hitY1 = parseInt(prompt(`${currentUser} Enter Y coordinates to strike - from 0 to 3`));
    checkForHit(player2, hitX1, hitY1);
    
  }

    /*if (player2.gameBoard[hitX1][hitY1] === 1) {
      // If yes, "sink the ship" (change the value from 1 to 0)
      player2.gameBoard[hitX1][hitY1] = 0;
      // decrement the opponent's ship count,
      player2.shipCount -= 1;
      console.log (player2.gameBoard);
      // and show an alert that says "Hit!"
      alert (`Hit!`)
    } else if (player2.shipCount === 0) {
      alert (`Congratulations ${currentUser} you WIN!!!`)
      break;
    } else {
      alert (`You missed!`);
      currentUser = player2.name; 
    }*/
    // Step 3b: Determine if the Player Sunk their Opponent's Ship
    // Using the x and y coordinates from the previous step, 
    // check the opponent's board to see if the space (array element) at those indices is a ship (is equal to 1).
    // put this into a fuction:
     
  

  if (currentUser === player2.name) {
    // Using the prompt() function, ask the current player to choose an x and y coordinate to strike.
    // You will need to store the user's input in a variable(s) for the next step.
    let hitX2 = parseInt(prompt(`${currentUser} Enter X coordinates to strike - from 0 to 3`));
    let hitY2 = parseInt(prompt(`${currentUser} Enter Y coordinates to strike - from 0 to 3`));

    // Step 3b: Determine if the Player Sunk their Opponent's Ship
    // Using the x and y coordinates from the previous step, 
    // check the opponent's board to see if the space (array element) at those indices is a ship (is equal to 1).
      if (player1.gameBoard[hitX2][hitY2] === 1) {
        // If yes, "sink the ship" (change the value from 1 to 0)
        player1.gameBoard[hitX2][hitX2] = 0;
        // decrement the opponent's ship count,
        player1.shipCount -= 1;
        console.log (player1.gameBoard);
        // and show an alert that says "Hit!"
        alert (`Hit!`)
      } else if (player1.shipCount === 0) {
        alert (`Congratulations ${currentUser} you WIN!!!`)
        break;
      } else {
        alert (`You missed!`);
        currentUser = player1.name; 
      }
  }
}
