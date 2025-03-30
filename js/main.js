/**
 * 主入口文件
 * 负责初始化游戏并设置全局事件监听
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 初始化游戏实例
  window.game = new Game();
  
  // 初始化界面
  initializeUI();
  
  // 初始化游戏
  game.init();
  
  // 初始化统计信息
  Stats.initStats();
  
  // 设置全局事件处理函数
  setupGlobalEventHandlers();
});

/**
 * 初始化界面
 */
function initializeUI() {
  // 创建算法选择器
  createAlgorithmSelector();
  
  // 初始化侧边栏
  initializeSidebar();
}

/**
 * 创建算法选择器
 */
function createAlgorithmSelector() {
  const algorithmSelector = document.createElement('div');
  algorithmSelector.className = 'algorithm-selector';
  
  const algorithmLabel = document.createElement('span');
  algorithmLabel.setAttribute('data-lang', 'algorithm');
  algorithmLabel.textContent = i18n.translations['zh'].algorithm || '算法：';
  
  const mctsBtn = document.createElement('button');
  mctsBtn.className = 'algorithm-btn active';
  mctsBtn.setAttribute('data-algorithm', 'mcts');
  mctsBtn.setAttribute('data-lang', 'mcts');
  mctsBtn.textContent = i18n.translations['zh'].mcts || '蒙特卡洛树搜索';
  mctsBtn.onclick = function() { game.setAlgorithm(this); };
  
  const minimaxBtn = document.createElement('button');
  minimaxBtn.className = 'algorithm-btn';
  minimaxBtn.setAttribute('data-algorithm', 'minimax');
  minimaxBtn.setAttribute('data-lang', 'minimax');
  minimaxBtn.textContent = i18n.translations['zh'].minimax || '极小极大算法';
  minimaxBtn.onclick = function() { game.setAlgorithm(this); };
  
  algorithmSelector.appendChild(algorithmLabel);
  algorithmSelector.appendChild(mctsBtn);
  algorithmSelector.appendChild(minimaxBtn);
  
  // 查找游戏控制区域，将算法选择器添加到其前面
  const gameControls = document.querySelector('.game-controls');
  if (gameControls && gameControls.parentNode) {
    gameControls.parentNode.insertBefore(algorithmSelector, gameControls);
  }
}

/**
 * 初始化侧边栏
 */
function initializeSidebar() {
  // 初始化语言选项
  initializeLanguageOptions();
  
  // 设置侧边栏相关事件
  setupSidebarEvents();
}

/**
 * 初始化语言选项
 */
function initializeLanguageOptions() {
  const langOptionsContainer = document.getElementById('langOptions');
  if (!langOptionsContainer) return;
  
  // 清空现有内容
  langOptionsContainer.innerHTML = '';
  
  // 获取当前语言的语言名称
  const languageNames = {
    'zh': '中文',
    'en': 'English',
    'ja': '日本語',
    'ko': '한국어',
    'ru': 'Русский',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch'
  };

  // 创建语言选项
  for (const langCode in languageNames) {
    const isActive = langCode === i18n.currentLang ? 'active' : '';
    const langBtn = document.createElement('button');
    langBtn.className = `lang-option ${isActive}`;
    langBtn.setAttribute('data-lang-code', langCode);
    langBtn.textContent = languageNames[langCode];
    
    // 设置点击事件
    langBtn.addEventListener('click', function() {
      i18n.switchLang(langCode);
      setTimeout(function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.classList.remove('open');
        }
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
          overlay.classList.remove('visible');
        }
        document.body.classList.remove('sidebar-open');
      }, 300);
    });
    
    langOptionsContainer.appendChild(langBtn);
  }
}

/**
 * 设置侧边栏相关事件
 */
function setupSidebarEvents() {
  // 侧边栏切换按钮
  const toggleBtn = document.querySelector('.sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      toggleSidebar();
    });
  }
  
  // 侧边栏关闭按钮
  const closeBtn = document.querySelector('.sidebar-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      toggleSidebar();
    });
  }
  
  // 侧边栏遮罩层
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', function() {
      toggleSidebar();
    });
  }
}

/**
 * 切换侧边栏显示状态
 */
window.toggleSidebar = function() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (!sidebar || !overlay) return;
  
  // 检查侧边栏是否已经打开
  const isOpen = sidebar.classList.contains('open');
  
  // 切换侧边栏状态
  if (isOpen) {
    // 关闭侧边栏
    document.body.classList.remove('sidebar-open');
    overlay.classList.remove('visible');
    sidebar.classList.remove('open');
  } else {
    // 打开侧边栏
    document.body.classList.add('sidebar-open');
    sidebar.classList.add('open');
    overlay.classList.add('visible');
  }
};

/**
 * 设置全局事件处理函数
 */
function setupGlobalEventHandlers() {
  // 重置战绩按钮
  const resetBtn = document.querySelector('.reset-btn');
  if (resetBtn) {
    // 使用防抖包装函数的点击事件
    let resetClickTimeout = null;
    resetBtn.addEventListener('click', function(e) {
      // 如果已经在处理中，忽略点击
      if (resetClickTimeout) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // 设置超短防抖计时器
      resetClickTimeout = setTimeout(() => {
        resetClickTimeout = null;
      }, 300);
      
      // 调用统计模块的重置方法
      Stats.resetStats();
    });
  }
  
  // 重新开始按钮
  const restartBtn = document.querySelector('.restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', function() {
      game.restart();
    });
  }
  
  // AI先手按钮
  const aiFirstBtn = document.querySelector('.ai-first-btn');
  if (aiFirstBtn) {
    aiFirstBtn.addEventListener('click', function() {
      game.aiFirst();
    });
  }
  
  // 提示按钮
  const hintBtn = document.querySelector('.hint-btn');
  if (hintBtn) {
    hintBtn.addEventListener('click', function() {
      game.getHint();
    });
  }
  
  // 处理ESC键和Android返回键
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        toggleSidebar();
      }
    }
  });
  
  // 处理Android返回键
  if (typeof history.pushState === 'function') {
    const pushState = history.pushState;
    history.pushState = function () {
      pushState.apply(history, arguments);
    };
    
    window.addEventListener('popstate', function() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        toggleSidebar();
        history.pushState(null, null, window.location.href);
      }
    });
    
    // 在页面加载时添加一个历史记录条目
    history.pushState(null, null, window.location.href);
  }
} 