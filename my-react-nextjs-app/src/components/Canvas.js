"use client";

import { useEffect, useRef, useState } from 'react';

export default function Canvas(props)
{
    let { 
        fps, onFrame, 
        fullscreen, ...otherProps 
    } = props;

    if (fps === undefined)
        fps = 40;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const ref = useRef(null);
    
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [down, setDown] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [frame, setFrame] = useState(0);

    useEffect(() =>
    {
        const canvas = ref.current;
        
        if (fullscreen)
        {
            canvas.width = width;
            canvas.height = height;
        }

        const context = canvas.getContext('2d')
        
        if (onFrame !== undefined)
            onFrame(context, x, y, down, scroll, frame, height, width);

        setTimeout(() =>
        {
            setFrame(frame + 1)
        }, 1000 / fps)
    
    }, [frame]);

    const mouseMove = event =>
    {
        setX(event.pageX);
        setY(event.pageY);
    };
    const mouseUp = () => setDown(false);
    const mouseDown = () => setDown(true);
    const mouseScroll = (event) => setScroll(scroll + event.deltaY / 10)

    return <div>
        <canvas ref={ref} {...otherProps}
            onMouseMove={event => mouseMove(event)}
            onMouseDown={event => mouseDown(event)}
            onMouseUp={event => mouseUp(event)}
            onWheel={event => mouseScroll(event)}
        />
    </div>
}