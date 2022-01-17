// Author: Blake Vaughn
// Rev 1.0

const statusDisplay = document.querySelector('.game--status');
// const prevMove = document.querySelector('.prev--move');
// const boardCells = document.querySelector('.board--cells');
const xCounter = document.querySelector('.playerX');
const oCounter = document.querySelector('.playerO');
const xMoves = document.querySelector('.playerXmoves');
const oMoves = document.querySelector('.playerOmoves');

// Allows the game to be active or not
let gameActive = false;

let gameEnable = [true,true,true,true,true,true,true,true,true];

let boardEnable= [];

// State of all of the cells and boards of the game
let cellState = [];
				
let boardState = [];

let gameState = ["","","","","","","","",""];

let xTime = 1800;
let oTime = 1800;

let moveCount = 1;

let xTimeDisplay = "30:00";
let oTimeDisplay = "30:00";

let greek = ["\u03B1", "\u03B2", "\u03B3", "\u03B4", "\u03B5", "\u03B6", "\u03B7", "\u03B8", "\u03B9"];
let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

// Winning conditions for each board
const miniWinningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Holds current player
let currentPlayer = "X"; 

let playedBoardIndex = null;

let playedGameIndex = null;

let playedCellIndex = null;

let playedBoardID = null;

// let prevCellState = "none";

// let currBoard = ["","","","","","","","",""];

// tempCellIndex=null;

// Different status messages for the game
const winningMessage = () => `Player ${currentPlayer} has won!\nClick \"Start or Restart\" to play again!`;
const drawMessage = () => `Game ended in a draw!\nClick \"Start or Restart\" to play again!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const startMessage = () => `Click \"Start Game\" to begin!`;
const ocounterMessage = () => `Player O Time: ${oTimeDisplay}`;
const xcounterMessage = () => `Player X Time: ${xTimeDisplay}`;

// const testValueMessage = () => `Cell Index = ${playedCellIndex}\n Board Index: ${playedBoardIndex}\n Game Index: 
// ${playedGameIndex}\n Board ID: ${playedBoardID}\n Full Cell Index: ${tempCellIndex}\n Prev Cell State: ${prevCellState}`;

// const boardCellsMessage = () => `Cell 0: ${currBoard[0]}; Cell 1: ${currBoard[1]}; Cell 2: ${currBoard[2]}; 
// Cell 3: ${currBoard[3]}; Cell 4: ${currBoard[4]}; Cell 5: ${currBoard[5]}; Cell 6: ${currBoard[6]}; Cell 7: ${currBoard[7]}; 
// Cell 8: ${currBoard[8]}; `;

// Display the starting message
statusDisplay.innerHTML = startMessage();
xCounter.innerHTML = xcounterMessage();
oCounter.innerHTML = ocounterMessage();

// prevMove.innerHTML = testValueMessage();

// boardCells.innerHTML = boardCellsMessage();

var myfunc = setInterval(function() {
	if (xTime===0){
		statusDisplay.innerHTML = "Player O has won on time!\n Click \"Start\" or \"Restart\" to play again";
		gameActive = false;
	}
	if (oTime===0){
		statusDisplay.innerHTML = "Player X has won on time!\n Click \"Start\" or \"Restart\" to play again";
		gameActive = false;
	}

	if (gameActive){
		if (currentPlayer === "X"){
			xTime--;
		} else {
			oTime--;
		}
	}
	if (oTime % 60 < 10){
		oTimeDisplay = (parseInt(oTime/60)) + ":0" + (oTime%60); 
	} else {
		oTimeDisplay = (parseInt(oTime/60)) + ":" + (oTime%60); 
	}
	if (xTime % 60 < 10){
		xTimeDisplay = (parseInt(xTime/60)) + ":0" + (xTime%60); 
	} else {
		xTimeDisplay = (parseInt(xTime/60)) + ":" + (xTime%60); 
	}
	xCounter.innerHTML = xcounterMessage();
	oCounter.innerHTML = ocounterMessage();
}, 1000)

function handleMoveCounter() {
	if (currentPlayer === "X"){
		xMoves.innerHTML  += '<br>' + moveCount + ") " + greek[playedGameIndex] + letters[playedBoardIndex] + playedCellIndex;
	} else {
		oMoves.innerHTML  += '<br>' + moveCount + ") " + greek[playedGameIndex] + letters[playedBoardIndex] + playedCellIndex;
		moveCount++;
	}
	
}

// If a cell is played, make the cell display the current player 
function handleCellPlayed(clickedCell) {
    cellState[playedGameIndex][playedBoardIndex][playedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
	handleMoveCounter();
	//prevMove.innerHTML = testValueMessage();
	if (currentPlayer === "X"){
		xTime+=10;
	} else {
		oTime +=10;
	}
}

// Changes the player between X and O
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleColorChange() {
	for (let i =0; i<=8 ; i++){
		for (let j=0; j<=8; j++){
			let boardID = ((i+1)*1000) + j;
			if (gameEnable[i] && boardState[i][j]===''){
				if (boardEnable[i][j]){
					document.getElementById(boardID.toString()).style.backgroundColor = "gray"
				} else {
					document.getElementById(boardID.toString()).style.backgroundColor = "black"
				}
			} else if (boardState[i][j]==='' && gameState[i]==='') {
				if (boardEnable[i][j]){
					document.getElementById(boardID.toString()).style.backgroundColor = "purple"
				} else {
					document.getElementById(boardID.toString()).style.backgroundColor = "black"
				}
			}
		}
	}
}

// Determines which boards should be playable next turn and changes their color accordingly
function handleBoardChange() {
	boardEnable[playedGameIndex][playedBoardIndex] = false;
	if (boardState[playedGameIndex][playedCellIndex]===''){
		for (let i=0; i<=8; i++){
			boardEnable[playedGameIndex][i] = false;
		}
		boardEnable[playedGameIndex][playedCellIndex] = true;
		
	}
	else {
		for (let i=0; i<= 8; i++){
			if (boardState[playedGameIndex][i]===''){
				boardEnable[playedGameIndex][i] = true;
			}
			else {
				boardEnable[playedGameIndex][i] = false;
			}
		}
	}

	gameEnable[playedGameIndex] = false;
	if (gameState[playedBoardIndex] === ''){
		for (let i=0; i<=8; i++){
			gameEnable[i] = false;
		}
		gameEnable[playedBoardIndex] = true;
	}
	else {
		for (let i=0; i<= 8; i++){
			if (gameState[i]===''){
				gameEnable[i] = true;
			}
		}
	}
	handleColorChange();
}

// Checks to see if a board has been won or drawn
function checkBoardStatus() {
	let roundWon = false;
	//prevCellState = cellState[playedGameIndex][playedBoardIndex][playedCellIndex];
	//prevMove.innerHTML = testValueMessage();
    for (let i = 0; i <= 7; i++) {
        const winCondition = miniWinningConditions[i];
        let a = cellState[playedGameIndex][playedBoardIndex][winCondition[0]];
        let b = cellState[playedGameIndex][playedBoardIndex][winCondition[1]];
        let c = cellState[playedGameIndex][playedBoardIndex][winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
	if (roundWon) {
        boardState[playedGameIndex][playedBoardIndex] = currentPlayer;
		boardEnable[playedGameIndex][playedBoardIndex] = false;
		if (currentPlayer === "X")
			document.getElementById(playedBoardID.toString()).style.backgroundColor = "red"
		else
			document.getElementById(playedBoardID.toString()).style.backgroundColor = "blue"
    }
	else {
		let draw = true;
		// for (let i =0; i<=8; i++) {
		// 	currBoard[i] = cellState[playedGameIndex][playedBoardIndex][i];
		// 	//boardCells.innerHTML = boardCellsMessage();
		// }
		for (let i =0; i<=8; i++) {
			if (cellState[playedGameIndex][playedBoardIndex][i] === ""){
				draw = false;
				break
			}
		}

		if (draw) {
			boardState[playedGameIndex][playedBoardIndex] = "D";
			boardEnable[playedGameIndex][playedBoardIndex] = false;
			document.getElementById(playedBoardID.toString()).style.backgroundColor = "green"
		}
	}
	checkGameStatus();
}

function checkGameStatus() {
	let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = miniWinningConditions[i];
        let a = boardState[playedGameIndex][winCondition[0]];
        let b = boardState[playedGameIndex][winCondition[1]];
        let c = boardState[playedGameIndex][winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c && a !== "D") {
            roundWon = true;
            break
        }
    }
	if (roundWon) {
        gameState[playedGameIndex] = currentPlayer;
		gameEnable[playedGameIndex] = false;
		if (currentPlayer === "X"){
			for (let i =0; i<=8 ; i++){
				let boardID = ((playedGameIndex+1)*1000) + i;
				boardEnable[playedGameIndex][i] = false;
				document.getElementById(boardID.toString()).style.backgroundColor = "red"
			}
		}
		else{
			for (let i =0; i<=8 ; i++){
				let boardID = ((playedGameIndex+1)*1000) + i;
				boardEnable[playedGameIndex][i] = false;
				document.getElementById(boardID.toString()).style.backgroundColor = "blue"
			}
		}
    }
	else {
		let miniGameState = ["", "", "", "", "", "", "", "", ""];

		for (let i =0; i<=8; i++) {
			miniGameState[i] = boardState[playedGameIndex][i];
		}

		let roundDraw = !miniGameState.includes("");
		if (roundDraw) {
			gameState[playedGameIndex] = "D";
			for (let i =0; i<=8 ; i++){
				let boardID = ((playedGameIndex+1)*1000) + i;
				boardEnable[playedGameIndex][i] = false;
				document.getElementById(boardID.toString()).style.backgroundColor = "green"
			}
		}
	}

	checkFullStatus();
}

// Checks to see if the game has been won or drawn
function checkFullStatus() {
	let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = miniWinningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c && a !== "D") {
            roundWon = true;
            break
        }
    }
	if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }	

	handleBoardChange();
	handlePlayerChange();
}

function initArrs() {
	gameEnable = [true,true,true,true,true,true,true,true,true];
	gameState = ["","","","","","","","",""];
	cellState = [];
	boardState = [];
	boardEnable = [];
	for (let i = 0; i<=8; i++){
		boardEnable.push([]);
		boardState.push([]);
		cellState.push([]);
		for (let j=0; j<=8; j++){
			boardEnable[i].push(true);
			boardState[i].push("");
			cellState[i].push([]);
			for (let k=0; k<=8; k++){
				cellState[i][j].push("");
			}
		}
	}
}

function getBoardPlayed(clickedCellIndex) {
	playedGameIndex = parseInt(clickedCellIndex /100);
	playedBoardIndex = parseInt((clickedCellIndex % 100) / 10);
	playedCellIndex = parseInt(clickedCellIndex %10);

	playedBoardID = parseInt((parseInt((clickedCellIndex) /100) +1)*1000)+playedBoardIndex;
}

// Determines whether the cell that was clicked is enabled and continues if it is
function handleCellClick(clickedCellEvent) { 
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );
	
	tempCellIndex = clickedCellIndex;

	getBoardPlayed(clickedCellIndex);

    if (!gameEnable[playedGameIndex] || !boardEnable[playedGameIndex][playedBoardIndex] || cellState[playedGameIndex][playedBoardIndex][playedCellIndex] 
		!== "" || !gameActive) {
        return;
    }
  
    handleCellPlayed(clickedCell);
	checkBoardStatus();

}

// When the start button is pressed, the game starts and default values are set
function handleStartGame() {
	if (!gameActive){
		initArrs();
		handleColorChange();
		xTime=1800;
		oTime=1800;
		statusDisplay.innerHTML = currentPlayerTurn();
		gameActive = true;
		currentPlayer = "X";

		statusDisplay.innerHTML = currentPlayerTurn();
		document.querySelectorAll('.cell')
				.forEach(cell => cell.innerHTML = "");
		}
		
}

// When the restart button is pressed, the values are set to default and the game restarts
function handleRestartGame() {
	gameActive = true;
    currentPlayer = "X";
    initArrs();
	handleColorChange();
	xTime = 1800;
	oTime = 1800; 
	moveCount=1;
	xMoves.innerHTML = "Player X Moves: ";
	oMoves.innerHTML = "Player O Moves: ";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

// Handles different actions by user
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--start').addEventListener('click', handleStartGame);
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);