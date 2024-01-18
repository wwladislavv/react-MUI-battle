import '@dotlottie/react-player/dist/index.css';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React from 'react';

import BattleView from './views/Battle/Battle';

function App() {
    return (
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
                        width: 1,
                    }}
                >
                    <BattleView />
                </Paper>
            </Stack>
        </Container>
    );
}

export default App;
