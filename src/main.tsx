import './index.css';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const theme = createTheme({
    palette: {
        primary: {
            main: '#CC9242',
        },
        secondary: {
            main: '#CAA467',
        },
        background: {
            default: '#F8F5F3',
            paper: '#E5DEDA',
        },
        text: {
            primary: '#D1B17E',
        },
        error: {
            main: '#C34242',
        },
        success: {
            main: '#42C36F',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
