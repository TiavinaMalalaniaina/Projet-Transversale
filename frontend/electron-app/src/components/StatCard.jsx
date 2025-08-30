import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({ title, value, icon, color = "primary" }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette[color].light
            : theme.palette[color].dark,
        color: (theme) => theme.palette[color].contrastText,
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          fontSize: 40,
          opacity: 0.8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
