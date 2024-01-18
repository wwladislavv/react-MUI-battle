import type { DotLottieCommonPlayer } from '@dotlottie/react-player';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import React, { useRef, useState } from 'react';

import { AnimationPlayer, LinearProgress } from '../../components';
import { battleAnimationSrc, battleDuration } from './data';
import { getRandomBoolWithRandomChance } from './utils';

type Props = any;

const Battle = (props: Props) => {
    const lottieRef = useRef<DotLottieCommonPlayer | null>(null);

    const [playerReady, setPlayerReady] = useState<boolean>(false);

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [playerWon, setPlayerWon] = useState<boolean | null>(null);

    const hasBattleResult = playerWon !== null;

    const onPlayerReady = () => {
        lottieRef.current?.play();
        setTimeout(() => {
            lottieRef.current?.pause();
            setPlayerReady(true);
        }, 1000);
    };

    const handleControlClick = () => {
        setInProgress(true);
        lottieRef.current?.play();

        setTimeout(() => {
            lottieRef.current?.pause();
            setInProgress(false);
            setPlayerWon(getRandomBoolWithRandomChance());
        }, battleDuration);
    };

    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            gap={4}
            sx={{
                position: 'relative',
                height: '100%',
            }}
        >
            <AnimationPlayer
                ref={lottieRef}
                src={battleAnimationSrc}
                onPlayerReady={onPlayerReady}
                speed={1.5}
                style={{
                    width: 300,
                    height: 300,
                }}
            />

            <Box
                sx={{
                    width: {
                        xs: 1 / 2,
                        md: 1 / 5,
                    },
                }}
            >
                <Collapse in={hasBattleResult && !inProgress}>
                    <Alert
                        variant="filled"
                        severity={playerWon ? 'success' : 'error'}
                        icon={
                            playerWon ? (
                                <MoodIcon fontSize="large" />
                            ) : (
                                <MoodBadIcon fontSize="large" />
                            )
                        }
                        sx={{
                            fontSize: 22,
                        }}
                    >
                        {playerWon ? 'Victory' : 'Defeat'}
                    </Alert>
                </Collapse>
            </Box>

            <Button
                onClick={handleControlClick}
                disabled={!playerReady || inProgress}
                variant="contained"
                color="primary"
                size="large"
                startIcon={hasBattleResult ? <ReplayIcon /> : <PlayArrowIcon />}
                sx={{
                    lineHeight: 1,
                }}
            >
                {hasBattleResult ? 'Retry' : 'Start Battle'}
            </Button>

            {inProgress && (
                <Box
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        top: 0,
                        left: 0,
                        width: 1,
                    }}
                >
                    <LinearProgress totalTimeMs={battleDuration} />
                </Box>
            )}
        </Stack>
    );
};

export default Battle;
