import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeToggle from "./DarkModeToggle";

const pages = ["Accueil", "Services", "Dashboard"];
const settings = ["Profil", "Déconnexion"];

export default function Navbar({ mode, setMode }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          🚗 GarageApp
        </Typography>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                {page}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {pages.map((page) => (
            <Button key={page} color="inherit">
              {page}
            </Button>
          ))}
        </Box>

        <DarkModeToggle mode={mode} setMode={setMode} />

        <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2 }}>
          <Avatar />
        </IconButton>
        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              {setting}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
