/**
 * UI处理类
 * 提供UI相关操作的静态方法
 */
const UI = {
  /**
   * 更新提示按钮状态
   * @param {Game} game - 游戏实例
   */
  updateHintButton: function(game) {
    const hintBtn = document.querySelector('.hint-btn');
    if (!hintBtn) return; // 安全检查
    
    // 初始状态下可能没有有效的提示走法
    const canShowHint = game.isPlayerTurn && 
                      game.gameState.gameOver() === null && 
                      game.hintMove !== null && 
                      game.gameState.canMove(game.hintMove);
    
    // 检测是否是移动设备
    const isMobile = window.innerWidth <= 768;
    
    // 修改显示逻辑
    if (isMobile) {
      // 在移动设备上，仅在可用时显示按钮，否则完全隐藏
      hintBtn.style.display = canShowHint ? 'flex' : 'none';
      
      // 如果可见，确保按钮位置是固定的
      if (canShowHint) {
        // 确保按钮在固定位置
        hintBtn.style.position = 'fixed';
        hintBtn.style.opacity = '1';
        hintBtn.style.transform = 'scale(1)';
        hintBtn.style.pointerEvents = 'auto';
      }
    } else {
      // 在桌面设备上使用原来的逻辑
      hintBtn.style.display = canShowHint ? 'inline-block' : 'none';
    }
    
    hintBtn.disabled = !canShowHint;
    
    // 确保按钮可以点击
    if (canShowHint) {
      hintBtn.style.pointerEvents = 'auto';
      hintBtn.style.opacity = '1';
    } else {
      hintBtn.style.pointerEvents = 'none';
      hintBtn.style.opacity = '0.7';
    }
  },
  
  /**
   * 更新算法按钮状态
   * @param {Game} game - 游戏实例
   */
  updateAlgorithmButtons: function(game) {
    // 检查棋盘上是否有棋子
    const hasAnyPiece = game.gameState && game.gameState.board.some(cell => cell !== '');
    
    // 检查游戏是否结束
    const isGameOver = game.gameState && game.gameState.gameOver() !== null;
    
    // 在以下情况下允许更改算法：
    // 1. 棋盘为空且不是等待AI行动，或
    // 2. 游戏已结束
    const isWaitingForAI = !game.isPlayerTurn && !hasAnyPiece;
    const canChange = (!hasAnyPiece && !isWaitingForAI) || isGameOver;
    
    document.querySelectorAll('.algorithm-btn').forEach(btn => {
      btn.disabled = !canChange;
      
      // 确保pointer-events和cursor样式正确设置
      if (!canChange) {
        btn.style.pointerEvents = 'none';
        btn.style.cursor = 'not-allowed';
      } else {
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
      }
    });
  },
  
  /**
   * 禁用难度选择器
   */
  disableDifficultySelector: function() {
    const diffSelector = document.querySelector('.difficulty-selector');
    const diffLabel = diffSelector ? diffSelector.querySelector('span[data-lang="difficulty"]') : null;
    
    if (!diffSelector || !diffLabel) return; // 安全检查
    
    // 添加禁用样式
    diffSelector.classList.add('disabled');
    
    // 更改标签文本
    diffLabel.setAttribute('data-lang', 'difficultyLocked');
    diffLabel.textContent = i18n.translations[i18n.currentLang].difficultyLocked;
    
    // 禁用按钮点击
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.style.opacity = '0.7';
      btn.style.cursor = 'not-allowed';
      btn.setAttribute('disabled', 'true');
    });
  },
  
  /**
   * 启用难度选择器
   */
  enableDifficultySelector: function() {
    const diffSelector = document.querySelector('.difficulty-selector');
    const diffLabel = diffSelector ? diffSelector.querySelector('span[data-lang="difficultyLocked"]') : null;
    
    if (!diffSelector) return; // 安全检查
    
    // 移除禁用样式
    diffSelector.classList.remove('disabled');
    
    // 恢复标签文本
    if (diffLabel) {
      diffLabel.setAttribute('data-lang', 'difficulty');
      diffLabel.textContent = i18n.translations[i18n.currentLang].difficulty;
    }
    
    // 启用按钮点击
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.style.opacity = '';
      btn.style.cursor = '';
      btn.removeAttribute('disabled');
    });
  },
  
  /**
   * 初始化UI
   * 空方法，替代原有的initTooltips方法
   */
  initTooltips: function() {
    // 空方法，不执行任何操作
  }
}; 