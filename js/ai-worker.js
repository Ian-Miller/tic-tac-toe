/**
 * AI Worker脚本
 * 负责在后台线程中处理AI计算
 */

// 导入共享类
importScripts('shared/state.js', 'shared/minimax.js', 'shared/mcts.js');

self.onmessage = function(e) {
  const { board, currentPlayer, iterations, maxDepth, algorithm } = e.data;
  
  // 根据所选算法计算最佳移动
  let move = -1;
  const gameState = new State(board, currentPlayer);
  
  // 检查是否有紧急走法
  const urgentMove = gameState.checkUrgentMove(currentPlayer);
  if (urgentMove !== null) {
    move = urgentMove;
  } else if (algorithm === 'minimax') {
    // 使用极小极大算法
    const minimax = new Minimax(gameState, currentPlayer);
    move = minimax.getBestMove();
  } else {
    // 使用蒙特卡洛树搜索
    const mcts = new MCTS(gameState, currentPlayer, iterations, maxDepth);
    move = mcts.getBestMove();
  }
  
  // 返回结果
  self.postMessage({ move });
}; 