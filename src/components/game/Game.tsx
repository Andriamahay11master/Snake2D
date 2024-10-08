import { useState, useEffect, useRef } from 'react';
import './game.scss';
import Over from '../over/Over';
const scale = 20;
const rows = 400 / scale; // Assumes canvas height is 400
const columns = 400 / scale; // Assumes canvas width is 400

const Game = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [fruit, setFruit] = useState(pickLocation());
  const [direction, setDirection] = useState({ x: scale, y: 0 });
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    const interval = setInterval(() => {
      if (!isPaused && !isGameOver) {
        update();
      }
    }, 200);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [isPaused, isGameOver, direction, snake]);

  useEffect(() => {
    draw();
  }, [snake, fruit]);

  function pickLocation(){
    return {
      x: Math.floor(Math.random() * rows) * scale,
      y: Math.floor(Math.random() * columns) * scale,
    };
  }

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

  const handleDirectionChange = (newDirection: string) => {
    switch (newDirection) {
      case 'Up':
        if (direction.y === 0) setDirection({ x: 0, y: -scale });
        break;
      case 'Down':
        if (direction.y === 0) setDirection({ x: 0, y: scale });
        break;
      case 'Left':
        if (direction.x === 0) setDirection({ x: -scale, y: 0 });
        break;
      case 'Right':
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

  const draw = () => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });

    ctx.fillStyle = '#094eb4';
    ctx.fillRect(fruit.x, fruit.y, scale, scale);
};

  return (
    <div className='game'>
      <p className="score">Score: {score}</p>
      <button className="btn btn-primary pauseButton" onClick={handlePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <canvas className="gameCanvas" ref={canvasRef} width="400" height="400" />
      <Over scale={scale} statut={isGameOver} setIsGameOver={setIsGameOver} setIsPaused={setIsPaused} setScore={setScore} setSnake={setSnake} setDirection={setDirection} setFruit={setFruit} pickLocation={pickLocation}/>
      <div className='controls'>
        <div className="control-top">
          <button className="btn btn-gray" onClick={() => handleDirectionChange('Up')}><i className='icon icon-long-arrow up'></i></button>
        </div>
        <div className="control-bottom">
          <button className="btn btn-gray" onClick={() => handleDirectionChange('Left')}><i className='icon icon-long-arrow left'></i></button>
          <button className="btn btn-gray" onClick={() => handleDirectionChange('Down')}><i className='icon icon-long-arrow down'></i></button>
          <button className="btn btn-gray" onClick={() => handleDirectionChange('Right')}><i className='icon icon-long-arrow right'></i></button>
        </div>
      </div>
    </div>
  );
};

export default Game;
