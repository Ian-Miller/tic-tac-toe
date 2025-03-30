/**
 * 游戏控制类
 * 负责初始化和管理游戏流程
 */
class Game {
  /**
   * 创建一个新的游戏实例
   */
  constructor() {
    this.gameState = new State(Array(9).fill(''), 'X');
    this.isPlayerTurn = true;
    this.aiSymbol = 'O';
    this.playerSymbol = 'X';
    this.gameStarted = false;
    this.timerSeconds = 0;
    this.timer = null;
    this.aiWorker = null;
    this.hintWorker = null;
    this.hintMove = null;
    this.hintHighlightedCell = null;
    this.currentLang = 'zh';
    this.currentAlgorithm = 'mcts';
    this.loadingIndicator = null;
    this.aiThinkingStartTime = null;

    // 设置固定为hard难度
    this.difficultyMap = {
      hard: { iterations: 500000, maxDepth: 9 }
    };
  }
  
  /**
   * 初始化游戏
   */
  init() {
    // 加载用户统计
    this.loadUserStats();
    
    // 更新战绩显示
    this.updateStatsDisplay();
    
    // 获取加载指示器
    this.loadingIndicator = document.getElementById('loadingIndicator');
    
    // 设置事件监听器
    this.setupEventListeners();
    
    // 检测是否为移动设备
    if (this.isMobile()) {
      this.setupMobileTouchEvents();
    }
    
    // 设置语言
    this.setupLanguage();
    
    // 创建AI Worker
    this.createAIWorker();
    
    // 初始化计算提示
    setTimeout(() => {
      this.calculateHint();
    }, 500);
  }
  
  /**
   * 设置事件监听器
   */
  setupEventListeners() {
    // 棋盘单元格点击事件
    for (let i = 0; i < 9; i++) {
      const cell = document.getElementById(i.toString());
      if (cell) {
        cell.addEventListener('click', () => {
          this.select(i);
        });
      }
    }
    
    // 重新开始按钮
    const restartBtn = document.querySelector('.restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.restart();
      });
    }
    
    // AI先手按钮
    const aiFirstBtn = document.querySelector('.ai-first-btn');
    if (aiFirstBtn) {
      aiFirstBtn.addEventListener('click', () => {
        this.aiFirst();
      });
    }
    
    // 提示按钮
    const hintBtn = document.querySelector('.hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        this.getHint();
      });
    }
  }
  
  /**
   * 设置移动设备触控事件
   */
  setupMobileTouchEvents() {
    // 对于移动设备，添加触摸事件
    for (let i = 0; i < 9; i++) {
      const cell = document.getElementById(i.toString());
      if (cell) {
        cell.addEventListener('touchstart', (e) => {
          // 防止长按触发上下文菜单
          e.preventDefault();
        }, { passive: false });
        
        cell.addEventListener('touchend', (e) => {
          // 防止双击缩放
          e.preventDefault();
          this.select(i);
        }, { passive: false });
      }
    }
    
    // 侧边栏按钮触摸事件
    const toggleBtn = document.querySelector('.sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.handleMenuClick();
      });
    }
  }
  
  /**
   * 创建AI Worker
   */
  createAIWorker() {
    // 创建Blob URL
    const workerScript = `
      self.onmessage = function(e) {
        const { board, currentPlayer, iterations, maxDepth, algorithm } = e.data;
        
        // 导入游戏状态类
        class State {
          constructor(board=['','','','','','','','',''], currentPlayer) {
            this.board = board.slice();
            this.currentPlayer = currentPlayer;
            this.lastMove = -1;
          }
          
          canMove(move) {
            return move >= 0 && this.board[move] === '';
          }
          
          makeMove(move) {
            const newBoard = this.board.slice();
            newBoard[move] = this.currentPlayer;
            const nextPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            const newState = new State(newBoard, nextPlayer);
            newState.lastMove = move;
            newState.movedPlayer = this.currentPlayer;
            return newState;
          }
          
          gameOver() {
            const lines = [
              [0, 1, 2], [3, 4, 5], [6, 7, 8],
              [0, 3, 6], [1, 4, 7], [2, 5, 8],
              [0, 4, 8], [2, 4, 6]
            ];
            for (const [a, b, c] of lines) {
              if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
              }
            }
            return this.board.includes('') ? null : 0;
          }
          
          getLegalActions() {
            const actions = [];
            for (let i = 0; i < this.board.length; i++) {
              if (this.board[i] === '') {
                actions.push(i);
              }
            }
            return actions;
          }
          
          getLegalActionsLength() {
            let count = 0;
            for (let i = 0; i < this.board.length; i++) {
              if (this.board[i] === '') count++;
            }
            return count;
          }
          
          checkUrgentMove(player) {
            const winMove = this.findWinningMove(player);
            if (winMove !== null) return winMove;
            
            const opponent = player === 'X' ? 'O' : 'X';
            const blockMove = this.findWinningMove(opponent);
            if (blockMove !== null) return blockMove;
            
            return null;
          }
          
          findWinningMove(player) {
            const lines = [
              [0, 1, 2], [3, 4, 5], [6, 7, 8],
              [0, 3, 6], [1, 4, 7], [2, 5, 8],
              [0, 4, 8], [2, 4, 6]
            ];
            
            for (const [a, b, c] of lines) {
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
        }
        
        // 导入MCTS算法
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
            const urgentMove = this.root.state.checkUrgentMove(this.currentPlayer);
            if (urgentMove !== null) return urgentMove;
            
            for (let i = 0; i < this.iterations; i++) {
              this.iterate(i, this.iterations);
            }
            
            let bestChild = null;
            let bestVisits = -1;
            for (const child of this.root.children) {
              const visits = child.visits;
              
              if (visits > bestVisits) {
                bestVisits = visits;
                bestChild = child;
              }
            }
            
            return bestChild ? bestChild.state.lastMove : this.root.state.getLegalActions()[0];
          }
        }
        
        // 导入极小极大算法
        class Minimax {
          constructor(state, currentPlayer) {
            this.state = state;
            this.currentPlayer = currentPlayer;
          }
          
          getBestMove() {
            const urgentMove = this.state.checkUrgentMove(this.currentPlayer);
            if (urgentMove !== null) return urgentMove;
            
            const actions = this.state.getLegalActions();
            let bestScore = -Infinity;
            let bestMove = actions[0];
            
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
          
          minimax(state, depth, isMaximizing) {
            const result = state.gameOver();
            if (result !== null) {
              if (result === 0) return 0;
              if (result === this.currentPlayer) {
                return 10 - depth;
              } else {
                return depth - 10;
              }
            }
            
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
          
          evaluate(state) {
            if (state.findWinningMove(this.currentPlayer) !== null) {
              return 5;
            }
            
            const opponent = this.currentPlayer === 'X' ? 'O' : 'X';
            if (state.findWinningMove(opponent) !== null) {
              return -5;
            }
            
            if (state.board[4] === this.currentPlayer) {
              return 3;
            }
            
            if (state.board[4] === opponent) {
              return -3;
            }
            
            return 0;
          }
        }
        
        // 根据选择的算法执行计算
        let bestMove;
        const gameState = new State(board, currentPlayer);
        
        if (algorithm === 'minimax') {
          const minimax = new Minimax(gameState, currentPlayer);
          bestMove = minimax.getBestMove();
        } else {
          // 默认使用MCTS
          const mcts = new MCTS(gameState, currentPlayer, iterations, maxDepth);
          bestMove = mcts.getBestMove();
        }
        
        // 返回最佳移动
        self.postMessage({ move: bestMove });
      };
    `;
    
    const blob = new Blob([workerScript], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    
    // 创建Worker
    if (window.Worker) {
      this.aiWorker = new Worker(workerUrl);
      
      // 处理Worker消息
      this.aiWorker.onmessage = (e) => {
        const { move } = e.data;
        
        // 添加延迟，确保加载指示器有足够显示时间
        // 极小极大算法通常计算很快，需要更长的最小延迟
        const minimumThinkingTime = this.currentAlgorithm === 'minimax' ? 800 : 300;
        const actualThinkingTime = Date.now() - this.aiThinkingStartTime;
        
        // 如果AI计算时间小于最小显示时间，添加延迟
        if (actualThinkingTime < minimumThinkingTime) {
          setTimeout(() => {
            this.processAIMove(move);
          }, minimumThinkingTime - actualThinkingTime);
        } else {
          // 否则立即处理
          this.processAIMove(move);
        }
      };
    }
  }
  
  /**
   * 处理AI的移动
   * @param {number} move - AI选择的移动位置
   */
  processAIMove(move) {
    // 隐藏加载指示器
    this.hideLoading();
    
    // 如果游戏未结束，执行AI移动
    if (this.gameState.gameOver() === null) {
      // 获取对应的单元格
      const cell = document.getElementById(move.toString());
      
      // 更新游戏状态
      this.gameState = this.gameState.makeMove(move);
      
      // 更新UI
      cell.innerHTML = `<span class="symbol">${this.aiSymbol}</span>`;
      
      // 检查游戏是否结束
      if (this.gameState.gameOver() !== null) {
        this.handleGameOver();
      } else {
        // 轮到玩家行动
        this.isPlayerTurn = true;
        
        // 重新计算提示
        this.calculateHint();
      }
    }
  }
  
  /**
   * 检测是否为移动设备
   * @returns {boolean} 是否为移动设备
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  /**
   * 设置语言
   */
  setupLanguage() {
    this.currentLang = i18n.currentLang;
    
    // 尝试从localStorage加载用户偏好的语言
    const preferredLang = localStorage.getItem('preferredLanguage');
    if (preferredLang && i18n.translations[preferredLang]) {
      // 切换到首选语言
      i18n.switchLang(preferredLang);
      this.currentLang = preferredLang;
    } else {
      // 尝试检测浏览器语言
      this.detectBrowserLanguage();
    }
  }
  
  /**
   * 检测浏览器语言
   */
  detectBrowserLanguage() {
    let browserLang = navigator.language || navigator.userLanguage;
    browserLang = browserLang.split('-')[0]; // 获取主要语言部分
    
    // 检查是否支持该语言
    if (i18n.translations[browserLang]) {
      i18n.switchLang(browserLang);
      this.currentLang = browserLang;
    }
  }
  
  /**
   * 处理玩家选择
   * @param {number} index - 棋盘位置索引
   */
  select(index) {
    // 检查是否是玩家的回合
    if (!this.isPlayerTurn) {
      return;
    }
    
    // 检查游戏是否已经结束
    if (this.gameState.gameOver() !== null) {
      return;
    }
    
    // 检查是否可以在该位置落子
    if (!this.gameState.canMove(index)) {
      return;
    }
    
    // 清除提示高亮
    if (this.hintHighlightedCell) {
      this.hintHighlightedCell.style.backgroundColor = '';
      this.hintHighlightedCell.style.boxShadow = '';
      this.hintHighlightedCell = null;
    }
    
    // 标记游戏已开始
    this.gameStarted = true;
    
    // 更新游戏状态
    this.gameState = this.gameState.makeMove(index);
    
    // 更新UI
    const cell = document.getElementById(index.toString());
    cell.innerHTML = `<span class="symbol">${this.playerSymbol}</span>`;
    
    // 检查游戏是否结束
    if (this.gameState.gameOver() !== null) {
      this.handleGameOver();
      return;
    }
    
    // 轮到AI行动
    this.isPlayerTurn = false;
    
    // 当选择困难模式时，显示加载指示器
    this.showLoading();
    
    // 确保提示按钮状态正确
    if (this.hintMove !== null) {
      this.hintMove = null;
      UI.updateHintButton(this);
    }
    
    // 发送消息给Worker
    if (this.aiWorker) {
      this.aiThinkingStartTime = Date.now();
      this.aiWorker.postMessage({
        board: this.gameState.board,
        currentPlayer: this.gameState.currentPlayer,
        iterations: this.difficultyMap.hard.iterations,
        maxDepth: this.difficultyMap.hard.maxDepth,
        algorithm: this.currentAlgorithm
      });
    }
  }
  
  /**
   * 重新开始游戏
   */
  restart() {
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
    
    // 重置提示状态
    this.hintMove = null;
    UI.updateHintButton(this);
    
    // 重置游戏状态
    document.querySelectorAll('td').forEach(td => {
      td.innerHTML = '';
      td.className = '';
    });
    document.getElementById('gameStatus').textContent = '';
    document.querySelector('table').classList.remove('game-over');
    
    // 创建新的游戏状态
    this.gameState = new State(Array(9).fill(''), 'X');
    
    // 玩家先行
    this.isPlayerTurn = true;
    this.aiSymbol = 'O';
    this.playerSymbol = 'X';
    
    // 更新符号显示
    document.getElementById('playerSymbol').textContent = 'X';
    document.getElementById('aiSymbol').textContent = 'O';
    
    // 重置游戏状态
    this.gameStarted = false;
    
    // 隐藏加载指示器
    document.getElementById('loadingIndicator').style.display = 'none';
    
    // 更新算法按钮状态
    UI.updateAlgorithmButtons(this);
    
    // 重新计算提示
    setTimeout(() => {
      this.calculateHint();
    }, 100);
  }
  
  /**
   * 处理游戏结束
   */
  handleGameOver() {
    console.log('游戏结束，当前难度:', 'hard', '当前算法:', this.currentAlgorithm);
    
    const result = this.gameState.gameOver();
    const statusDiv = document.getElementById('gameStatus');
    document.querySelector('table').classList.add('game-over');
    
    // 调试：打印当前统计数据
    console.log('更新前战绩:', JSON.parse(JSON.stringify(Stats.userStats)));
    
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
    
    // 调试：打印更新后统计数据
    console.log('更新后战绩:', JSON.parse(JSON.stringify(Stats.userStats)));
    
    Stats.saveUserStats();
    Stats.updateStatsDisplay(this.currentLang);
    document.getElementById('loadingIndicator').style.display = 'none';
    this.gameStarted = false;
    
    // 游戏结束时更新算法按钮状态，使其可点击
    UI.updateAlgorithmButtons(this);
  }
  
  /**
   * 获取提示
   */
  getHint() {
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
    
    // 自动滚动到棋盘位置
    this.hintHighlightedCell.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // 3秒后自动移除高亮
    setTimeout(() => {
      if (this.hintHighlightedCell) {
        this.hintHighlightedCell.style.backgroundColor = '';
        this.hintHighlightedCell.style.boxShadow = '';
        this.hintHighlightedCell = null;
      }
    }, 3000);
  }
  
  /**
   * 计算提示
   */
  calculateHint() {
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
  }
  
  /**
   * 加载用户战绩数据
   */
  loadUserStats() {
    Stats.loadUserStats();
  }
  
  /**
   * 更新战绩显示
   */
  updateStatsDisplay() {
    Stats.updateStatsDisplay(this.currentLang);
  }
  
  /**
   * 显示加载指示器
   */
  showLoading() {
    this.loadingIndicator.style.display = 'flex';
    this.startTimer();
  }
  
  /**
   * 隐藏加载指示器
   */
  hideLoading() {
    this.loadingIndicator.style.display = 'none';
    this.stopTimer();
  }
  
  /**
   * 启动计时器
   */
  startTimer() {
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
  }
  
  /**
   * 停止计时器
   */
  stopTimer() {
    clearInterval(this.timer);
    this.timerSeconds = 0;
  }

  /**
   * 处理菜单和侧边栏图标的点击
   */
  handleMenuClick() {
    // 如果游戏正在加载中或者AI正在思考，不执行任何操作
    if (this.isLoading || (this.aiThinking && !this.isPlayerTurn)) {
      return;
    }
    
    // 调用全局侧边栏切换方法
    window.toggleSidebar();
  }
} 