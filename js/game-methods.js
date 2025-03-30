/**
 * Game类的方法扩展
 */

// 扩展Game原型
Game.prototype.aiFirst = function() {
  // 清除所有高亮样式
  document.querySelectorAll('td').forEach(td => {
    td.style.backgroundColor = '';
    td.style.boxShadow = '';
  });

  // 清除提示高亮
  if (this.hintHighlightedCell) {
    this.hintHighlightedCell.style.backgroundColor = '';
    this.hintHighlightedCell.style.boxShadow = '';
    this.hintHighlightedCell = null;
  }

  // 终止任何正在进行的提示计算
  if (this.hintWorker) {
    this.hintWorker.terminate();
    this.hintWorker = null;
  }
  this.hintMove = null;
  UI.updateHintButton(this);

  // 重置游戏状态并更改符号
  document.querySelectorAll('td').forEach(td => {
    td.innerHTML = '';
    td.className = '';
  });
  document.getElementById('gameStatus').textContent = '';
  document.querySelector('table').classList.remove('game-over');
  
  // 重置游戏状态
  this.gameState = new State(Array(9).fill(''), 'X');
  
  // 设置AI为先手
  this.isPlayerTurn = false;
  this.aiSymbol = 'X';
  this.playerSymbol = 'O';
  
  // 更新符号显示
  document.getElementById('playerSymbol').textContent = 'O';
  document.getElementById('aiSymbol').textContent = 'X';
  
  // 标记游戏开始并禁用难度选择
  this.gameStarted = true;
  
  // 更新算法按钮状态
  UI.updateAlgorithmButtons(this);
  
  // 显示加载指示器并确保状态行可见
  const loadingIndicator = document.getElementById('loadingIndicator');
  const statusRow = document.querySelector('.status-row');
  loadingIndicator.style.display = 'flex';
  statusRow.style.display = 'flex';
  
  // 启动计时器
  this.startTimer();
  
  // 确保在DOM更新后再发送消息给AI
  setTimeout(() => {
    if (this.aiWorker) {
      this.aiWorker.terminate();
    }
    
    // 重新创建AI worker
    this.createAIWorker();
    
    // 发送消息给Worker
    this.aiWorker.postMessage({
      board: this.gameState.board,
      currentPlayer: this.gameState.currentPlayer,
      iterations: this.difficultyMap['hard'].iterations,
      maxDepth: this.difficultyMap['hard'].maxDepth,
      algorithm: this.currentAlgorithm
    });
    
    // 记录AI开始思考的时间
    this.aiThinkingStartTime = Date.now();
  }, 50);
};

Game.prototype.handleGameOver = function() {
  console.log('游戏结束，当前难度:', 'hard', '当前算法:', this.currentAlgorithm);
  
  const result = this.gameState.gameOver();
  const statusDiv = document.getElementById('gameStatus');
  document.querySelector('table').classList.add('game-over');
  
  if (result === this.aiSymbol) {
    statusDiv.textContent = i18n.translations[this.currentLang].aiWin;
    Stats.userStats['hard'][this.currentAlgorithm].losses++;
  } else if (result === (this.aiSymbol === 'X' ? 'O' : 'X')) {
    statusDiv.textContent = i18n.translations[this.currentLang].playerWin;
    Stats.userStats['hard'][this.currentAlgorithm].wins++;
  } else {
    statusDiv.textContent = i18n.translations[this.currentLang].draw;
    Stats.userStats['hard'][this.currentAlgorithm].draws++;
  }
  
  Stats.saveUserStats();
  Stats.updateStatsDisplay(this.currentLang);
  document.getElementById('loadingIndicator').style.display = 'none';
  this.gameStarted = false;
};

Game.prototype.setAlgorithm = function(btn) {
  if (btn.disabled) return; // 如果按钮已禁用，直接返回
  
  const algorithm = btn.getAttribute('data-algorithm');
  this.currentAlgorithm = algorithm;

  // 更新按钮状态
  document.querySelectorAll('.algorithm-btn').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  
  // 重启游戏
  this.restart();
};

Game.prototype.showLoading = function() {
  this.loadingIndicator.style.display = 'flex';
  this.startTimer();
};

Game.prototype.hideLoading = function() {
  this.loadingIndicator.style.display = 'none';
  this.stopTimer();
};

Game.prototype.startTimer = function() {
  this.timerSeconds = 0;
  document.getElementById('timerDisplay').textContent = '0';
  this.timer = setInterval(() => {
    this.timerSeconds++;
    const display = document.getElementById('timerDisplay');
    display.textContent = this.timerSeconds;
    
    // 自动调整字体大小，防止数字过大
    if (this.timerSeconds >= 10) {
      display.style.fontSize = '0.8rem';
    }
    if (this.timerSeconds >= 100) {
      display.style.fontSize = '0.7rem';
    }
  }, 1000);
};

Game.prototype.stopTimer = function() {
  clearInterval(this.timer);
  this.timerSeconds = 0;
};

Game.prototype.getHint = function() {
  // 添加更严格的检查条件
  if (!this.isPlayerTurn || this.gameState.gameOver() !== null || 
      this.hintMove === null || !this.gameState.canMove(this.hintMove)) {
    return;
  }
  
  // 清除之前的高亮
  if (this.hintHighlightedCell) {
    this.hintHighlightedCell.style.backgroundColor = '';
    this.hintHighlightedCell.style.boxShadow = '';
  }
  
  // 高亮显示提示位置
  this.hintHighlightedCell = document.getElementById(this.hintMove);
  this.hintHighlightedCell.style.backgroundColor = 'rgba(94, 53, 177, 0.3)';
  this.hintHighlightedCell.style.boxShadow = '0 0 10px rgba(94, 53, 177, 0.5)';
  
  // 添加视觉反馈，提示按钮短暂闪烁
  const hintBtn = document.querySelector('.hint-btn');
  if (hintBtn) {
    hintBtn.classList.add('pulse-animation');
    setTimeout(() => {
      hintBtn.classList.remove('pulse-animation');
    }, 1000);
  }
  
  // 检测是否是移动设备
  const isMobile = window.innerWidth <= 768;
  
  // 自动滚动到棋盘位置，在移动设备上调整滚动行为
  this.hintHighlightedCell.scrollIntoView({
    behavior: 'smooth',
    block: isMobile ? 'start' : 'center',
    inline: 'nearest'
  });
  
  // 移动设备上，额外添加一个延迟滚动，确保视图正确聚焦
  if (isMobile) {
    setTimeout(() => {
      // 计算更精确的滚动位置，确保棋盘在视图中居中
      const cellRect = this.hintHighlightedCell.getBoundingClientRect();
      const scrollTop = window.pageYOffset + cellRect.top - (window.innerHeight / 3);
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }, 100);
  }
  
  // 3秒后自动移除高亮
  setTimeout(() => {
    if (this.hintHighlightedCell) {
      this.hintHighlightedCell.style.backgroundColor = '';
      this.hintHighlightedCell.style.boxShadow = '';
      this.hintHighlightedCell = null;
    }
  }, 3000);
};

Game.prototype.calculateHint = function() {
  // 只要是玩家回合且游戏未结束，就计算提示
  if (!this.isPlayerTurn || this.gameState.gameOver() !== null) {
    this.hintMove = null;
    UI.updateHintButton(this);
    return;
  }
  
  console.log("计算提示中...");

  // 清除之前的高亮
  if (this.hintHighlightedCell) {
    this.hintHighlightedCell.style.backgroundColor = '';
    this.hintHighlightedCell.style.boxShadow = '';
    this.hintHighlightedCell = null;
  }

  // 如果已经有worker在运行，先终止它
  if (this.hintWorker) {
    this.hintWorker.terminate();
    this.hintWorker = null;
  }
  
  this.hintMove = null;
  UI.updateHintButton(this);
  
  // 使用极小极大算法计算提示（不管当前使用的是什么算法）
  const minimax = new Minimax(this.gameState, this.gameState.currentPlayer);
  this.hintMove = minimax.getBestMove();
  UI.updateHintButton(this);
};

Game.prototype.loadUserStats = function() {
  Stats.loadUserStats();
};

Game.prototype.updateStatsDisplay = function() {
  Stats.updateStatsDisplay(this.currentLang);
}; 