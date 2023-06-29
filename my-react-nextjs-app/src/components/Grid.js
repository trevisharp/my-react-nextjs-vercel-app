"use client";

import { useState } from "react";
import Canvas from "../components/Canvas";

export default function Grid(props)
{
    const [baseX, setBaseX] = useState(0);
    const [baseY, setBaseY] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [downPoint, setDownPoint] = useState(undefined);

    const onFrame = (ctx, x, y, down, scroll, frame, height, width) =>
    {
        let newZoom = zoom + scroll / 10;
        newZoom = newZoom < 10 ? 10 : newZoom;
        setZoom(newZoom)

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = '#202080';
        ctx.lineWidth = 0.25;

        ctx.beginPath();

        for (let x = baseX % zoom; x < width; x += zoom)
        {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }

        for (let y = baseY % zoom; y < height; y += zoom)
        {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }

        ctx.stroke();

        if (down)
        {
            if (downPoint !== undefined)
            {
                let dx = x - downPoint.x;
                let dy = y - downPoint.y;

                setBaseX(baseX + dx)
                setBaseY(baseY + dy)
            }

            setDownPoint({ 
                x: x, 
                y: y
            })
        }
        else
        {
            setDownPoint(undefined);
        }
    }

    return <Canvas fullscreen={true} onFrame={onFrame} />
}