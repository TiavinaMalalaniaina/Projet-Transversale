import React from "react";
import { Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" mt={4}>Accueil</Typography>
      <Typography>Bienvenue sur GarageApp !</Typography>
    </Container>
  );
}
