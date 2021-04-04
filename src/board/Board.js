import React, { useEffect, useRef, useState } from 'react';
import { useSnakeDirection } from '../hooks/useSnakeDirection';
import { Score } from '../score/score';
import { getRandomInitialSnake, MATRIX_SIZE, getRandomBox } from '../util';
import './board.css';
import cn from 'classnames';

const generateHead = (direction, [row, column]) => {
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
      return [row, column];
  }
};

const generateRandomFood = (snake) => {
  let food = getRandomBox();
  while (snake.contains(food)) {
    food = getRandomBox();
  }
  return food;
};

export const Board = ({ onGameEnd }) => {
  const snakeRef = useRef(getRandomInitialSnake());
  const [food, setFood] = useState(generateRandomFood(snakeRef.current));

  const [score, setScore] = useState(0);
  const direction = useSnakeDirection();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const snake = snakeRef.current;
      const head = generateHead(direction, snake.head.data);
      if (head.includes(-1) || head.includes(20)) {
        onGameEnd(score);
      } else {
        const [foodRow, foodColumn] = food;
        const [row, column] = head;
        if (foodRow === row && foodColumn === column) {
          snake.add(head);
          setScore((score) => score + 5);
          setFood(generateRandomFood(snakeRef.current));
        } else {
          snake.add(head);
          snake.removeTail();
          setScore((score) => score + 1);
        }
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [direction, score, onGameEnd, food]);

  let rows = [];

  for (let row = 0; row < MATRIX_SIZE; row++) {
    const columns = [];
    for (let column = 0; column < MATRIX_SIZE; column++) {
      const isSnakeCell = snakeRef.current.contains([row, column]);
      let isFoodCell;
      const [foodRow, foodColumn] = food;
      if (foodRow === row && foodColumn === column) {
        isFoodCell = true;
      }
      columns.push(
        <div className={cn('box', { fill: isSnakeCell, food: isFoodCell })} key={column} />
      );
    }
    rows.push(
      <div className="row" key={row}>
        {columns}
      </div>
    );
  }

  return (
    <section>
      <div className="board">{rows}</div>
      <Score score={score} />
    </section>
  );
};
