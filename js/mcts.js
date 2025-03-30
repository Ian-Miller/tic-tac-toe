/**
 * MCTS树节点类
 */
class MCTSNode {
  /**
   * 创建一个MCTS树节点
   * @param {State} state - 节点对应的游戏状态
   * @param {MCTSNode|null} parent - 父节点
   */
  constructor(state, parent = null) {
    this.state = state;
    this.parent = parent;
    this.children = [];
    this.visits = 0;
    this.wins = 0;
    
    // RAVE/AMAF统计
    this.raveVisits = 0;
    this.raveWins = 0;
  }

  /**
   * 计算UCB（Upper Confidence Bound）值
   * @param {string} standpoint - 视角（玩家标志）
   * @param {number} temperature - 温度参数，控制探索与利用的平衡
   * @returns {number} UCB值
   */
  ucb(standpoint, temperature = 1.0) {
    if (this.visits === 0) return Infinity;
    
    // 计算利用项，确保始终为正数
    const winRate = this.wins / this.visits;
    // 确保获胜率在0-1之间
    const normalizedWinRate = Math.max(0, Math.min(1, winRate));
    
    // 计算探索项，使用温度参数
    const exploration = Math.sqrt(2 * temperature * Math.log(this.parent.visits) / this.visits);
    
    // 基本UCB计算
    const ucbValue = normalizedWinRate + exploration;
    
    // RAVE值（如果有足够数据）
    if (this.raveVisits > 0) {
      const raveWinRate = this.raveWins / this.raveVisits;
      
      // 计算混合系数beta (RAVE与UCB的权重比)
      const k = 1000; // 控制RAVE影响减弱的速度
      const beta = Math.sqrt(k / (3 * this.visits + k));
      
      // 结合RAVE值和UCB值
      return (1 - beta) * ucbValue + beta * raveWinRate;
    }
    
    return ucbValue;
  }

  /**
   * 扩展所有可能的子节点
   */
  expandAll() {
    const actions = this.state.getLegalActions();
    for (const action of actions) {
      const newState = this.state.makeMove(action);
      this.children.push(new MCTSNode(newState, this));
    }
  }
  
  /**
   * 检查节点是否已完全扩展
   * @returns {boolean} 是否已完全扩展
   */
  isExpanded() {
    return this.children.length === this.state.getLegalActionsLength();
  }
}

/**
 * 蒙特卡洛树搜索算法类
 * @extends Algorithm
 */
class MCTS {
  /**
   * 创建MCTS算法实例
   * @param {State} state - 初始游戏状态
   * @param {string} currentPlayer - 当前玩家标志
   * @param {number} iterations - 迭代次数
   * @param {number} maxDepth - 最大搜索深度
   */
  constructor(state, currentPlayer, iterations, maxDepth) {
    this.root = new MCTSNode(state);
    this.currentPlayer = currentPlayer;
    this.iterations = iterations;
    this.maxDepth = maxDepth;
  }
  
  /**
   * 执行一次MCTS迭代
   * @param {number} iteration - 当前迭代次数
   * @param {number} totalIterations - 总迭代次数
   */
  iterate(iteration = 0, totalIterations = this.iterations) {
    // 计算当前温度参数 (从1.0逐渐降低到0.5)
    const temperature = Math.max(0.5, 1.0 - (iteration / totalIterations) * 0.5);
    
    if (!this.root.isExpanded()) {
      this.root.expandAll();
    }
    
    let node = this.root;
    while (node.isExpanded() && node.children.length > 0) {
      // 检查紧急走法（自己获胜或阻止对手获胜）
      const urgentMove = node.state.checkUrgentMove(node.state.currentPlayer);
      if (urgentMove !== null) {
        node = node.children.find(child => child.state.lastMove === urgentMove);
        continue;
      }
      
      let bestChild = null;
      let bestScore = -Infinity;
      for (const child of node.children) {
        const score = child.ucb(this.currentPlayer, temperature);
        if (score > bestScore) {
          bestScore = score;
          bestChild = child;
        }
      }
      node = bestChild;
    }
    
    // 扩展节点
    if (!node.isExpanded()) {
      node.expandAll();
      if (node.children.length > 0) {
        // 检查紧急走法（自己获胜或阻止对手获胜）
        const urgentMove = node.state.checkUrgentMove(node.state.currentPlayer);
        if (urgentMove !== null) {
          node = node.children.find(child => child.state.lastMove === urgentMove);
        } else {
          // 随机选择子节点
          node = node.children[Math.floor(Math.random() * node.children.length)];
        }
      }
    }
    
    // 模拟阶段 - 记录所有移动用于AMAF更新
    let state = node.state;
    const allMoves = [];
    
    while (state.gameOver() === null) {
      const actions = state.getLegalActions();
      let selectedMove;
      
      // 检查紧急走法
      const urgentMove = state.checkUrgentMove(state.currentPlayer);
      if (urgentMove !== null) {
        selectedMove = urgentMove;
      } else {
        // 完全随机选择
        selectedMove = actions[Math.floor(Math.random() * actions.length)];
      }
      
      // 记录移动和当前玩家，用于AMAF更新
      allMoves.push({move: selectedMove, player: state.currentPlayer});
      
      // 执行移动
      state = state.makeMove(selectedMove);
    }
    
    let result = state.gameOver();
    
    // 反向传播 - 同时更新AMAF/RAVE统计
    while (node !== null) {
      node.visits++;
      
      // 修改胜负判断，正确处理对抗关系
      if (result === 0) {
        // 平局
        node.wins += 0.5;
      } else if (node.state.movedPlayer === result) {
        // 当前节点的落子导致了获胜（这对node.state.currentPlayer来说是不利的）
        node.wins += 0.0;  // 不加分，表示这是对手的有利节点
      } else {
        // 当前节点的落子没有导致立即获胜，但最终获得了胜利
        node.wins += 1.0;  // 加满分，表示这是对当前玩家有利的节点
      }
      
      // 更新AMAF/RAVE统计
      if (node.parent !== null) {
        // 获取所有兄弟节点
        const siblings = node.parent.children;
        
        for (const moveInfo of allMoves) {
          // 只考虑与当前节点父节点的当前玩家相同的移动
          if (moveInfo.player === node.parent.state.currentPlayer) {
            for (const sibling of siblings) {
              if (sibling.state.lastMove === moveInfo.move) {
                sibling.raveVisits++;
                // 使用与上面相同的胜负判断逻辑
                if (result === 0) {
                  sibling.raveWins += 0.5;
                } else if (moveInfo.player === result) {
                  sibling.raveWins += 1.0;
                } else {
                  sibling.raveWins += 0.0;
                }
                break;
              }
            }
          }
        }
      }
      
      node = node.parent;
    }
  }
  
  /**
   * 获取最佳移动位置
   * @returns {number} 最佳移动位置的索引
   */
  getBestMove() {
    // 检查紧急走法（自己获胜或阻止对手获胜）
    const urgentMove = this.root.state.checkUrgentMove(this.currentPlayer);
    if (urgentMove !== null) return urgentMove;
    
    // 执行蒙特卡洛树搜索，传递迭代计数以控制温度
    for (let i = 0; i < this.iterations; i++) {
      this.iterate(i, this.iterations);
    }
    
    // 根据最大访问次数选择最佳移动（标准MCTS实践）
    let bestChild = null;
    let bestVisits = -1;
    for (const child of this.root.children) {
      const visits = child.visits;
      
      // 优先选择访问次数最多的节点
      if (visits > bestVisits) {
        bestVisits = visits;
        bestChild = child;
      }
    }
    
    return bestChild ? bestChild.state.lastMove : this.root.state.getLegalActions()[0];
  }
} 