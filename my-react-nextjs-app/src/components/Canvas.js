import { useEffect, useRef, useState } from 'react';

const Canvas = props =>
{
    const ref = useRef(null);

    const [frame, setFrame] = useEffect(0);
    const { 
        fps, onFrame, fullscreen, ...otherProps 
    } = props

    if (fps === undefined)
        fps = 40;

    const width = window.screen.width;
    const height = window.screen.height;

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
            onFrame(context, frame);

        setTimeout(() =>
        {
            setFrame(frame + 1)
        }, 1000 / fps)
    
    }, [frame]);

    return <div>
        <canvas ref={ref} {...otherProps}/>
    </div>
}