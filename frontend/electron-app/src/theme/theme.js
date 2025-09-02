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
      h1: {
        fontSize: "3.5rem", // ~56px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "3rem", // ~48px
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h3: {
        fontSize: "2.25rem", // ~36px
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: "1.75rem", // ~28px
        fontWeight: 500,
        lineHeight: 1.35,
      },
      h5: {
        fontSize: "1.5rem", // ~24px
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: "1.25rem", // ~20px
        fontWeight: 500,
        lineHeight: 1.4,
      },

      subtitle1: {
        fontSize: "1rem", // 16px
        fontWeight: 400,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: "0.875rem", // 14px
        fontWeight: 400,
        lineHeight: 1.5,
      },

      body1: {
        fontSize: "1rem", // 16px
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem", // 14px
        lineHeight: 1.6,
      },

      button: {
        textTransform: "none",
        fontSize: "0.875rem",
        fontWeight: 600,
      },

      caption: {
        fontSize: "0.75rem", // 12px
        lineHeight: 1.4,
      },
      overline: {
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
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
