# Tres en Raya con Búsqueda de Árbol Monte Carlo

[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Русский](README.ru.md) | [Français](README.fr.md) | [Español](#español) | [Deutsch](README.de.md)

![Vista previa del juego](preview.jpeg)
*Nota: Si preview.es.jpeg existe, se mostrará en su lugar*

## Juego en línea

Puedes jugar al juego en línea en: [https://ian-miller.github.io/tic-tac-toe/](https://ian-miller.github.io/tic-tac-toe/)

## Introducción al proyecto

Este es un juego de Tres en Raya implementado utilizando el algoritmo de Búsqueda de Árbol Monte Carlo (MCTS).

Este proyecto es mi trabajo práctico mientras aprendo el algoritmo de Búsqueda de Árbol Monte Carlo. MCTS es un algoritmo de búsqueda heurística utilizado para procesos de decisión, particularmente adecuado para la implementación de IA en juegos de mesa.

## Algoritmos

### Búsqueda de Árbol Monte Carlo
La búsqueda de árbol Monte Carlo es un algoritmo probabilístico que evalúa movimientos mediante simulaciones aleatorias.

En este juego de Tres en Raya, el oponente de IA utiliza el algoritmo MCTS para determinar el mejor movimiento a través de los siguientes pasos:
1. Selección: Comenzando desde el nodo raíz, selecciona el nodo hijo más prometedor utilizando la fórmula UCB
2. Expansión: Si se alcanza un nodo que no está completamente expandido, crea nuevos nodos hijos
3. Simulación: Simula aleatoriamente el juego hasta su finalización desde el nuevo nodo
4. Retropropagación: Actualiza los resultados a todos los nodos visitados

### Algoritmo Minimax
El algoritmo Minimax es un algoritmo determinista que evalúa recursivamente todos los posibles estados del juego para elegir la solución óptima.

El algoritmo también incluye estrategias de optimización como el ajuste del parámetro de temperatura y el reconocimiento de movimientos urgentes. 