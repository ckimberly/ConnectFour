/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let gameRunning = true;
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // const board = [
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  // ];

  for (let y = 0; y < HEIGHT; y++) { // y as HEIGHT
    board.push(Array.from({ length : WIDTH}));
  }
  //creating length of width for each row 

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //creating a new row with ID "column-top"
  //column-top with handleClick function for putting a token by clicking the top of each column


  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // creating td depends on width 
  htmlBoard.append(top);
  //appending the tds into the column-top tr

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
  //creating tr /rows depends on height
  //creating td for each row depends on width
  //setting the ids for each td cell as 
  // [0-1]	[0-2]	[0-3]	[0-4]	[0-5]	[0-6]
  // [1-1]	[1-2]	[1-3]	[1-4]	[1-5]	[1-6]
  // [2-1]	[2-2]	[2-3]	[2-4]	[2-5]	[2-6]
  // [3-1]	[3-2]	[3-3]	[3-4]	[3-5]	[3-6]
  // [4-1]	[4-2]	[4-3]	[4-4]	[4-5]	[4-6]
  // [5-1]	[5-2]	[5-3]	[5-4]	[5-5]	[5-6]

}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y; 
      //finding the board[y] with a given column x
    }
  }
  return null;
  // return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);

}
//placing an token in the spot

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  gameRunning = false;
  setTimeout(() => {alert(msg);},800);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if(gameRunning === false)
  return;
  //ignore if game ended
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // checkForTie();
  if(checkForTie()) {
    return endGame('Tie Game!');
  }
  // if(board.every(row => row.every(cell => cell))) {
  //   return endGame('Tie Game!');
  // }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // currPlayer = currPlayer === 1 ? 2 : 1;
  switchPlayer();
}

// function checkForTie() {
//   if(board.every(row => row.every(cell => cell))) {
//     return endGame('Tie Game!');
//   }
// }
function checkForTie(){
  return board.every(row => row.every(cell => cell));
}

function switchPlayer() {
  currPlayer = currPlayer === 1 ? 2 : 1;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; 
      //the tokens are horizontally connected [0,1] , [0,2] , [0,3] , [0,4]
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; 
      //the tokens are vertically connected  [0,1] , [1,1] , [2,1] , [3,1]
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //the tokens are diagonally connected from bottom right to top left [0,1] , [1,2] , [2,3] , [3,4] 
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //the tokens are diagonally connected from bottom left to top right [0,6] , [1,5] , [2,4] , [3,3] 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

