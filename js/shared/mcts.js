/**
 * MCTS节点类
 */
class MCTSNode {
  constructor(state, parent = null) {
    this.state = state;
    this.parent = parent;
    this.children = [];
    this.visits = 0;
    this.wins = 0;
  }
  
  ucb(standpoint, temperature = 1.0) {
    if (this.visits === 0) return Infinity;
    const winRate = this.wins / this.visits;
    const normalizedWinRate = Math.max(0, Math.min(1, winRate));
    const exploration = Math.sqrt(2 * temperature * Math.log(this.parent.visits) / this.visits);
    return normalizedWinRate + exploration;
  }
  
  expandAll() {
    const actions = this.state.getLegalActions();
    for (const action of actions) {
      const newState = this.state.makeMove(action);
      this.children.push(new MCTSNode(newState, this));
    }
  }
  
  isExpanded() {
    return this.children.length === this.state.getLegalActionsLength();
  }
}

/**
 * 蒙特卡洛树搜索算法类
 */
class MCTS {
  constructor(state, currentPlayer, iterations, maxDepth) {
    this.root = new MCTSNode(state);
    this.currentPlayer = currentPlayer;
    this.iterations = iterations;
    this.maxDepth = maxDepth;
  }
  
  iterate(iteration = 0, totalIterations = this.iterations) {
    const temperature = Math.max(0.5, 1.0 - (iteration / totalIterations) * 0.5);
    
    if (!this.root.isExpanded()) {
      this.root.expandAll();
    }
    
    let node = this.root;
    
    while (node.isExpanded() && node.children.length > 0) {
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
    
    if (!node.isExpanded()) {
      node.expandAll();
      if (node.children.length > 0) {
        const urgentMove = node.state.checkUrgentMove(node.state.currentPlayer);
        if (urgentMove !== null) {
          node = node.children.find(child => child.state.lastMove === urgentMove);
        } else {
          node = node.children[Math.floor(Math.random() * node.children.length)];
        }
      }
    }
    
    let state = node.state;
    while (state.gameOver() === null) {
      const actions = state.getLegalActions();
      let selectedMove;
      
      const urgentMove = state.checkUrgentMove(state.currentPlayer);
      if (urgentMove !== null) {
        selectedMove = urgentMove;
      } else {
        selectedMove = actions[Math.floor(Math.random() * actions.length)];
      }
      
      state = state.makeMove(selectedMove);
    }
    
    let result = state.gameOver();
    
    while (node !== null) {
      node.visits++;
      
      if (result === 0) {
        node.wins += 0.5;
      } else if (node.state.movedPlayer === result) {
        node.wins += 0.0;
      } else {
        node.wins += 1.0;
      }
      
      node = node.parent;
    }
  }
  
  getBestMove() {
    // 首先检查紧急走法
    const urgentMove = this.root.state.checkUrgentMove(this.currentPlayer);
    if (urgentMove !== null) return urgentMove;
    
    for (let i = 0; i < this.iterations; i++) {
      this.iterate(i);
    }
    
    let bestChild = null;
    let bestVisits = -Infinity;
    
    for (const child of this.root.children) {
      if (child.visits > bestVisits) {
        bestVisits = child.visits;
        bestChild = child;
      }
    }
    
    return bestChild ? bestChild.state.lastMove : this.root.state.getLegalActions()[0];
  }
} 