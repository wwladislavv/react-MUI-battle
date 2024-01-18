import LinearProgressComponent from '@mui/material/LinearProgress';
import React, { useEffect, useRef, useState } from 'react';

const intervalTime = 100;

type ProgressRefFunction = (interval: number) => void;

type Props = {
    totalTimeMs: number;
};

const LinearProgress = ({ totalTimeMs }: Props) => {
    const progressRef = useRef<ProgressRefFunction | null>(null);

    const [progress, setProgress] = useState(0);

    const steps = totalTimeMs / intervalTime;
    const increment = 100 / steps;

    useEffect(() => {
        progressRef.current = (interval: number) => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + increment;
            });
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (progressRef.current) {
                progressRef.current(interval);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <LinearProgressComponent
            sx={{ width: 1 }}
            variant="determinate"
            value={progress}
        />
    );
};

export default LinearProgress;
