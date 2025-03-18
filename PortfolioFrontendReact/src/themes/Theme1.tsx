import { createTheme } from '@mui/material/styles';
import { red, blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',  // Sets the base theme to dark
    primary: {
      main: '#5570FB',  // Original primary color
      light: '#63a4ff',  // Lighter variant of primary
      dark: '#004ba0',   // Darker variant of primary
      contrastText: '#ffffff',  // Ensures good readability on primary buttons
    },
    secondary: {
      main: '#dc004e',  // Original secondary color
      light: '#ff5c8d',  // Lighter variant
      dark: '#9a0036',   // Darker variant
      contrastText: '#ffffff',  // Ensures good readability on secondary buttons
    },
    background: {
      default: '#121212',  // Dark background for the body
      paper: '#1e1e1e',    // Slightly lighter background for containers like cards
    },
    text: {
      primary: '#ffffff',  // White text on dark backgrounds
      secondary: '#b0bec5',  // Muted gray text for secondary content
    },
    error: {
      main: red.A400,  // Red for error states
    },
    divider: blueGrey[700],  // A subtle blue-grey divider
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 14,  // Base font size
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,  // Bold titles
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#b0bec5',  // Secondary text color for less emphasis
    },
    button: {
      fontWeight: 600,  // Slightly bolder buttons
      textTransform: 'uppercase',  // Capitalize button text for emphasis
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',  // Rounded corners for buttons
          padding: '8px 16px',  // Comfortable button padding
        },
        containedPrimary: {
          backgroundColor: '#5570FB',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#004ba0',  // Darker on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#dc004e',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#9a0036',  // Darker on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',  // Dark app bar to match theme
          color: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',  // Dark paper background
          color: '#ffffff',
          padding: '20px',  // Add padding for paper elements
          borderRadius: '8px',  // Rounded corners for paper elements
        },
      },
    },
  },
});

export default theme;