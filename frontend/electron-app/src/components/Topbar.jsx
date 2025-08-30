import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from "@mui/material";
import DarkModeToggle from "./DarkModeToggle";

export default function Topbar({ mode, setMode }) {
  return (
    <AppBar position="fixed" sx={{ ml: 240, width: `calc(100% - 240px)` }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GarageApp
        </Typography>
        <DarkModeToggle mode={mode} setMode={setMode} />
        <Box ml={2}>
          <IconButton>
            <Avatar />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
