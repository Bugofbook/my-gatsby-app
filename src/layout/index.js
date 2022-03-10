// react hooks
import React from 'react';
// import React, { useState, useEffect } from 'react';    
import Container from '@mui/material/Container'
import { ThemeProvider } from "@mui/material/styles"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline';
import globalTheme from '../theme'

import { Link } from "gatsby"
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const Layout = ({ children }) => {
    // const [count, setCount] = useState(0);
    // useEffect(() => {
    //     console.log('useEffect');
    // }, [count]);
    return (
        <ThemeProvider theme={globalTheme}>
            <CssBaseline />
            <Container maxWidth={false} disableGutters>
                <Grid container spacing={3}>
                <LayoutNav />
                    {children}
                </Grid>
            </Container>
        </ThemeProvider>
    );
    }

export default Layout;

const LayoutNav = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                    <Button component={Link} variant="text" color="inherit" to="/">
                        Home
                    </Button>
                    <Button component={Link} variant="text" color="inherit" to="/tictactoe">
                        井字棋
                    </Button>
                    <Button component={Link} variant="text" color="inherit" to="/tictactoespecial">
                        井字棋變化版
                    </Button>
                    <Button component={Link} variant="text" color="inherit" to="/gomoku">
                        五子棋簡化版
                    </Button>
                    <Button component={Link} variant="text" color="inherit" to="/othello">
                        奧賽羅棋簡化版
                    </Button>
            </Toolbar>
        </AppBar>
    );
}