const boardElement = document.getElementById('board');
const winnerElement = document.getElementById('winner');
const cells = [];

let currentPlayer = 'X';
let winner = null;

function handleCellClick(row, col) {
    if (cells[row][col] || winner) return;

    cells[row][col] = currentPlayer;
    renderBoard();
    checkWinner(row, col);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
    boardElement.innerHTML = '';
    cells.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell || '';
            cellElement.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
            boardElement.appendChild(cellElement);
        });
    });
}

function checkWinner(row, col) {
    if (
        cells[row][0] === currentPlayer && cells[row][1] === currentPlayer && cells[row][2] === currentPlayer ||
        cells[0][col] === currentPlayer && cells[1][col] === currentPlayer && cells[2][col] === currentPlayer ||
        cells[0][0] === currentPlayer && cells[1][1] === currentPlayer && cells[2][2] === currentPlayer ||
        cells[0][2] === currentPlayer && cells[1][1] === currentPlayer && cells[2][0] === currentPlayer
    ) {
        winner = currentPlayer;
        winnerElement.textContent = `Player ${winner} wins!`;
    } else if (cells.flat().every(cell => cell)) {
        winner = 'draw';
        winnerElement.textContent = `It's a draw!`;
    }
}

// Initialize cells array
for (let i = 0; i < 3; i++) {
    cells.push(new Array(3).fill(null));
}

renderBoard();