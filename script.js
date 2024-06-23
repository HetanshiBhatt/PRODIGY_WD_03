// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
    const gameStatus = document.getElementById('game-status');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    restartButton.addEventListener('click', restartGame);

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');
        if (gameState[index] || checkWinner()) {
            return;
        }
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            gameStatus.textContent = `${currentPlayer} wins!`;
        } else if (gameState.every(cell => cell)) {
            gameStatus.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatus.textContent = `Current Player: ${currentPlayer}`;
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function restartGame() {
        gameState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        gameStatus.textContent = `Current Player: ${currentPlayer}`;
    }
});
