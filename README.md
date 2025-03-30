# Monte Carlo Tree Search Tic-Tac-Toe

[English](#english) | [中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Русский](README.ru.md) | [Français](README.fr.md)

![Game preview](preview.jpeg)
*Note: If preview.en.jpeg exists, it will be displayed instead*

## Project Introduction

This is a Tic-Tac-Toe game implemented using the Monte Carlo Tree Search (MCTS) algorithm.

This project is my practical work while learning the Monte Carlo Tree Search algorithm. MCTS is a heuristic search algorithm used for decision processes, particularly suitable for AI implementation in board games.

In this Tic-Tac-Toe game, the AI opponent uses the MCTS algorithm to determine the best move through the following steps:
1. Selection: Starting from the root node, select the most promising child node using the UCB formula
2. Expansion: If a node that is not fully expanded is reached, create new child nodes
3. Simulation: Randomly simulate the game to completion from the new node
4. Backpropagation: Update the results back to all visited nodes

The algorithm also includes optimization strategies such as temperature parameter adjustment and urgent move recognition.
