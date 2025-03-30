# 蒙特卡洛树搜索井字棋

[English](README.md) | [中文](#中文) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Русский](README.ru.md) | [Français](README.fr.md) | [Español](README.es.md) | [Deutsch](README.de.md)

![游戏预览](preview.jpeg)
*注意：如果 preview.zh-CN.jpeg 存在，则会显示该图片*

## 在线游戏

您可以在这里在线体验：[https://ian-miller.github.io/tic-tac-toe/](https://ian-miller.github.io/tic-tac-toe/)

## 项目介绍

这是一个使用蒙特卡洛树搜索（MCTS）算法实现的井字棋游戏。

这个项目是我在学习蒙特卡洛树搜索算法时的实践作品。MCTS是一种用于决策过程的启发式搜索算法，特别适合在棋盘游戏中实现AI。

## 算法介绍

### 蒙特卡洛树搜索
蒙特卡洛树搜索是一种概率性算法，通过模拟大量随机对局来评估每一步棋的胜率。

在这个井字棋游戏中，AI对手使用MCTS算法通过以下步骤来确定最佳移动：
1. 选择（Selection）：从根节点开始，使用UCB公式选择最有前途的子节点
2. 扩展（Expansion）：如果达到一个未完全扩展的节点，创建新的子节点
3. 模拟（Simulation）：从新节点随机模拟游戏直到结束
4. 反向传播（Backpropagation）：将结果返回到所有访问过的节点

### 极小极大算法
极小极大算法是一种确定性算法，通过递归地评估所有可能的游戏状态来选择最优解。

该算法还包括一些优化策略，如温度参数调整和紧急移动识别。 