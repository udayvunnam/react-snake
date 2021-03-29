import React, { useState, useEffect, useCallback } from 'react';
import './board.css';

const MATRIX_SIZE = 20;

export const Board = () => {
  const [snake, setSnake] = useState([
    [1, 4],
    [2, 4],
    [3, 4],
  ]);
  const [direction, setDirection] = useState('down'); // down, up , right, left

  const move = useCallback(
    (box) => {
      const [row, column] = box;
      switch (direction) {
        case 'down':
          return [row + 1, column];
        case 'up':
          return [row - 1, column];
        case 'right':
          return [row, column + 1];
        case 'left':
          return [row, column - 1];
        default:
          return [row + 1, column];
      }
    },
    [direction]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnake((snake) => {
        return snake.map(move);
      });
    }, 1000);

    return clearInterval(intervalId);
  }, [move]);

  let rows = [];

  for (let row = 0; row < MATRIX_SIZE; row++) {
    const columns = [];
    for (let column = 0; column < MATRIX_SIZE; column++) {
      const isSelected = snake.some((box) => {
        const [boxRow, boxColumn] = box;
        return boxRow === row && boxColumn === column;
      });
      columns.push(<div className={`box ${isSelected ? 'fill' : ''}`} />);
    }
    rows.push(<div className="row">{columns}</div>);
  }

  return <div className="board">{rows}</div>;
};
