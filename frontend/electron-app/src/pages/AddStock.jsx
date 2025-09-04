import React from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Add, ArrowBack, RemoveRedEye, Search } from '@mui/icons-material';

export default function AddStock() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h2" color="primary">
            Ajouter du Stock
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Augmentez la quantité disponible de vos produits
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" color="inherit" startIcon={<ArrowBack />}>
            Retour au Stock
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            Sélection du produit
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={6}>
              <TextField
                id="search-product-textfield"
                label="Rechercher un produit"
                placeholder="Tapez le nom ou SKU du produit"
                required
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
              Produit Selectionné
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 2,
                border: 'solid 2px #F5F5F5',
                p: 1,
                borderRadius: 2,
              }}
            >
              <Box
                component="img"
                src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                alt="Selected Product"
                sx={{
                  width: 56,
                  height: 56,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" color="primary">
                  iPhone 14 Pro - 128GB
                </Typography>
                <Typography variant="subtitle1">SKU: IP14PRO128GB</Typography>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                  <Typography variant="subtitle2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    Stock actuel: <span>15 unités</span>
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    Stock minimum: <span>10 unités</span>
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    Prix d&#39;achat: <span>145.000 MGA</span>
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
              Détails de l&#39;ajout
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  id="quantity-added-input"
                  label="Quantité à ajouter"
                  type="number"
                  fullWidth
                  required
                  placeholder="0"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="purchase-price-input"
                  label="Prix d'achat unitaire (MGA)"
                  placeholder="899.00"
                  type="number"
                  fullWidth
                  required
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="log-number-input"
                  label="Numéro de lot"
                  fullWidth
                  required
                  placeholder="0"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="reception-date-input"
                  label="Date de réception"
                  placeholder="Today"
                  type="date"
                  fullWidth
                  required
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  id="note-stock-added-input"
                  label="Note sur l'ajout de stock"
                  placeholder="Information supplémentaire sur cette réception de stock"
                  multiline
                  rows={3}
                  fullWidth
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
              Résumé
            </Typography>
            <Stack
              alignItems="center"
              justifyContent="space-around"
              direction="row"
              sx={{
                border: '2px solid #F5F5F5',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Stock actuel
                </Typography>
                <Typography variant="h5" color="error">
                  15
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Quantité ajoutée
                </Typography>
                <Typography variant="h5" color="success">
                  40
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Nouveau Stock
                </Typography>
                <Typography variant="h5" color="primary">
                  55
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Coût Total
                </Typography>
                <Typography variant="h5">15.000 MGA</Typography>
              </Box>
            </Stack>
          </Box>
          <Divider />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" variant="outlined">
            Annuler
          </Button>
          <Button size="small" variant="contained" color="warning" startIcon={<RemoveRedEye />}>
            Prévisualiser
          </Button>
          <Button size="small" color="error" variant="contained" startIcon={<Add />}>
            Ajouter le stock
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
