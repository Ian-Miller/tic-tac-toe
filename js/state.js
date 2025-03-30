/**
 * 游戏状态类
 * 管理游戏的状态、规则和逻辑
 */
class State {
    /**
     * 创建一个新的游戏状态
     * @param {Array} board - 游戏棋盘状态，默认为空棋盘
     * @param {string} currentPlayer - 当前玩家的标志（X或O）
     */
    constructor(board=['','','','','','','','',''], currentPlayer) {
        this.board = board.slice();
        this.currentPlayer = currentPlayer; // 当前要行动的玩家
        this.lastMove = -1;
    }

    /**
     * 检查是否可以在指定位置落子
     * @param {number} move - 落子位置索引
     * @returns {boolean} 是否可以落子
     */
    canMove(move) {
        return move >= 0 && this.board[move] === '';
    }

    /**
     * 在指定位置落子并返回新的游戏状态
     * @param {number} move - 落子位置索引
     * @returns {State} 新的游戏状态
     */
    makeMove(move) {
        const newBoard = this.board.slice();
        newBoard[move] = this.currentPlayer;
        const nextPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        const newState = new State(newBoard, nextPlayer);
        newState.lastMove = move;
        newState.movedPlayer = this.currentPlayer;
        return newState;
    }

    /**
     * 检查游戏是否结束，并返回结果
     * @returns {string|number|null} 游戏结果：玩家标志(X/O)为获胜方，0为平局，null为游戏继续
     */
    gameOver() {
        const lines = [
            [0, 1, 2], // 横线
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // 竖线
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // 对角线
            [2, 4, 6]
        ];
        for (const [a, b, c] of lines) {
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return this.board.includes('') ? null : 0; // 0表示平局
    }

    /**
     * 获取所有合法的行动位置
     * @returns {Array<number>} 合法的行动位置数组
     */
    getLegalActions() {
        const actions = [];
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '') {
                actions.push(i);
            }
        }
        return actions;
    }

    /**
     * 获取合法行动位置的数量
     * @returns {number} 合法行动位置的数量
     */
    getLegalActionsLength() {
        let count = 0;
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '') count++;
        }
        return count;
    }

    /**
     * 检查紧急情况（获胜走法或阻止对手获胜）
     * @param {string} player - 玩家标志
     * @returns {number|null} 紧急走法的位置，如果没有则返回null
     */
    checkUrgentMove(player) {
        // 1. 先检查自己的必胜着法
        const winMove = this.findWinningMove(player);
        if (winMove !== null) return winMove;
        
        // 2. 检查对手的必胜着法
        const opponent = player === 'X' ? 'O' : 'X';
        const blockMove = this.findWinningMove(opponent);
        if (blockMove !== null) return blockMove;
        
        return null;
    }
    
    /**
     * 检查次要防御性走法（双威胁）
     * @param {string} player - 玩家标志
     * @returns {number|null} 防御性走法的位置，如果没有则返回null
     */
    checkDefensiveMoves(player) {
        const opponent = player === 'X' ? 'O' : 'X';
        
        // 1. 检查双威胁情况
        const forkMove = this.findForkMove(player);
        if (forkMove !== null) return forkMove;
        
        // 2. 阻止对手的双威胁
        const blockFork = this.findForkMove(opponent);
        if (blockFork !== null) return blockFork;
        
        return null;
    }

    /**
     * 检查是否存在获胜走法
     * @param {string} player - 玩家标志
     * @param {number} a - 棋盘位置索引1
     * @param {number} b - 棋盘位置索引2
     * @param {number} c - 棋盘位置索引3
     * @returns {boolean} 是否存在获胜走法
     */
    checkWinningMove(player, a, b, c) {
        const line = [this.board[a], this.board[b], this.board[c]];
        const playerCount = line.filter(cell => cell === player).length;
        const emptyCount = line.filter(cell => cell === '').length;
        return playerCount === 2 && emptyCount === 1;
    }

    /**
     * 查找获胜走法
     * @param {string} player - 玩家标志
     * @returns {number|null} 获胜走法的位置，如果没有则返回null
     */
    findWinningMove(player) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横线
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 竖线
            [0, 4, 8], [2, 4, 6]             // 对角线
        ];

        for (const [a, b, c] of lines) {
            // 检查是否有两个玩家符号和一个空位
            if (this.board[a] === player && this.board[b] === player && this.board[c] === '') {
                return c;
            }
            if (this.board[a] === player && this.board[c] === player && this.board[b] === '') {
                return b;
            }
            if (this.board[b] === player && this.board[c] === player && this.board[a] === '') {
                return a;
            }
        }
        return null;
    }

    /**
     * 查找双威胁走法
     * @param {string} player - 玩家标志
     * @returns {number|null} 双威胁走法的位置，如果没有则返回null
     */
    findForkMove(player) {
        const emptyCells = this.getLegalActions();
        
        for (const move of emptyCells) {
            const newState = this.makeMove(move);
            // 检查这个移动是否创造了多个获胜机会
            let winCount = 0;
            const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
            
            for (const [a,b,c] of lines) {
                if ((newState.board[a] === player && newState.board[b] === player && newState.board[c] === '') ||
                    (newState.board[a] === player && newState.board[c] === player && newState.board[b] === '') ||
                    (newState.board[b] === player && newState.board[c] === player && newState.board[a] === '')) {
                    winCount++;
                    if (winCount >= 2) {
                        return move; // 发现双威胁
                    }
                }
            }
        }
        return null;
    }
} 