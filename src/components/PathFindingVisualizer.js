import React, { useState } from "react";

import Node from "./Node/Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "./Algorithms/dijkstra.js";

import "./PathFindingVisualizer.css";

const START_NODE_ROW = 5;
const START_NODE_COL = 15;
const END_NODE_ROW = 5;
const END_NODE_COL = 25;

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isAnimated: false,
    isWall: false,
    isCorrect: false,
    previousNode: null,
  };
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 10; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const initGrid = getInitialGrid();
let currGrid = initGrid;
const PathFindingVisualizer = () => {
  console.log("INITIALIZE", currGrid);
  const [grid, setGrid] = useState(currGrid);
  const startNode = currGrid[START_NODE_ROW][START_NODE_COL];
  const endNode = currGrid[END_NODE_ROW][END_NODE_COL];

  const visualizeAlg = () => {
    const orderedNodes = dijkstra(currGrid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);

    const animateShortest = (shortestPath) => {
      for (let j = 0; j < shortestPath.length; j++) {
        setTimeout(() => {
          const node = shortestPath[j];
          const newGrid = currGrid.slice();
          const newNode = {
            ...node,
            isCorrect: true,
          };
          newGrid[node.row][node.col] = newNode;
          setGrid(newGrid);
          console.log(newGrid);
        }, 30 * j);
      }
    };

    for (let i = 0; i < orderedNodes.length; i++) {
      if (i === orderedNodes.length - 1) {
        setTimeout(() => {
          animateShortest(shortestPath);
        }, 20 * i);
      }
      setTimeout(() => {
        const newGrid = currGrid.slice();
        const node = orderedNodes[i];
        const newNode = {
          ...node,
          isAnimated: true,
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 20 * i);
    }
  };

  const handleMouseDown = (row, col) => {
    const newGrid = currGrid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
    console.log(currGrid);
  };
  const resetBoard = () => {
    currGrid = getInitialGrid();
    setGrid(getInitialGrid());
    console.log("RESET", currGrid);
  };

  return (
    <>
      <button onClick={visualizeAlg}>Solve</button>
      <button onClick={resetBoard}>Reset</button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {
                  row,
                  col,
                  isStart,
                  isEnd,
                  isWall,
                  isAnimated,
                  isCorrect,
                } = node;
                return (
                  <Node
                    row={row}
                    col={col}
                    key={nodeIdx}
                    isStart={isStart}
                    isEnd={isEnd}
                    isWall={isWall}
                    isAnimated={isAnimated}
                    isCorrect={isCorrect}
                    onMouseDown={() => handleMouseDown(row, col)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathFindingVisualizer;
