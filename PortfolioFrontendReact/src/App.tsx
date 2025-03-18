import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import Homepage from './pages/homepage';
import theme from './themes/Theme1';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';

function App() {
  console.log('Theme:', theme);  // Log the entire theme object

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        backgroundColor: `${theme.palette.background.default} !important`,  // Force it to override
        minHeight: '100vh',
        }}
      >
        <AppAppBar />
        <Router>
          <Routes>
            
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
