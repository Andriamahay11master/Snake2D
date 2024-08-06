import React, { useEffect, useRef } from 'react';

type SnakeSegment = {
    x: number;
    y: number;
  };

  interface SnakeProps {
    snake: SnakeSegment[];
    scale: number;
  }

const Snake = ({ snake, scale } : SnakeProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if(ctx){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
  
            ctx.fillStyle = '#FFF';
            snake.forEach((segment) => {
            ctx.fillRect(segment.x, segment.y, scale, scale);
            });
        }
        
      }
  }, [snake, scale]);

  return <canvas ref={canvasRef} width="400" height="400" style={{ display: 'none' }} />;
};

export default Snake;
