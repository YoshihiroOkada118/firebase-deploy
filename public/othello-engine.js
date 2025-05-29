class OthelloBoard {
    constructor() {
        this.size = 8;
        this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(0));
        this.BLACK = 1;
        this.WHITE = 2;
        this.EMPTY = 0;
        this.setupInitialBoard();
    }

    setupInitialBoard() {
        const center = Math.floor(this.size / 2);
        this.board[center - 1][center - 1] = this.WHITE;
        this.board[center - 1][center] = this.BLACK;
        this.board[center][center - 1] = this.BLACK;
        this.board[center][center] = this.WHITE;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    getFlippableDirections(row, col, player) {
        if (this.board[row][col] !== this.EMPTY) {
            return [];
        }

        const opponent = player === this.BLACK ? this.WHITE : this.BLACK;
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const flippableDirs = [];

        for (const [dr, dc] of directions) {
            const tempFlips = [];
            let r = row + dr;
            let c = col + dc;

            while (this.isValidPosition(r, c) && this.board[r][c] === opponent) {
                tempFlips.push([r, c]);
                r += dr;
                c += dc;
            }

            if (this.isValidPosition(r, c) && this.board[r][c] === player && tempFlips.length > 0) {
                flippableDirs.push([dr, dc, tempFlips]);
            }
        }

        return flippableDirs;
    }

    isValidMove(row, col, player) {
        return this.getFlippableDirections(row, col, player).length > 0;
    }

    getValidMoves(player) {
        const validMoves = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.isValidMove(row, col, player)) {
                    validMoves.push([row, col]);
                }
            }
        }
        return validMoves;
    }

    makeMove(row, col, player) {
        if (!this.isValidMove(row, col, player)) {
            return false;
        }

        const flippableDirs = this.getFlippableDirections(row, col, player);
        this.board[row][col] = player;

        for (const [dr, dc, flips] of flippableDirs) {
            for (const [flipRow, flipCol] of flips) {
                this.board[flipRow][flipCol] = player;
            }
        }

        return true;
    }

    countStones() {
        let blackCount = 0;
        let whiteCount = 0;
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] === this.BLACK) {
                    blackCount++;
                } else if (this.board[row][col] === this.WHITE) {
                    whiteCount++;
                }
            }
        }

        return { blackCount, whiteCount };
    }

    clone() {
        const newBoard = new OthelloBoard();
        newBoard.board = this.board.map(row => [...row]);
        return newBoard;
    }
}

class OthelloGame {
    constructor() {
        this.board = new OthelloBoard();
        this.currentPlayer = this.board.BLACK;
        this.gameOver = false;
        this.consecutivePasses = 0;
        this.winner = null;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.board.BLACK ? this.board.WHITE : this.board.BLACK;
    }

    getPlayerName(player) {
        return player === this.board.BLACK ? "黒" : "白";
    }

    getCurrentPlayerName() {
        return this.getPlayerName(this.currentPlayer);
    }

    checkGameOver() {
        const blackMoves = this.board.getValidMoves(this.board.BLACK);
        const whiteMoves = this.board.getValidMoves(this.board.WHITE);

        if (blackMoves.length === 0 && whiteMoves.length === 0) {
            this.gameOver = true;
            this.determineWinner();
            return true;
        }

        if (this.consecutivePasses >= 2) {
            this.gameOver = true;
            this.determineWinner();
            return true;
        }

        return false;
    }

    determineWinner() {
        const { blackCount, whiteCount } = this.board.countStones();
        if (blackCount > whiteCount) {
            this.winner = "黒の勝ち";
        } else if (whiteCount > blackCount) {
            this.winner = "白の勝ち";
        } else {
            this.winner = "引き分け";
        }
    }

    makeMove(row, col) {
        const validMoves = this.board.getValidMoves(this.currentPlayer);

        if (validMoves.length === 0) {
            this.consecutivePasses++;
            this.switchPlayer();
            this.checkGameOver();
            return {
                success: false,
                message: `${this.getPlayerName(this.currentPlayer === this.board.BLACK ? this.board.WHITE : this.board.BLACK)}はパスです`,
                pass: true
            };
        }

        const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
        if (!isValidMove) {
            return { success: false, message: "無効な手です", pass: false };
        }

        const success = this.board.makeMove(row, col, this.currentPlayer);
        if (success) {
            this.consecutivePasses = 0;
            this.switchPlayer();
            this.checkGameOver();
            return { success: true, message: "手を打ちました", pass: false };
        }

        return { success: false, message: "手を打てませんでした", pass: false };
    }

    passTurn() {
        const validMoves = this.board.getValidMoves(this.currentPlayer);
        if (validMoves.length === 0) {
            this.consecutivePasses++;
            this.switchPlayer();
            this.checkGameOver();
            return { success: true, message: "パスしました" };
        }
        return { success: false, message: "有効な手があるためパスできません" };
    }

    getGameState() {
        const { blackCount, whiteCount } = this.board.countStones();
        const validMoves = this.board.getValidMoves(this.currentPlayer);

        return {
            board: this.board.board,
            currentPlayer: this.currentPlayer,
            currentPlayerName: this.getCurrentPlayerName(),
            blackCount,
            whiteCount,
            validMoves,
            gameOver: this.gameOver,
            winner: this.winner,
            canPass: validMoves.length === 0
        };
    }

    reset() {
        this.board = new OthelloBoard();
        this.currentPlayer = this.board.BLACK;
        this.gameOver = false;
        this.consecutivePasses = 0;
        this.winner = null;
    }
}