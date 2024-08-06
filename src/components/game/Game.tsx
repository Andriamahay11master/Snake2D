import React, { useState, useEffect, useRef } from 'react';
import Snake from './Snake';
import Fruit from './Fruit';

const scale = 20;
const rows = 400 / scale; // Assumes canvas height is 400
const columns = 400 / scale; // Assumes canvas width is 400

const Game = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [fruit, setFruit] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: scale, y: 0 });
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setFruit(pickLocation());
    document.addEventListener('keydown', handleKeyDown);

    const interval = setInterval(() => {
      if (!isPaused && !isGameOver) {
        update();
      }
    }, 250);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [isPaused, isGameOver, direction, snake]);

  const pickLocation = () => {
    return {
      x: Math.floor(Math.random() * rows) * scale,
      y: Math.floor(Math.random() * columns) * scale,
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -scale });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: scale });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -scale, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: scale, y: 0 });
        break;
      default:
        break;
    }
  };

  const update = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[newSnake.length - 1].x + direction.x,
      y: newSnake[newSnake.length - 1].y + direction.y,
    };

    newSnake.push(head);
    if (head.x === fruit.x && head.y === fruit.y) {
      setFruit(pickLocation());
      setScore(score + 1);
    } else {
      newSnake.shift();
    }

    if (checkCollision(newSnake)) {
      setIsGameOver(true);
      setIsPaused(true);
    } else {
      setSnake(newSnake);
    }
  };

  const checkCollision = (snake: { x: number; y: number }[]) => {
    const head = snake[snake.length - 1];
    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400;
  };

  const handlePause = () => {
    if (!isGameOver) {
      setIsPaused(!isPaused);
    }
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
    setSnake([{ x: 0, y: 0 }]);
    setDirection({ x: scale, y: 0 });
    setFruit(pickLocation());
  };

  return (
    <>
      <div className="score">Score: {score}</div>
      <button className="pauseButton" onClick={handlePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <canvas className="gameCanvas" ref={canvasRef} width="400" height="400" />
      {isGameOver && (
        <div className="gameOver">
          <p>Game Over</p>
          <button className="restartButton" onClick={handleRestart}>Play Again</button>
        </div>
      )}
      <Snake snake={snake} scale={scale} />
      <Fruit fruit={fruit} scale={scale} />
    </>
  );
};

export default Game;
