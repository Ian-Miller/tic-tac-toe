/**
 * 游戏统计数据处理类
 */
const Stats = {
  // 用户战绩数据
  userStats: {
    hard: {
      mcts: { wins: 0, losses: 0, draws: 0 },
      minimax: { wins: 0, losses: 0, draws: 0 }
    }
  },
  
  // 按钮状态锁
  _isClickLocked: false,
  _resetTimeout: null,
  
  /**
   * 初始化统计信息
   */
  initStats: function() {
    this.loadUserStats();
    this.updateStatsDisplay(i18n.currentLang);
  },
  
  /**
   * 加载用户战绩数据
   */
  loadUserStats: function() {
    const savedStats = localStorage.getItem('tictactoeStats');
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      
      // 兼容旧版本数据格式
      if (parsedStats.hard && !parsedStats.hard.mcts) {
        // 旧格式没有按算法区分，将数据迁移到新格式
        const oldHardStats = { ...parsedStats.hard };
        parsedStats.hard = {
          mcts: oldHardStats,
          minimax: { wins: 0, losses: 0, draws: 0 }
        };
      }
      
      this.userStats = parsedStats;
    } else {
      // 初始化默认结构
      this.userStats = {
        hard: {
          mcts: { wins: 0, losses: 0, draws: 0 },
          minimax: { wins: 0, losses: 0, draws: 0 }
        }
      };
    }
  },
  
  /**
   * 保存用户战绩数据
   */
  saveUserStats: function() {
    localStorage.setItem('tictactoeStats', JSON.stringify(this.userStats));
  },
  
  /**
   * 计算胜率
   * @param {Object} stats - 统计数据对象
   * @returns {string} 百分比形式的胜率
   */
  calculateWinRate: function(stats) {
    const total = stats.wins + stats.losses + stats.draws;
    if (total === 0) return 0;
    return (stats.wins / total * 100).toFixed(1);
  },
  
  /**
   * 计算纯胜率（不计算平局）
   * @param {Object} stats - 统计数据对象
   * @returns {string} 百分比形式的纯胜率
   */
  calculatePureWinRate: function(stats) {
    const totalWithoutDraws = stats.wins + stats.losses;
    if (totalWithoutDraws === 0) return 0;
    return (stats.wins / totalWithoutDraws * 100).toFixed(1);
  },
  
  /**
   * 更新战绩显示
   * @param {string} currentLang - 当前语言
   */
  updateStatsDisplay: function(currentLang) {
    const statsContainer = document.querySelector('.difficulty-stats');
    
    // 清空现有内容
    statsContainer.innerHTML = '';
    
    // 获取当前难度的统计数据
    const difficulty = 'hard'; // 只有hard难度
    
    // 创建MCTS算法统计区块
    const mctsStats = this.userStats[difficulty].mcts;
    const mctsWinRate = this.calculateWinRate(mctsStats);
    const mctsPureWinRate = this.calculatePureWinRate(mctsStats);
    
    const mctsDiv = document.createElement('div');
    mctsDiv.className = 'diff-stat hard';
    mctsDiv.innerHTML = `
      <h4 data-lang="mcts">${i18n.translations[currentLang].mcts}</h4>
      <p><span data-lang="wins">${i18n.translations[currentLang].wins}</span><span id="mcts-wins">${mctsStats.wins}</span></p>
      <p><span data-lang="losses">${i18n.translations[currentLang].losses}</span><span id="mcts-losses">${mctsStats.losses}</span></p>
      <p><span data-lang="draws">${i18n.translations[currentLang].draws}</span><span id="mcts-draws">${mctsStats.draws}</span></p>
      <p><span data-lang="winRate">${i18n.translations[currentLang].winRate}</span><span id="mcts-winrate">${mctsWinRate}%</span></p>
      <p><span data-lang="pureWinRate">${i18n.translations[currentLang].pureWinRate}</span><span id="mcts-pure-winrate">${mctsPureWinRate}%</span></p>
    `;
    
    // 创建Minimax算法统计区块
    const minimaxStats = this.userStats[difficulty].minimax;
    const minimaxWinRate = this.calculateWinRate(minimaxStats);
    const minimaxPureWinRate = this.calculatePureWinRate(minimaxStats);
    
    const minimaxDiv = document.createElement('div');
    minimaxDiv.className = 'diff-stat hard';
    
    // 使用i18n系统获取当前语言的算法名称
    minimaxDiv.innerHTML = `
      <h4 data-lang="minimax">${i18n.translations[currentLang].minimax}</h4>
      <p><span data-lang="wins">${i18n.translations[currentLang].wins}</span><span id="minimax-wins">${minimaxStats.wins}</span></p>
      <p><span data-lang="losses">${i18n.translations[currentLang].losses}</span><span id="minimax-losses">${minimaxStats.losses}</span></p>
      <p><span data-lang="draws">${i18n.translations[currentLang].draws}</span><span id="minimax-draws">${minimaxStats.draws}</span></p>
      <p><span data-lang="winRate">${i18n.translations[currentLang].winRate}</span><span id="minimax-winrate">${minimaxWinRate}%</span></p>
      <p><span data-lang="pureWinRate">${i18n.translations[currentLang].pureWinRate}</span><span id="minimax-pure-winrate">${minimaxPureWinRate}%</span></p>
    `;
    
    // 添加到容器
    statsContainer.appendChild(mctsDiv);
    statsContainer.appendChild(minimaxDiv);
    
    // 设置彩虹效果
    const winRateElements = [
      { element: document.getElementById('mcts-winrate'), value: mctsWinRate },
      { element: document.getElementById('mcts-pure-winrate'), value: mctsPureWinRate },
      { element: document.getElementById('minimax-winrate'), value: minimaxWinRate },
      { element: document.getElementById('minimax-pure-winrate'), value: minimaxPureWinRate }
    ];
    
    // 移除所有彩虹效果
    winRateElements.forEach(item => {
      if (item.element) {
        item.element.classList.remove('rainbow-text');
    
        // 胜率阈值设为60%，纯胜率阈值设为70%
        if ((item.element.id.includes('pure-winrate') && item.value >= 70) ||
            (!item.element.id.includes('pure-winrate') && item.value >= 60)) {
          item.element.classList.add('rainbow-text');
        }
      }
    });
  },
  
  /**
   * 重置战绩 - 完全重构以处理快速多次点击问题
   */
  resetStats: function() {
    // 获取重置按钮
    const btn = document.querySelector('.reset-btn');
    if (!btn) return; // 安全检查
    
    // 全局点击锁，防止任何状态下的快速多次点击
    if (this._isClickLocked) {
      return;
    }
    
    // 立即设置锁，防止多次点击
    this._isClickLocked = true;
    
    // 延迟解锁，确保有足够时间防止快速点击
    setTimeout(() => {
      this._isClickLocked = false;
    }, 300); // 300ms防抖延迟
    
    // 处理确认状态的点击
    if (btn.classList.contains('confirm')) {
      // 标记为重置中状态，完全禁用按钮
      btn.setAttribute('data-processing', 'resetting');
      btn.classList.add('processing');
      
      // 清除之前的定时器
      if (this._resetTimeout) {
        clearTimeout(this._resetTimeout);
      }
      
      // 执行重置操作
      this.userStats = {
        hard: {
          mcts: { wins: 0, losses: 0, draws: 0 },
          minimax: { wins: 0, losses: 0, draws: 0 }
        }
      };
      this.saveUserStats();
      this.updateStatsDisplay(i18n.currentLang);
      
      // 修改按钮样式为成功状态
      btn.classList.remove('confirm');
      btn.classList.add('success');
      btn.innerHTML = i18n.translations[i18n.currentLang].resetDone; 
      
      // 一段时间后恢复原样
      this._resetTimeout = setTimeout(() => {
        btn.classList.remove('success', 'processing');
        btn.innerHTML = i18n.translations[i18n.currentLang].resetStats;
        btn.removeAttribute('data-processing');
      }, 1500);
      
      return;
    }
    
    // 首次点击，进入确认状态
    btn.classList.add('confirm');
    btn.setAttribute('data-processing', 'confirming');
    btn.innerHTML = i18n.translations[i18n.currentLang].confirmReset || '确认重置？';
    
    // 清除之前可能存在的定时器
    if (this._resetTimeout) {
      clearTimeout(this._resetTimeout);
    }
    
    // 设置新的定时器，自动从确认状态恢复
    this._resetTimeout = setTimeout(() => {
      if (btn.classList.contains('confirm')) {
        btn.classList.remove('confirm');
        btn.innerHTML = i18n.translations[i18n.currentLang].resetStats;
      }
      btn.removeAttribute('data-processing');
    }, 3000);
  }
}; 