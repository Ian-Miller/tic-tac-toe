/**
 * 极小极大算法类
 */
class Minimax {
  /**
   * 创建Minimax算法实例
   * @param {State} state - 初始游戏状态
   * @param {string} currentPlayer - 当前玩家标志
   */
  constructor(state, currentPlayer) {
    this.state = state;
    this.currentPlayer = currentPlayer;
  }
  
  /**
   * 获取最佳移动位置
   * @returns {number} 最佳移动位置的索引
   */
  getBestMove() {
    // 先检查紧急走法（自己获胜或阻止对手获胜）
    const urgentMove = this.state.checkUrgentMove(this.currentPlayer);
    if (urgentMove !== null) return urgentMove;
    
    const actions = this.state.getLegalActions();
    let bestScore = -Infinity;
    let bestMove = actions[0]; // 默认第一个合法移动
    
    for (const action of actions) {
      const newState = this.state.makeMove(action);
      const score = this.minimax(newState, 0, false);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = action;
      }
    }
    
    return bestMove;
  }
  
  /**
   * 递归计算极小极大值
   * @param {State} state - 当前游戏状态
   * @param {number} depth - 当前搜索深度
   * @param {boolean} isMaximizing - 是否为最大化玩家
   * @returns {number} 评估分数
   */
  minimax(state, depth, isMaximizing) {
    // 检查游戏是否结束
    const result = state.gameOver();
    if (result !== null) {
      if (result === 0) return 0; // 平局
      if (result === this.currentPlayer) {
        return 10 - depth; // 当前玩家获胜，减去深度以鼓励更快获胜
      } else {
        return depth - 10; // 对手获胜，加上深度以延长比赛
      }
    }
    
    // 如果深度过大，返回启发式评估
    if (depth > 8) {
      return this.evaluate(state);
    }
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      const actions = state.getLegalActions();
      
      for (const action of actions) {
        const newState = state.makeMove(action);
        const score = this.minimax(newState, depth + 1, false);
        bestScore = Math.max(bestScore, score);
      }
      
      return bestScore;
    } else {
      let bestScore = Infinity;
      const actions = state.getLegalActions();
      
      for (const action of actions) {
        const newState = state.makeMove(action);
        const score = this.minimax(newState, depth + 1, true);
        bestScore = Math.min(bestScore, score);
      }
      
      return bestScore;
    }
  }
  
  /**
   * 启发式评估函数
   * @param {State} state - 当前游戏状态
   * @returns {number} 评估分数
   */
  evaluate(state) {
    // 如果玩家即将获胜，给予高分
    if (state.findWinningMove(this.currentPlayer) !== null) {
      return 5;
    }
    
    // 如果对手即将获胜，给予低分
    const opponent = this.currentPlayer === 'X' ? 'O' : 'X';
    if (state.findWinningMove(opponent) !== null) {
      return -5;
    }
    
    // 如果玩家占据了中心，加分
    if (state.board[4] === this.currentPlayer) {
      return 3;
    }
    
    // 如果对手占据了中心，减分
    if (state.board[4] === opponent) {
      return -3;
    }
    
    return 0;
  }
} 