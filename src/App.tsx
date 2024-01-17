import './App.css';
import '@dotlottie/react-player/dist/index.css';

import {
    DotLottieCommonPlayer,
    DotLottiePlayer,
    PlayerEvents,
} from '@dotlottie/react-player';
import ReplayIcon from '@mui/icons-material/Replay';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import React, { useRef, useState } from 'react';

import { LinearProgress } from './components';

const getRandomBoolWithRandomChance = (): boolean => {
    const [threshold, randomValue] = [Math.random(), Math.random()];
    return randomValue < threshold;
};

function App() {
    const lottieRef = useRef<DotLottieCommonPlayer | null>(null);

    const [playerReady, setPlayerReady] = useState<boolean>(false);

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [playerWon, setPlayerWon] = useState<boolean | null>(null);

    const start = () => {
        setInProgress(true);
        lottieRef.current?.play();

        setTimeout(() => {
            lottieRef.current?.pause();
            setInProgress(false);
            setPlayerWon(getRandomBoolWithRandomChance());
        }, 10000);
    };

    return (
        <>
            <CssBaseline />

            <Container maxWidth="md">
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100vh' }}
                >
                    <Paper
                        sx={{
                            height: '90%',
                            width: '100%',
                        }}
                    >
                        <Stack
                            direction="column"
                            alignItems="center"
                            sx={{
                                position: 'relative',
                                height: '100%',
                            }}
                        >
                            <DotLottiePlayer
                                style={{
                                    height: '300px',
                                    width: '300px',
                                }}
                                ref={lottieRef}
                                src="https://lottie.host/5b2998d4-be59-476f-85b6-2c18a6e6966d/FG42PcqptW.lottie"
                                onEvent={(event) => {
                                    if (event === PlayerEvents.Ready) {
                                        setPlayerReady(true);
                                    }
                                }}
                                speed={1.5}
                                loop
                            />

                            <TrapFocus open disableAutoFocus disableEnforceFocus>
                                <Fade appear={false} in={!inProgress}>
                                    <Paper
                                        role="dialog"
                                        aria-modal="false"
                                        aria-label="info banner"
                                        square
                                        variant="outlined"
                                        tabIndex={-1}
                                        sx={[
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                left: 'calc(50% - 160px)',
                                                zIndex: 'modal',
                                                width: 320,
                                                height: 300,
                                                bgcolor: 'transparent',
                                            },
                                            {
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: 1,
                                                    height: 1,
                                                    bgcolor: 'text.disabled',
                                                    opacity: 0.5,
                                                },
                                            },
                                        ]}
                                    >
                                        <Stack
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            gap={2}
                                            sx={{
                                                height: 1,
                                            }}
                                        >
                                            <Button
                                                onClick={start}
                                                disabled={!playerReady}
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                startIcon={
                                                    playerWon !== null ? (
                                                        <ReplayIcon />
                                                    ) : (
                                                        <SportsMartialArtsIcon />
                                                    )
                                                }
                                            >
                                                {playerWon !== null
                                                    ? 'Retry'
                                                    : 'Start Battle'}
                                            </Button>
                                        </Stack>
                                    </Paper>
                                </Fade>
                            </TrapFocus>

                            {playerWon !== null && !inProgress && (
                                <p>{playerWon ? 'Player won' : 'Player lost'}</p>
                            )}
                            {inProgress && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                    }}
                                >
                                    <LinearProgress totalTimeMs={10000} />
                                </Box>
                            )}
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </>
    );
}

export default App;
