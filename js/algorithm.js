/**
 * 算法基类接口
 * 定义了所有游戏AI算法应实现的方法
 */
class Algorithm {
  /**
   * 构造函数
   * @param {State} state - 游戏状态
   * @param {string} currentPlayer - 当前玩家标志
   */
  constructor(state, currentPlayer) {
    if (new.target === Algorithm) {
      throw new Error("算法基类不能直接实例化");
    }
    this.state = state;
    this.currentPlayer = currentPlayer;
  }

  /**
   * 获取最佳移动位置（需要子类实现）
   * @returns {number} 最佳移动位置的索引
   */
  getBestMove() {
    throw new Error("子类必须实现getBestMove方法");
  }

  /**
   * 创建指定类型的算法实例
   * @param {string} type - 算法类型
   * @param {State} state - 游戏状态
   * @param {string} currentPlayer - 当前玩家标志
   * @param {Object} options - 算法选项
   * @returns {Algorithm} 算法实例
   */
  static create(type, state, currentPlayer, options = {}) {
    switch (type) {
      case 'mcts':
        return new MCTS(state, currentPlayer, options.iterations || 10000, options.maxDepth || 9);
      case 'minimax':
        return new Minimax(state, currentPlayer);
      default:
        throw new Error(`未知的算法类型: ${type}`);
    }
  }
} 