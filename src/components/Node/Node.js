import React from "react";

import "./Node.css";

const Node = (props) => {
  const {
    col,
    isEnd,
    isStart,
    isCorrect,
    isWall,
    isAnimated,
    isVisited,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
  } = props;
  const extraClassName = isEnd
    ? "node-end"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isCorrect
    ? "node-shortest-path"
    : isAnimated
    ? "node-animated"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      // onMouseEnter={() => onMouseEnter(row, col)}
      // onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
