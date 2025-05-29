class OthelloWebApp {
    constructor() {
        this.game = new OthelloGame();
        this.initializeUI();
        this.bindEvents();
        this.updateUI();
    }

    initializeUI() {
        this.boardElement = document.getElementById('game-board');
        this.blackCountElement = document.getElementById('black-count');
        this.whiteCountElement = document.getElementById('white-count');
        this.currentPlayerElement = document.getElementById('current-player');
        this.messageElement = document.getElementById('message');
        this.gameOverModal = document.getElementById('game-over-modal');
        this.winnerTextElement = document.getElementById('winner-text');
        this.finalScoreElement = document.getElementById('final-score');
        this.passButton = document.getElementById('pass-btn');
    }

    bindEvents() {
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });

        this.passButton.addEventListener('click', () => {
            this.passTurn();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.hideGameOverModal();
            this.newGame();
        });

        // Close modal when clicking outside
        this.gameOverModal.addEventListener('click', (e) => {
            if (e.target === this.gameOverModal) {
                this.hideGameOverModal();
            }
        });
    }

    newGame() {
        this.game.reset();
        this.showMessage('新しいゲームを開始しました！', 'success');
        this.updateUI();
    }

    makeMove(row, col) {
        if (this.game.gameOver) {
            return;
        }

        const result = this.game.makeMove(row, col);
        
        if (result.pass) {
            this.showMessage(`${result.message}`, 'info');
        } else {
            this.showMessage(result.message, result.success ? 'success' : 'error');
        }
        
        this.updateUI();

        if (this.game.gameOver) {
            setTimeout(() => this.showGameOverModal(), 1000);
        }
    }

    passTurn() {
        const result = this.game.passTurn();
        this.showMessage(result.message, result.success ? 'info' : 'error');
        this.updateUI();

        if (this.game.gameOver) {
            setTimeout(() => this.showGameOverModal(), 1000);
        }
    }

    updateUI() {
        this.updateBoard();
        this.updateScore();
        this.updateCurrentPlayer();
        this.updatePassButton();
    }

    updateBoard() {
        this.boardElement.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const cellValue = this.game.board.board[row][col];

                if (cellValue === 1) { // Black stone
                    const stone = document.createElement('div');
                    stone.className = 'stone black';
                    cell.appendChild(stone);
                } else if (cellValue === 2) { // White stone
                    const stone = document.createElement('div');
                    stone.className = 'stone white';
                    cell.appendChild(stone);
                } else {
                    // Empty cell - check if it's a valid move
                    const isValidMove = this.game.board.getValidMoves(this.game.currentPlayer)
                        .some(([r, c]) => r === row && c === col);

                    if (isValidMove && !this.game.gameOver) {
                        cell.classList.add('valid-move');
                        cell.addEventListener('click', () => this.makeMove(row, col));
                    }
                }

                this.boardElement.appendChild(cell);
            }
        }
    }

    updateScore() {
        const { blackCount, whiteCount } = this.game.board.countStones();
        this.blackCountElement.textContent = blackCount;
        this.whiteCountElement.textContent = whiteCount;
    }

    updateCurrentPlayer() {
        this.currentPlayerElement.textContent = this.game.getCurrentPlayerName();
    }

    updatePassButton() {
        const validMoves = this.game.board.getValidMoves(this.game.currentPlayer);
        if (validMoves.length === 0 && !this.game.gameOver) {
            this.passButton.style.display = 'inline-block';
        } else {
            this.passButton.style.display = 'none';
        }
    }

    showMessage(message, type = 'info') {
        this.messageElement.textContent = message;
        this.messageElement.className = `message ${type}`;

        // Clear message after 3 seconds
        setTimeout(() => {
            this.messageElement.textContent = '';
            this.messageElement.className = 'message';
        }, 3000);
    }

    showGameOverModal() {
        this.winnerTextElement.textContent = this.game.winner;
        const { blackCount, whiteCount } = this.game.board.countStones();
        this.finalScoreElement.textContent = `最終スコア - 黒: ${blackCount}個, 白: ${whiteCount}個`;
        this.gameOverModal.style.display = 'flex';
    }

    hideGameOverModal() {
        this.gameOverModal.style.display = 'none';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new OthelloWebApp();
});