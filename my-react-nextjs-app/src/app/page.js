"use client";

import Canvas from "../components/Canvas";

export default function Home()
{
  const onFrame = (ctx, x, y, down, scroll, frame, height, width) =>
  {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#202080';
    ctx.lineWidth = 0.25;
    ctx.beginPath();

    for (let x = 0; x < width; x += 100)
    {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    for (let y = 0; y < height; y += 100)
    {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    
    ctx.stroke();
  }

  return (
    <main>
      <Canvas fullscreen={true} onFrame={onFrame} />
    </main>
  )
}
