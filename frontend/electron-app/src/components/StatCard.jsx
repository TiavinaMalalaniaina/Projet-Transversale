import React from 'react';
import { Card, Typography, Box } from '@mui/material';

export default function StatCard({ title, value, icon, color = 'primary', rating }) {
  function rate() {
    if (rating > 0) {
      return ['+' + rating + '% vs le mois dernier', 'success'];
    } else if (rating < 0) {
      return [rating + '% vs le mois dernier', 'error'];
    } else if (rating === 0) {
      return ['Même que le mois dernier', 'text.secondary'];
    }
    return ['', 'text.secondary'];
  }

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      {/* Texte */}
      <Box>
        <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold" color={color}>
          {value}
        </Typography>
        {rating !== undefined && (
          <Typography variant="subtitle2" color={rate()[1]}>
            {rate()[0]}
          </Typography>
        )}
      </Box>

      {/* Icone dans un carré coloré */}
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: 1.5,
          backgroundColor: theme => theme.palette[color].main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme => theme.palette[color].contrastText,
          fontSize: 36, // Taille de l'icône
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
