import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#f50057' : '#f48fb1',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
      sidebar: {
        main: mode === 'light' ? '#1565c0' : '#0d47a1',
        contrastText: '#fff',
      },
      text: {
        primary: mode === 'light' ? '#000' : '#fff',
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: { fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.2 },
      h2: { fontSize: '3rem', fontWeight: 600, lineHeight: 1.25 },
      h3: { fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.3 },
      h4: { fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.35 },
      h5: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.4 },
      h6: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.4 },
      subtitle1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
      subtitle2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
      button: { textTransform: 'none', fontSize: '0.875rem', fontWeight: 600 },
      caption: { fontSize: '0.75rem', lineHeight: 1.4 },
      overline: { fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, padding: '8px 16px' },
        },
      },
      MuiAppBar: {
        styleOverrides: { root: { boxShadow: 'none' } },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { borderRight: '1px solid rgba(0,0,0,0.1)' },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            padding: '4px 12px',
            '&.Mui-selected': {
              color: theme => theme.palette.common.white,
              backgroundColor: theme => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme => theme.palette.primary.dark,
              },
            },
            '&:hover': {
              backgroundColor: theme => theme.palette.action.selected,
            },
          },
        },
      },
    },
  });
