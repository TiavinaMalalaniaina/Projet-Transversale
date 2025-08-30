import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode, // "light" ou "dark"
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9", // bleu principal
      },
      secondary: {
        main: mode === "light" ? "#f50057" : "#f48fb1", // rose secondaire
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212", // fond global
        paper: mode === "light" ? "#fff" : "#1e1e1e", // fond des composants Paper
      },
      sidebar: {
        main: mode === "light" ? "#1565c0" : "#0d47a1", // couleur du sidebar
        contrastText: "#fff",
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: "none", // enlever majuscules automatiques
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 16px",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: "1px solid rgba(0,0,0,0.1)",
          },
        },
      },
    },
  });
