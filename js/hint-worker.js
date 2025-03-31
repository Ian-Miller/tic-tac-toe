/**
 * 提示Worker脚本
 * 负责在后台线程中计算提示移动
 */

// 导入共享类
importScripts('shared/state.js', 'shared/minimax.js');

self.onmessage = function(e) {
  const { board, currentPlayer } = e.data;
  
  // 计算提示移动
  const gameState = new State(board, currentPlayer);
  const minimax = new Minimax(gameState, currentPlayer);
  const bestMove = minimax.getBestMove();
  
  // 返回提示移动
  self.postMessage({ hintMove: bestMove });
}; 