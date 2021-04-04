import { useState, useEffect } from 'react';
import { getRandomSnakeDirection, keyCodeMap } from '../util';

export const useSnakeDirection = () => {
  const [direction, setDirection] = useState(getRandomSnakeDirection());

  useEffect(() => {
    const onkeydown = (e) => {
      const newDirection = keyCodeMap[e.keyCode];
      setDirection(newDirection);

      // if (isValidDirection(direction, newDirection)) {
      // }
    };
    window.addEventListener('keydown', onkeydown);

    return () => window.removeEventListener('keydown', onkeydown);
  }, []);

  return direction;
};

// const isValidDirection = (currentDirection, newDirection) => {
//   if (['up', 'down'].includes(currentDirection)) {
//     return ['right', 'left'].includes(newDirection);
//   } else {
//     return ['up', 'down'].includes(newDirection);
//   }
// };
