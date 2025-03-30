# Tic-tac-toe avec Recherche d'Arbre Monte Carlo

[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Русский](README.ru.md) | [Français](#français) | [Español](README.es.md) | [Deutsch](README.de.md)

![Aperçu du jeu](preview.jpeg)
*Note : si preview.fr.jpeg existe, il sera affiché à la place*

## Jeu en ligne

Vous pouvez jouer en ligne ici : [https://ian-miller.github.io/tic-tac-toe/](https://ian-miller.github.io/tic-tac-toe/)

## Introduction au projet

C'est un jeu de tic-tac-toe implémenté en utilisant l'algorithme de Recherche d'Arbre Monte Carlo (MCTS).

Ce projet est mon travail pratique dans le processus d'apprentissage de l'algorithme de Recherche d'Arbre Monte Carlo. MCTS est un algorithme de recherche heuristique utilisé dans les processus de prise de décision, particulièrement adapté à l'implémentation d'IA dans les jeux de plateau.

## Introduction aux algorithmes

### Recherche d'Arbre Monte Carlo
La Recherche d'Arbre Monte Carlo est un algorithme probabiliste qui évalue les coups en exécutant de nombreuses simulations aléatoires.

Dans ce jeu, l'IA détermine le coup optimal en utilisant l'algorithme MCTS avec les étapes suivantes :
1. Sélection : en partant du nœud racine, utiliser la formule UCB pour sélectionner le nœud enfant le plus prometteur
2. Expansion : lorsqu'un nœud non entièrement développé est atteint, créer un nouveau nœud enfant
3. Simulation : simuler aléatoirement le jeu depuis le nouveau nœud jusqu'à sa fin
4. Rétropropagation : renvoyer le résultat à tous les nœuds visités

### Algorithme Minimax
L'algorithme Minimax est un algorithme déterministe qui évalue récursivement tous les états de jeu possibles pour trouver le coup optimal.

Cet algorithme comprend également des stratégies d'optimisation telles que l'ajustement du paramètre de température et la reconnaissance des coups urgents. 