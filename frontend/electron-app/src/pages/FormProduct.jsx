import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Add, ArrowBack, Save } from '@mui/icons-material';

export default function FormProduct() {
  const [images, setImages] = useState([]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => window.URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
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
            Ajouter un produit
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Créez ou modifier un produit dans votre inventaire
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" color="inherit" startIcon={<ArrowBack />}>
            Retour
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            Information de base
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={6}>
              <TextField
                id="product-name-textfield"
                label="Nom du produit"
                placeholder="Ex: iPhone 14 Pro"
                required
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="product-name-textfield"
                label="SKU (Code Produit)"
                placeholder="Ex: IP14PRO001"
                required
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-input-label" shrink>
                  Catégorie
                </InputLabel>
                <Select
                  notched
                  labelId="category-input-label"
                  id="category-select"
                  label="Catégorie"
                  required
                  value={''}
                >
                  <MenuItem value="">
                    <em>Sélectionnez une catégorie</em>
                  </MenuItem>
                  <MenuItem value={10}>Electronique</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextField
                id="product-description-textfield"
                label="Description"
                placeholder="Description détaillé du produit..."
                required
                fullWidth
                rows={3}
                multiline
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
              Prix et Stock
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={4}>
                <TextField
                  id="purchase-price-textfield"
                  label="Prix d'achat(MGA)"
                  placeholder="0.00 "
                  required
                  fullWidth
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  id="selling-price-textfield"
                  label="Prix de vente(MGA)"
                  placeholder="0.00 "
                  required
                  fullWidth
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="tva-input-label" shrink>
                    TVA (%)
                  </InputLabel>
                  <Select
                    notched
                    labelId="tva-input-label"
                    id="tva-select"
                    label="TVA (%)"
                    required
                    value={''}
                  >
                    <MenuItem value="">
                      <em>Sélectionnez une valeur</em>
                    </MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                    <MenuItem value={30}>30%</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={4}>
                <TextField
                  id="stock-quantity-textfield"
                  label="Quantité en Stock"
                  placeholder="0.00"
                  required
                  fullWidth
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  id="minimum-stock-textfield"
                  label="Stock Minimum"
                  placeholder="0.00"
                  required
                  fullWidth
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="unity-input-label" shrink>
                    Unité
                  </InputLabel>
                  <Select
                    notched
                    labelId="unity-input-label"
                    id="unity-select"
                    label="Unité"
                    required
                    value={''}
                  >
                    <MenuItem value="">
                      <em>Sélectionnez une unité</em>
                    </MenuItem>
                    <MenuItem value={10}>unité</MenuItem>
                    <MenuItem value={20}>Kg</MenuItem>
                    <MenuItem value={30}>m2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
              Images du produit
            </Typography>
            <Box>
              {/* Affichage des images */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                  <Button
                    component="label"
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: 2,
                      minWidth: 0,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px dashed #ccc',
                      backgroundColor: '#f5f5f5',
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                      },
                    }}
                  >
                    <Add fontSize="large" />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      multiple
                      onChange={handleImageChange}
                    />
                  </Button>
                </Grid>
                {images.map((img, index) => (
                  <Grid item key={index}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        src={img}
                        variant="rounded"
                        sx={{ width: 200, height: 200, borderRadius: 2 }}
                      />
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          minWidth: 0,
                          width: 24,
                          height: 24,
                          padding: 0,
                          borderRadius: '50%',
                          bgcolor: 'error.main',
                          color: 'white',
                          fontSize: 14,
                          lineHeight: 1,
                          '&:hover': {
                            bgcolor: 'error.dark',
                          },
                        }}
                      >
                        x
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="caption" color="text.secondary">
                Formats acceptés: JPG, PNG, WEBP (max 5MB par image)
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
              Informations Supplémentaires
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox size="small" />} label="Produit actif" />
              <FormControlLabel control={<Checkbox size="small" />} label="Suivre le stock" />
              <FormControlLabel control={<Checkbox size="small" />} label="Produit en promotion" />
            </FormGroup>
          </Box>
          <Divider />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" variant="outlined">
            Annuler
          </Button>
          <Button size="small" variant="contained" color="warning" startIcon={<Save />}>
            Enregistrer comme brouillon
          </Button>
          <Button size="small" color="error" variant="contained" startIcon={<Add />}>
            Enregistrer le produit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
