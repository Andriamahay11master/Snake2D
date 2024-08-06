import React, { useEffect, useRef } from 'react';

type FruitSegment = {
    x: number;
    y: number;
  };

  interface FruitProps {
    fruit: FruitSegment[];
    scale: number;
  }

const Fruit = ({ fruit, scale } : FruitProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    fruit.forEach((segment) => {
      ctx.fillStyle = '#4cafab';
      ctx.fillRect(segment.x, segment.y, scale, scale);
    });
  }, [fruit, scale]);

  return <canvas ref={canvasRef} width="400" height="400" style={{ display: 'none' }} />;
};

export default Fruit;
