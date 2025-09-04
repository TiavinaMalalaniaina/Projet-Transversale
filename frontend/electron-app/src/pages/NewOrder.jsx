import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Add, ArrowBack, Check, Delete, Print, Remove, Search } from '@mui/icons-material';

export default function NewOrder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    address: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h2" color="primary">
              Nouvelle Commande
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Créez une nouvelle commande et générer une facture
            </Typography>
          </Box>
          <Button variant="contained" color="inherit" startIcon={<ArrowBack />}>
            Retour
          </Button>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              Informations Client
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} size={6}>
                <TextField
                  label="Nom du client"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} size={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6} size={6}>
                <TextField
                  label="Téléphone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} size={6}>
                <TextField
                  label="Date de commande"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              {/* Adresse */}
              <Grid item xs={12} size={12}>
                <TextField
                  label="Adresse de livraison"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Ajouter des produits
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              sx={{ mb: 2 }}
            >
              <TextField
                placeholder="Rechercher par numéro de commande, client, ..."
                variant="outlined"
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
                sx={{ flexGrow: 1 }}
              />

              <Button variant="contained" startIcon={<Search />}>
                Rechercher
              </Button>
            </Stack>

            <List
              sx={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
                secondaryAction={
                  <Button startIcon={<Add />} variant="contained" size="small">
                    {' '}
                    Ajouter
                  </Button>
                }
              >
                <ListItemIcon>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt="Produit A"
                    style={{
                      width: 50, // largeur de l'image
                      height: 50, // hauteur de l'image
                      borderRadius: 8, // arrondi des coins
                      objectFit: 'cover', // garde les proportions et coupe si nécessaire
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: '1',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary="Iphone 8"
                    secondary={
                      <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                          Référence: 00243879284
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          1.200 MGA
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </ListItem>
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
                secondaryAction={
                  <Button variant="contained" size="small" disabled>
                    {' '}
                    Indisponible
                  </Button>
                }
              >
                <ListItemIcon>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt="Produit A"
                    style={{
                      width: 50, // largeur de l'image
                      height: 50, // hauteur de l'image
                      borderRadius: 8, // arrondi des coins
                      objectFit: 'cover', // garde les proportions et coupe si nécessaire
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: '1',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary="Iphone 8"
                    secondary={
                      <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                          Référence: 00243879284
                        </Typography>
                        <Typography variant="subtitle2" color="error">
                          Rupture de stock
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Articles de la commande
            </Typography>
            <List
              sx={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="error">
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt="Produit A"
                    style={{
                      width: 50, // largeur de l'image
                      height: 50, // hauteur de l'image
                      borderRadius: 8, // arrondi des coins
                      objectFit: 'cover', // garde les proportions et coupe si nécessaire
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: '1',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary="Iphone 8"
                    secondary={
                      <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                          Référence: 00243879284
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          1.200 MGA
                        </Typography>
                      </Box>
                    }
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Bouton - */}
                      <IconButton sx={{ borderRadius: 0 }}>
                        <Remove />
                      </IconButton>

                      {/* Quantité */}
                      <Typography variant="body1" sx={{ px: 2, minWidth: 30, textAlign: 'center' }}>
                        3
                      </Typography>

                      {/* Bouton + */}
                      <IconButton sx={{ borderRadius: 0 }}>
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" color="primary">
                      {' '}
                      3.000 MGA
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="error">
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt="Produit A"
                    style={{
                      width: 50, // largeur de l'image
                      height: 50, // hauteur de l'image
                      borderRadius: 8, // arrondi des coins
                      objectFit: 'cover', // garde les proportions et coupe si nécessaire
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: '1',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary="Iphone 8"
                    secondary={
                      <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                          Référence: 00243879284
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          1.200 MGA
                        </Typography>
                      </Box>
                    }
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Bouton - */}
                      <IconButton sx={{ borderRadius: 0 }}>
                        <Remove />
                      </IconButton>

                      {/* Quantité */}
                      <Typography variant="body1" sx={{ px: 2, minWidth: 30, textAlign: 'center' }}>
                        3
                      </Typography>

                      {/* Bouton + */}
                      <IconButton sx={{ borderRadius: 0 }}>
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" color="primary">
                      {' '}
                      3.000 MGA
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              <ListItem
                sx={{
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="error">
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt="Produit A"
                    style={{
                      width: 50, // largeur de l'image
                      height: 50, // hauteur de l'image
                      borderRadius: 8, // arrondi des coins
                      objectFit: 'cover', // garde les proportions et coupe si nécessaire
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: '1',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary="Iphone 8"
                    secondary={
                      <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                          Référence: 00243879284
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          1.200 MGA
                        </Typography>
                      </Box>
                    }
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Bouton - */}
                      <IconButton sx={{ borderRadius: 0 }}>
                        <Remove />
                      </IconButton>

                      {/* Quantité */}
                      <Typography variant="body1" sx={{ px: 2, minWidth: 30, textAlign: 'center' }}>
                        3
                      </Typography>

                      {/* Bouton + */}
                      <IconButton sx={{ borderRadius: 0 }}>
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" color="primary">
                      {' '}
                      3.000 MGA
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={4}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography variant="h6" color="primary">
                Facture
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                #CMD-0001
              </Typography>
            </Box>
            <List sx={{ py: 0.8, mb: 3 }}>
              <ListItem>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2" color="text.secondary">
                    Sous-Total:
                  </Typography>
                  <Typography variant="body2">6.000 MGA</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2" color="text.secondary">
                    TVA(20%):
                  </Typography>
                  <Typography variant="body2">400 MGA</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2" color="text.secondary">
                    Livraison:
                  </Typography>
                  <Typography variant="body2">0.0 MGA</Typography>
                </Box>
              </ListItem>
              <Divider />
              <ListItem>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="h6" color="primary">
                    Total:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    6.400 MGA
                  </Typography>
                </Box>
              </ListItem>
            </List>

            <Box sx={{ mb: 2 }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Mode de paiement</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="espece"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="espece"
                    control={<Radio size="small" />}
                    label="Espèces"
                  />
                  <FormControlLabel
                    value="carte_bancaire"
                    control={<Radio size="small" />}
                    label="Carte bancaire"
                  />
                  <FormControlLabel
                    value="cheque"
                    control={<Radio size="small" />}
                    label="Chèque"
                  />
                  <FormControlLabel
                    value="virement"
                    control={<Radio size="small" />}
                    label="Virement"
                  />
                  <FormControlLabel
                    value="mobile_money"
                    control={<Radio size="small" />}
                    label="Mobile Money"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <Button
                variant="contained"
                color="error"
                startIcon={<Check />}
                fullWidth
                sx={{ mb: 1 }}
              >
                Valider la Commande
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Print />}
                fullWidth
                sx={{ mb: 1 }}
              >
                Imprimer la Facture
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
