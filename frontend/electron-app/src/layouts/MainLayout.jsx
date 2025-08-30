import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../theme/theme";

export default function MainLayout() {
  const [mode, setMode] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const drawerWidth = 240;
  const collapsedWidth = 60;

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />

      {/* Topbar prend toute la largeur */}
      <Topbar
        mode={mode}
        setMode={setMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Zone en dessous du Topbar */}
      <Box sx={{ display: "flex", mt: 8 }}> 
        {/* mt: 8 (64px) = hauteur du Topbar */}

        {/* Sidebar à gauche */}
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          drawerWidth={drawerWidth}
          collapsedWidth={collapsedWidth}
        />

        {/* Contenu principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
