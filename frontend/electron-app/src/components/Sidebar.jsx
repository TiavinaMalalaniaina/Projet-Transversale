import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Accueil", icon: <HomeIcon />, path: "/" },
  { text: "Services", icon: <BuildIcon />, path: "/services" },
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
];

export default function Sidebar({ drawerWidth = 240 }) {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
