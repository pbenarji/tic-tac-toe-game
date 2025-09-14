// Tic Tac Toe Game JavaScript

class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        // Winning combinations
        this.winningCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal
            [2, 4, 6]  // Diagonal
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.gameStatus = document.getElementById('game-status');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.resetBtn = document.getElementById('reset-btn');
        this.newGameBtn = document.getElementById('new-game-btn');
        
        this.addEventListeners();
        this.updateDisplay();
    }
    
    addEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.newGameBtn.addEventListener('click', () => this.newGame());
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.updateCell(index);
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    checkWin() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        // Highlight winning cells
        this.highlightWinningCells();
        
        this.gameStatus.textContent = `Player ${this.currentPlayer} Wins! 🎉`;
        this.gameStatus.className = 'text-success fw-bold';
        
        // Add celebration effect
        this.addCelebrationEffect();
    }
    
    handleDraw() {
        this.gameActive = false;
        this.gameStatus.textContent = "It's a Draw! 🤝";
        this.gameStatus.className = 'text-warning fw-bold';
    }
    
    highlightWinningCells() {
        const winningCombination = this.winningCombinations.find(combination => {
            const [a, b, c] = combination;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
        
        if (winningCombination) {
            winningCombination.forEach(index => {
                this.cells[index].classList.add('winning');
            });
        }
    }
    
    addCelebrationEffect() {
        // Add confetti effect or other celebration
        const gameBoard = document.querySelector('.game-board');
        gameBoard.style.animation = 'pulse 0.5s ease-in-out 3';
    }
    
    updateDisplay() {
        this.gameStatus.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.gameStatus.className = 'text-primary fw-bold';
    }
    
    updateScores() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.updateDisplay();
    }
    
    newGame() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('reset-btn').click();
    } else if (e.key === 'n' || e.key === 'N') {
        document.getElementById('new-game-btn').click();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('cell')) {
        e.preventDefault();
    }
}, { passive: false });
