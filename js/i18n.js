/**
 * 国际化处理类
 * 提供多语言支持
 */
const i18n = {
  currentLang: 'zh', // 默认语言
  
  // 翻译映射
  translations: {
    zh: {
      // 游戏界面
      title: '井字棋',
      restart: '重新开始',
      aiFirst: 'AI先手',
      hint: '提示',
      player: '玩家',
      ai: 'AI',
      playerWin: '恭喜，你赢了！',
      aiWin: 'AI获胜，再接再厉！',
      draw: '平局！',
      difficulty: '难度：',
      difficultyLocked: '难度（已锁定）：',
      hard: '困难',
      algorithm: '算法：',
      stats: '战绩',
      wins: '胜利：',
      losses: '失败：',
      draws: '平局：',
      winRate: '胜率：',
      pureWinRate: '纯胜率：',
      resetStats: '重置战绩',
      confirmReset: '确认重置？',
      resetDone: '已重置！',
      
      // 算法名称
      mcts: '蒙特卡洛树搜索',
      minimax: '极小极大算法',
      
      // 侧边栏
      langTitle: '游戏设置',
      language: '语言',
      gameIntroTitle: '游戏介绍',
      intro: '井字棋是一种两人对弈的游戏，游戏盘是一个3x3的方格，两人轮流在空格中画上自己的符号，当有一方连成一条线时，该方获胜。',
      rules: '游戏规则',
      rule1: '游戏盘是一个3x3的方格。',
      rule2: '两人轮流在空格中画上自己的符号。',
      rule3: '当有一方连成一条线时，该方获胜。',
      rule4: '当所有空格都被画满且无人获胜时，游戏平局。',
      algorithms: '算法介绍',
      mctsDescription: '蒙特卡洛树搜索是一种概率性算法，通过模拟大量随机对局来评估每一步棋的胜率。',
      minimaxDescription: '极小极大算法是一种确定性算法，通过递归地评估所有可能的游戏状态来选择最优解。',
      about: '关于',
      aboutContent: '这是一个基于井字棋的AI对弈游戏，用于学习和演示不同AI算法在游戏中的应用。项目由Ian Miller开发，源代码托管在<a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>',
      langInfo: '菜单',
      
      // 提示文本
      sidebarTooltip: '打开菜单',
      resetStatsTooltip: '重置所有游戏数据',
      hintTooltip: '显示推荐的下一步',
      difficultyTooltip: '调整游戏难度',
      algorithmTooltip: '切换AI算法'
    },
    en: {
      // 英文翻译
      title: 'Tic Tac Toe',
      restart: 'Restart',
      aiFirst: 'AI First',
      hint: 'Hint',
      player: 'Player',
      ai: 'AI',
      playerWin: 'Congratulations, you won!',
      aiWin: 'AI wins, try again!',
      draw: "It's a draw!",
      difficulty: 'Difficulty:',
      difficultyLocked: 'Difficulty (locked):',
      hard: 'Hard',
      algorithm: 'Algorithm:',
      stats: 'Statistics',
      wins: 'Wins:',
      losses: 'Losses:',
      draws: 'Draws:',
      winRate: 'Win Rate:',
      pureWinRate: 'Pure Win Rate:',
      resetStats: 'Reset Stats',
      confirmReset: 'Confirm Reset?',
      resetDone: 'Reset Complete!',
      
      mcts: 'Monte Carlo Tree Search',
      minimax: 'Minimax Algorithm',
      
      langTitle: 'Game Settings',
      language: 'Language',
      gameIntroTitle: 'Game Introduction',
      intro: 'Tic Tac Toe is a game for two players who take turns marking spaces in a 3x3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.',
      rules: 'Game Rules',
      rule1: 'The game is played on a 3x3 grid.',
      rule2: 'Players take turns putting their marks in empty squares.',
      rule3: 'The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner.',
      rule4: 'When all 9 squares are full and no player has 3 marks in a row, the game ends in a draw.',
      algorithms: 'Algorithm Introduction',
      mctsDescription: 'Monte Carlo Tree Search is a probabilistic algorithm that uses random simulations to evaluate the win rate of each move.',
      minimaxDescription: 'Minimax is a deterministic algorithm that recursively evaluates all possible game states to choose the optimal solution.',
      about: 'About',
      aboutContent: 'This is an AI Tic Tac Toe game for learning and demonstrating different AI algorithms in game play. Developed by Ian Miller, source code available on <a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>',
      langInfo: 'Menu',
      
      sidebarTooltip: 'Open Menu',
      resetStatsTooltip: 'Reset all game statistics',
      hintTooltip: 'Show recommended next move',
      difficultyTooltip: 'Adjust game difficulty',
      algorithmTooltip: 'Switch AI algorithm'
    },
    ja: {
      langInfo: '説',
      langTitle: 'ゲーム設定',
      language: '言語',
      title: '三目並べ',
      gameIntroTitle: 'ゲーム紹介',
      intro: '三目並べは、3x3のグリッド上で2人のプレイヤーが交互に印をつけ、先に3つ並べた方が勝利するゲームです。',
      rulesTitle: 'ゲームのルール：',
      rule1: 'ゲーム盤は3x3のグリッドです。',
      rule2: 'プレイヤーは空いているマスに順番に印をつけます。',
      rule3: '先に3つ並べた方が勝ちです。',
      rule4: 'すべてのマスが埋まったらゲーム終了です。',
      restart: 'リスタート',
      aiFirst: 'AI先手',
      aiWin: 'AIの勝ち！',
      playerWin: 'プレイヤーの勝ち！',
      draw: '引き分け！',
      difficulty: '難易度：',
      difficultyLocked: '現在の難易度：',
      easy: '簡単',
      medium: '普通',
      hard: '難しい',
      player: 'プレイヤー',
      ai: 'AI',
      stats: '戦績',
      wins: '勝ち：',
      losses: '負け：',
      draws: '引き分け：',
      winRate: '勝率：',
      pureWinRate: '純勝率：',
      resetStats: '戦績リセット',
      resetting: 'リセット中...',
      confirmReset: '本当にすべての戦績をリセットしますか？',
      confirmReset2: '確認',
      resetDone: '完了',
      resetComplete: 'リセット完了！',
      hint: "ヒント",
      cannotChangeDifficulty: 'ゲーム中に難易度を変更できません',
      algorithm: 'アルゴリズム',
      mcts: 'モンテカルロ木探索',
      minimax: 'ミニマックスアルゴリズム',
      cannotChangeAlgorithm: 'ゲーム中にアルゴリズムを変更できません',
      about: '概要',
      rules: 'ゲームルール',
      algorithms: 'アルゴリズム',
      back: '戻る',
      close: '閉じる',
      aboutContent: 'このゲームは、AIとの対戦が楽しめる三目並べゲームです。異なるAIアルゴリズムを実装しています。Ian Millerによって開発され、ソースコードは<a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>で公開されています',
      mctsDescription: 'モンテカルロ木探索は、ランダムシミュレーションを多数実行して手の評価を行う確率的なアルゴリズムです。',
      minimaxDescription: 'ミニマックスアルゴリズムは、すべての可能なゲーム状態を再帰的に評価し、最適な手を見つける決定論的なアルゴリズムです。',
      resetStatsTooltip: 'クリックしてすべての戦績をリセットします',
      hintTooltip: 'AIが推奨するベストな手を表示',
      algorithmTooltip: 'AIが使用するアルゴリズムを選択',
      difficultyTooltip: 'AIの難易度を選択',
      sidebarTooltip: 'サイドバーメニューを開く'
    },
    ko: {
      langInfo: '설',
      langTitle: '게임 설정',
      language: '언어',
      title: '틱택토',
      gameIntroTitle: '게임 소개',
      intro: '틱택토는 3x3 격자판에서 두 플레이어가 번갈아 가며 자신의 기호를 표시하는 게임으로, 먼저 세 개를 일렬로 나열한 플레이어가 승리합니다.',
      rulesTitle: '게임 규칙:',
      rule1: '게임판은 3x3 격자입니다.',
      rule2: '플레이어는 빈 칸에 번갈아 표시합니다.',
      rule3: '먼저 세 개를 일렬로 나열한 플레이어가 승리합니다.',
      rule4: '모든 칸이 채워지면 게임이 종료됩니다.',
      restart: '다시 시작',
      aiFirst: 'AI 선공',
      aiWin: 'AI 승리!',
      playerWin: '플레이어 승리!',
      draw: '무승부!',
      difficulty: '난이도:',
      difficultyLocked: '현재 난이도:',
      easy: '쉬움',
      medium: '보통',
      hard: '어려움',
      player: '플레이어',
      ai: 'AI',
      stats: '전적',
      wins: '승:',
      losses: '패:',
      draws: '무승부:',
      winRate: '승률:',
      pureWinRate: '순 승률:',
      resetStats: '전적 초기화',
      resetting: '리셋중...',
      confirmReset: '정말로 모든 전적을 초기화하시겠습니까?',
      confirmReset2: '확인',
      resetDone: '완료',
      resetComplete: '리셋 완료!',
      hint: "힌트",
      cannotChangeDifficulty: '게임 진행 중에는 난이도를 변경할 수 없습니다',
      algorithm: '알고리즘',
      mcts: '몬테카를로 트리 알고리즘',
      minimax: '미니맥스 알고리즘',
      cannotChangeAlgorithm: '게임 진행 중에는 알고리즘을 변경할 수 없습니다',
      about: '정보',
      rules: '게임 규칙',
      algorithms: '알고리즘',
      back: '뒤로',
      close: '닫기',
      aboutContent: '이 게임은 인공지능과 대결할 수 있는 틱택토 게임으로, 다양한 AI 알고리즘을 보여주기 위해 제작되었습니다. Ian Miller가 개발했으며, 소스 코드는 <a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>에서 확인할 수 있습니다',
      mctsDescription: '몬테카를로 트리 검색은 무작위 시뮬레이션을 통해 수의 가치를 평가하는 확률적 알고리즘입니다.',
      minimaxDescription: '미니맥스 알고리즘은 가능한 모든 게임 상태를 재귀적으로 평가하여 최적의 수를 찾는 결정론적 알고리즘입니다.',
      resetStatsTooltip: '모든 게임 통계를 초기화합니다',
      hintTooltip: 'AI가 추천하는 최선의 수를 보여줍니다',
      algorithmTooltip: 'AI가 사용할 알고리즘을 선택합니다',
      difficultyTooltip: 'AI의 난이도를 선택합니다',
      sidebarTooltip: '사이드바 메뉴를 엽니다'
    },
    ru: {
      langInfo: 'Инф',
      langTitle: 'Настройки игры',
      language: 'Язык',
      title: 'Крестики-нолики',
      gameIntroTitle: 'Об игре',
      intro: 'Крестики-нолики — это игра для двух игроков на поле 3x3, где игроки по очереди ставят свои символы, и победителем считается тот, кто первым выстроит линию из трех одинаковых символов.',
      rulesTitle: 'Правила игры:',
      rule1: 'Игровое поле 3x3.',
      rule2: 'Игроки по очереди занимают свободные клетки.',
      rule3: 'Побеждает тот, кто первым выстроит линию из трёх символов.',
      rule4: 'Игра заканчивается, когда все клетки заполнены.',
      restart: 'Перезапуск',
      aiFirst: 'ИИ первый',
      aiWin: 'ИИ выиграл!',
      playerWin: 'Игрок выиграл!',
      draw: 'Ничья!',
      difficulty: 'Сложность:',
      difficultyLocked: 'Текущая сложность:',
      easy: 'Легко',
      medium: 'Средне',
      hard: 'Сложно',
      player: 'Игрок',
      ai: 'ИИ',
      stats: 'Статистика',
      wins: 'Победы:',
      losses: 'Поражения:',
      draws: 'Ничьи:',
      winRate: 'Процент побед:',
      pureWinRate: 'Чистый процент побед:',
      resetStats: 'Сбросить статистику',
      resetting: 'Перезапуск...',
      confirmReset: 'Вы уверены, что хотите сбросить все статистические данные?',
      confirmReset2: 'Сброс',
      resetDone: 'Готово',
      resetComplete: 'Статистика сброшена!',
      hint: "Подсказка",
      cannotChangeDifficulty: 'Невозможно изменить сложность во время игры',
      algorithm: 'Алгоритм',
      mcts: 'Монте-Карло дерево алгоритм',
      minimax: 'Алгоритм минимакс',
      cannotChangeAlgorithm: 'Невозможно изменить алгоритм во время игры',
      about: 'О игре',
      rules: 'Правила',
      algorithms: 'Алгоритмы',
      back: 'Назад',
      close: 'Закрыть',
      aboutContent: 'Это игра крестики-нолики с искусственным интеллектом, созданная для демонстрации различных алгоритмов ИИ в игровом процессе. Разработана Ian Miller, исходный код доступен на <a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>',
      mctsDescription: 'Алгоритм Монте-Карло - это вероятностный алгоритм, который оценивает ходы, моделируя случайные партии.',
      minimaxDescription: 'Алгоритм минимакс - это детерминированный алгоритм, который рекурсивно оценивает все возможные состояния игры для нахождения оптимального хода.',
      resetStatsTooltip: 'Нажмите, чтобы сбросить всю статистику игры',
      hintTooltip: 'Показать лучший ход, рекомендованный ИИ',
      algorithmTooltip: 'Выбрать алгоритм, используемый ИИ',
      difficultyTooltip: 'Выбрать уровень сложности ИИ',
      sidebarTooltip: 'Открыть боковое меню'
    },
    fr: {
      langInfo: 'Info',
      langTitle: 'Paramètres du jeu',
      language: 'Langue',
      title: 'Morpion',
      gameIntroTitle: 'Présentation du jeu',
      intro: 'Le Morpion est un jeu pour deux joueurs joué sur une grille 3x3, où les joueurs marquent alternativement les cases avec leur symbole. Le premier à aligner trois symboles gagne.',
      rulesTitle: 'Règles du jeu :',
      rule1: 'Le plateau est une grille 3x3.',
      rule2: 'Les joueurs marquent tour à tour une case vide.',
      rule3: 'Le premier à aligner trois symboles remporte la partie.',
      rule4: 'La partie se termine lorsque toutes les cases sont remplies.',
      restart: 'Recommencer',
      aiFirst: 'IA commence',
      aiWin: 'IA gagne !',
      playerWin: 'Joueur gagne !',
      draw: 'Égalité !',
      difficulty: 'Difficulté:',
      difficultyLocked: 'Difficulté actuelle:',
      easy: 'Facile',
      medium: 'Moyenne',
      hard: 'Difficile',
      player: 'Joueur',
      ai: 'IA',
      stats: 'Statistiques',
      wins: 'Victoires:',
      losses: 'Défaites:',
      draws: 'Nuls:',
      winRate: 'Taux de victoire:',
      pureWinRate: 'Taux de victoire pur:',
      resetStats: 'Réinitialiser les statistiques',
      resetting: 'Réinitialisation...',
      confirmReset: 'Êtes-vous sûr de vouloir réinitialiser toutes les statistiques ?',
      confirmReset2: 'Valid',
      resetDone: 'Fait',
      resetComplete: 'Statistiques réinitialisées !',
      hint: "Indice",
      cannotChangeDifficulty: 'Impossible de changer de difficulté pendant la partie',
      algorithm: 'Algorithme',
      mcts: 'Algorithme d\'arbre de Monte-Carlo',
      minimax: 'Algorithme Minimax',
      cannotChangeAlgorithm: 'Impossible de changer d\'algorithme pendant la partie',
      about: 'À propos',
      rules: 'Règles',
      algorithms: 'Algorithmes',
      back: 'Retour',
      close: 'Fermer',
      aboutContent: 'C\'est un jeu de Morpion avec des adversaires IA, créé pour démontrer différents algorithmes d\'IA dans un jeu. Développé par Ian Miller, code source disponible sur <a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>',
      mctsDescription: 'La recherche arborescente Monte-Carlo est un algorithme probabiliste qui évalue les coups en simulant des parties aléatoires.',
      minimaxDescription: 'L\'algorithme Minimax est un algorithme déterministe qui évalue récursivement tous les états de jeu possibles pour trouver le coup optimal.',
      resetStatsTooltip: 'Cliquez pour réinitialiser toutes les statistiques de jeu',
      hintTooltip: 'Afficher le meilleur coup recommandé par l\'IA',
      algorithmTooltip: 'Sélectionner l\'algorithme utilisé par l\'IA',
      difficultyTooltip: 'Sélectionner le niveau de difficulté de l\'IA',
      sidebarTooltip: 'Ouvrir le menu latéral'
    },
    es: {
      // Traducción española
      title: 'Tres en Raya',
      restart: 'Reiniciar',
      aiFirst: 'IA primero',
      hint: 'Pista',
      player: 'Jugador',
      ai: 'IA',
      playerWin: '¡Felicidades! ¡Has ganado!',
      aiWin: 'La IA gana. ¡Inténtalo de nuevo!',
      draw: '¡Empate!',
      difficulty: 'Dificultad:',
      difficultyLocked: 'Dificultad (bloqueada):',
      hard: 'Difícil',
      algorithm: 'Algoritmo:',
      stats: 'Estadísticas',
      wins: 'Victorias:',
      losses: 'Derrotas:',
      draws: 'Empates:',
      winRate: 'Porcentaje de victorias:',
      pureWinRate: 'Porcentaje puro de victorias:',
      resetStats: 'Reiniciar estadísticas',
      confirmReset: '¿Confirmar reinicio?',
      resetDone: '¡Reiniciado!',
      
      mcts: 'Búsqueda de árbol Monte Carlo',
      minimax: 'Algoritmo Minimax',
      
      langTitle: 'Configuración del juego',
      language: 'Idioma',
      gameIntroTitle: 'Introducción al juego',
      intro: 'Tres en Raya es un juego para dos jugadores que se turnan para marcar espacios en una cuadrícula de 3x3. El jugador que logre colocar tres de sus marcas en una fila horizontal, vertical o diagonal gana.',
      rules: 'Reglas del juego',
      rule1: 'El juego se juega en una cuadrícula de 3x3.',
      rule2: 'Los jugadores se turnan para colocar sus marcas en casillas vacías.',
      rule3: 'El primer jugador que coloque tres marcas en línea (horizontal, vertical o diagonal) gana.',
      rule4: 'Si todas las casillas están llenas y ningún jugador tiene tres en línea, el juego termina en empate.',
      algorithms: 'Algoritmos',
      mctsDescription: 'La búsqueda de árbol Monte Carlo es un algoritmo probabilístico que evalúa movimientos mediante simulaciones aleatorias.',
      minimaxDescription: 'El algoritmo Minimax es un algoritmo determinista que evalúa recursivamente todos los posibles estados del juego para elegir la solución óptima.',
      about: 'Acerca de',
      aboutContent: 'Este es un juego de Tres en Raya con inteligencia artificial, creado para demostrar diferentes algoritmos de IA en el juego. Desarrollado por Ian Miller, código fuente disponible en <a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>',
      langInfo: 'Menú',
      
      sidebarTooltip: 'Abrir menú',
      resetStatsTooltip: 'Reiniciar todas las estadísticas',
      hintTooltip: 'Mostrar movimiento recomendado',
      difficultyTooltip: 'Ajustar dificultad',
      algorithmTooltip: 'Cambiar algoritmo de IA'
    },
    de: {
      // Deutsche Übersetzung
      title: 'Tic Tac Toe',
      restart: 'Neustart',
      aiFirst: 'KI beginnt',
      hint: 'Tipp',
      player: 'Spieler',
      ai: 'KI',
      playerWin: 'Glückwunsch! Du hast gewonnen!',
      aiWin: 'Die KI gewinnt. Versuche es erneut!',
      draw: 'Unentschieden!',
      difficulty: 'Schwierigkeit:',
      difficultyLocked: 'Schwierigkeit (gesperrt):',
      hard: 'Schwer',
      algorithm: 'Algorithmus:',
      stats: 'Statistiken',
      wins: 'Siege:',
      losses: 'Niederlagen:',
      draws: 'Unentschieden:',
      winRate: 'Gewinnrate:',
      pureWinRate: 'Reine Gewinnrate:',
      resetStats: 'Statistiken zurücksetzen',
      confirmReset: 'Zurücksetzen bestätigen?',
      resetDone: 'Zurückgesetzt!',
      
      mcts: 'Monte-Carlo-Baumsuche',
      minimax: 'Minimax-Algorithmus',
      
      langTitle: 'Spieleinstellungen',
      language: 'Sprache',
      gameIntroTitle: 'Spieleinführung',
      intro: 'Tic Tac Toe ist ein Spiel für zwei Spieler, die abwechselnd Felder in einem 3x3-Raster markieren. Der Spieler, dem es gelingt, drei seiner Markierungen in einer horizontalen, vertikalen oder diagonalen Reihe zu platzieren, gewinnt.',
      rules: 'Spielregeln',
      rule1: 'Das Spiel wird auf einem 3x3-Raster gespielt.',
      rule2: 'Die Spieler setzen abwechselnd ihre Markierungen in leere Felder.',
      rule3: 'Der erste Spieler, der drei seiner Markierungen in einer Reihe (horizontal, vertikal oder diagonal) platziert, gewinnt.',
      rule4: 'Wenn alle 9 Felder gefüllt sind und kein Spieler drei in einer Reihe hat, endet das Spiel unentschieden.',
      algorithms: 'Algorithmen',
      mctsDescription: 'Die Monte-Carlo-Baumsuche ist ein probabilistischer Algorithmus, der durch zufällige Simulationen die Gewinnwahrscheinlichkeit jedes Zuges bewertet.',
      minimaxDescription: 'Der Minimax-Algorithmus ist ein deterministischer Algorithmus, der rekursiv alle möglichen Spielzustände bewertet, um die optimale Lösung zu finden.',
      about: 'Über',
      aboutContent: 'Dies ist ein Tic Tac Toe-Spiel mit künstlicher Intelligenz, das entwickelt wurde, um verschiedene KI-Algorithmen im Spielverlauf zu demonstrieren. Entwickelt von Ian Miller, Quellcode verfügbar auf <a href="https://github.com/Ian-Miller/tic-tac-toe" target="_blank" rel="noopener noreferrer">GitHub</a>',
      langInfo: 'Menü',
      
      sidebarTooltip: 'Menü öffnen',
      resetStatsTooltip: 'Alle Spielstatistiken zurücksetzen',
      hintTooltip: 'Empfohlenen Zug anzeigen',
      difficultyTooltip: 'Schwierigkeitsgrad anpassen',
      algorithmTooltip: 'KI-Algorithmus wechseln'
    }
  },
  
  /**
   * 切换语言
   * @param {string} lang - 语言代码
   */
  switchLang: function(lang) {
    if (!this.translations[lang]) {
      console.error('不支持的语言：' + lang);
      return;
    }
    
    this.currentLang = lang;
    
    // 更新所有带有data-lang属性的元素
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      if (this.translations[lang][key]) {
        // 对于aboutContent，使用innerHTML来解析HTML链接
        if (key === 'aboutContent') {
          el.innerHTML = this.translations[lang][key];
        } else {
          el.textContent = this.translations[lang][key];
        }
      }
    });
    
    // 更新带有data-tooltip-key属性的元素的data-tooltip值
    document.querySelectorAll('[data-tooltip-key]').forEach(el => {
      const key = el.getAttribute('data-tooltip-key');
      if (this.translations[lang][key]) {
        el.setAttribute('data-tooltip', this.translations[lang][key]);
      }
    });
    
    // 更新语言选择按钮的活动状态
    document.querySelectorAll('.lang-option').forEach(btn => {
      if (btn.getAttribute('data-lang-code') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // 更新游戏相关的统计显示
    if (window.Stats) {
      Stats.updateStatsDisplay(lang);
    }
    
    // 更新游戏状态文本
    const gameStatus = document.getElementById('gameStatus');
    if (gameStatus && window.game) {
      // 如果游戏已结束，重新显示结果信息
      const result = window.game.gameState.gameOver();
      if (result !== null) {
        if (result === window.game.aiSymbol) {
          gameStatus.textContent = this.translations[lang].aiWin;
        } else if (result === (window.game.aiSymbol === 'X' ? 'O' : 'X')) {
          gameStatus.textContent = this.translations[lang].playerWin;
        } else {
          gameStatus.textContent = this.translations[lang].draw;
        }
      }
    }
    
    // 保存用户语言偏好
    localStorage.setItem('preferredLanguage', lang);
  },
  
  /**
   * 加载用户语言偏好
   */
  loadPreferredLanguage: function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && this.translations[savedLang]) {
      this.switchLang(savedLang);
    } else {
      // 尝试检测浏览器语言
      this.detectBrowserLanguage();
    }
  },
  
  /**
   * 检测浏览器语言并设置
   */
  detectBrowserLanguage: function() {
    let browserLang = navigator.language || navigator.userLanguage;
    browserLang = browserLang.split('-')[0]; // 获取主要语言部分
    
    // 检查是否支持该语言
    if (this.translations[browserLang]) {
      this.switchLang(browserLang);
    } else {
      // 默认使用中文
      this.switchLang('zh');
    }
  }
}; 