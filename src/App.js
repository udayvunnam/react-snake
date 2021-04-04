import { Board } from './board/Board';
import { GameEnd } from './game-end/GameEnd';
import './App.css';
import { useState } from 'react';

function App() {
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      {isGameEnd ? (
        <GameEnd score={score} />
      ) : (
        <Board
          onGameEnd={(score) => {
            setIsGameEnd(true);
            setScore(score);
          }}
        />
      )}
    </div>
  );
}

export default App;
