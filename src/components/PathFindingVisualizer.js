import React, { useState } from "react";
import Node from "./Node/Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "./Algorithms/dijkstra.js";
import Header from "./Header/Header";

import "./PathFindingVisualizer.css";

const START_NODE_ROW = 5;
const START_NODE_COL = 15;
const END_NODE_ROW = 5;
const END_NODE_COL = 35;
let rowSize = 10;
let colSize = 50;
let SOLVED = false;

const clickHandler = () => {
  console.log("clicked new button!");
};
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
const findStartAndEnd = (grid) => {
  const startNode = { row: null, col: null };
  const endNode = { row: null, col: null };
  for (const row of grid) {
    for (const curNode of row) {
      if (curNode.isStart) {
        startNode.row = curNode.row;
        startNode.col = curNode.col;
      }
      if (curNode.isEnd) {
        endNode.row = curNode.row;
        endNode.col = curNode.col;
      }
    }
  }
  console.log({ startNode, endNode });
  return { startNode, endNode };
};

const handleMouseDown = (row, col, setGrid) => {
  if (!SOLVED) {
    const newGrid = currGrid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  }
};

const resetBoard = (setGrid) => {
  SOLVED = false;
  currGrid = getInitialGrid();

  setGrid(getInitialGrid());
};

const initGrid = getInitialGrid();
let currGrid = initGrid;
const PathFindingVisualizer = () => {
  const [chooseStart, setChooseStart] = useState(false);
  const [grid, setGrid] = useState(currGrid);
  const startNode = currGrid[START_NODE_ROW][START_NODE_COL];
  const endNode = currGrid[END_NODE_ROW][END_NODE_COL];

  const visualizeAlg = () => {
    if (!SOLVED) {
      const orderedNodes = dijkstra(currGrid, startNode, endNode);
      const shortestPath = getNodesInShortestPathOrder(endNode);

      const animateShortest = (shortestPath) => {
        for (let j = 0; j < shortestPath.length; j++) {
          setTimeout(() => {
            const node = shortestPath[j];
            const newGrid = grid.slice();
            const newNode = {
              ...node,
              isCorrect: true,
            };
            newGrid[node.row][node.col] = newNode;
            setGrid(newGrid);
          }, 30 * j);
        }
        console.log(SOLVED);
      };

      for (let i = 0; i < orderedNodes.length; i++) {
        if (i === orderedNodes.length - 1) {
          setTimeout(() => {
            animateShortest(shortestPath);
          }, 20 * i);
        }
        setTimeout(() => {
          const newGrid = grid.slice();
          const node = orderedNodes[i];
          const newNode = {
            ...node,
            isAnimated: true,
          };
          newGrid[node.row][node.col] = newNode;
          setGrid(newGrid);
        }, 20 * i);
      }
      SOLVED = true;
    }
  };

  return (
    <>
      <Header
        solve={visualizeAlg}
        reset={() => {
          resetBoard(setGrid);
        }}
      />

      <button
        onClick={() => {
          findStartAndEnd(currGrid);
        }}
      >
        Click Test
      </button>
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
                    onMouseDown={() => handleMouseDown(row, col, setGrid)}
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
