import { LinkedList } from './linked-list';

export const keyCodeMap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};


export const MATRIX_SIZE = 15;

export const randomNumberBetweenInterval = (min, max) => {
  // return min - 1 + Math.ceil(Math.random() * (max - min));
  return min + Math.floor(Math.random() * (max - min + 1)); // min and max included
};

export const getRandomInitialSnake = () => {
  const snake = new LinkedList();
  snake.add([1, 4])
  snake.add([2, 4])
  snake.add([3, 4])
  return snake;
};

export const getRandomSnakeDirection = () => {
  return keyCodeMap[randomNumberBetweenInterval(37, 40)];
};

export const getRandomBox = () => {
  return [
    randomNumberBetweenInterval(0, MATRIX_SIZE - 1),
    randomNumberBetweenInterval(0, MATRIX_SIZE - 1),
  ];
};
