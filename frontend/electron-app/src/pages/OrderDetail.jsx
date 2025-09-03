import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import {
  Check,
  Close,
  CreditCard,
  EditSquare,
  Info,
  LocalShipping,
  Mail,
  Mouse,
  Phone,
  Print,
  WatchLater,
} from '@mui/icons-material';

export default function OrderDetail() {
  const [statut, setStatut] = useState('En attente');

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <Box>
          <Typography variant="h2" color="primary">
            Commande #CMD-0001
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Passée le 15 janvier 2025 à 14:30
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Button variant="contained" startIcon={<Print />}>
            Nouvelle Commande
          </Button>
          <Button variant="contained" startIcon={<EditSquare />}>
            Modifier
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid size={8}>
          {/* Statut de la commande */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary">
                  Statut de la commande
                </Typography>
              </Box>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                <Chip label="En attente" color="info" />
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <Select size="small" onChange={e => setStatut(e.target.value)} value={statut}>
                    <MenuItem> En attente </MenuItem>
                    <MenuItem> Préparation </MenuItem>
                    <MenuItem> Expédition </MenuItem>
                    <MenuItem> Expédié </MenuItem>
                  </Select>
                  <Button variant="contained" size="small" color="success">
                    Mettre à jour
                  </Button>
                </Box>
              </Stack>
              <Box>
                <List>
                  <ListItem sx={{ backgroundColor: '#f5f5f5', borderRadius: '5px', mb: 1 }}>
                    <ListItemIcon>
                      <Info></Info>
                    </ListItemIcon>
                    <ListItemText
                      primary="Dernière mise à jour"
                      secondary="15/02/2025 à 14:43 - Commande reçue"
                    />
                  </ListItem>
                  <ListItem sx={{ backgroundColor: '#f5f5f5', borderRadius: '5px', mb: 1 }}>
                    <ListItemIcon>
                      <Info></Info>
                    </ListItemIcon>
                    <ListItemText
                      primary="Dernière mise à jour"
                      secondary="15/02/2025 à 14:43 - Commande reçue"
                    />
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>

          {/* Article commandé */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary">
                  Article Commandé
                </Typography>
              </Box>
              <List>
                <ListItem
                  sx={{
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '5px',
                    mb: 1,
                  }}
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
                            Référence: &quot;00243879284&quot;
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            Couleur: Rouge
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" align="right">
                          Qté: 1
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" color="primary" align="right">
                          23.000 MGA
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
                <ListItem
                  sx={{
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '5px',
                    mb: 1,
                  }}
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
                            Référence: &quot;00243879284&quot;
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            Couleur: Rouge
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" align="right">
                          Qté: 1
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" color="primary" align="right">
                          23.000 MGA
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
                <ListItem
                  sx={{
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '5px',
                    mb: 1,
                  }}
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
                            Référence: &quot;00243879284&quot;
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            Couleur: Rouge
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" align="right">
                          Qté: 1
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" color="primary" align="right">
                          23.000 MGA
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary">
                  Historique de la commande
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WatchLater></WatchLater>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Commande reçue"
                    secondary={
                      <Typography variant="subtitle2" color="text.secondary">
                        15/01/2025 à 15:24
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CreditCard></CreditCard>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color="text.secondary">
                        Paiement en attente
                      </Typography>
                    }
                    secondary={
                      <Typography variant="subtitle2" color="text.secondary">
                        En cours...
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Mouse></Mouse>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color="text.secondary">
                        Préparation
                      </Typography>
                    }
                    secondary={
                      <Typography variant="subtitle2" color="text.secondary">
                        En cours...
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box>
                <Typography variant="h6" color="primary">
                  Informations Client
                </Typography>
              </Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt="Client"
                    src="https://thafd.bing.com/th/id/OIP.GWzzRFdPbYo9J7vr2arBrgHaHa?w=215&h=214&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3"
                    sx={{
                      border: '2px solid #F5F5F5',
                      width: 56,
                      height: 56,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Marie Dubois"
                  secondary={
                    <Typography variant="subtitle2" color="text.secondary">
                      Client depuis 2023
                    </Typography>
                  }
                />
              </ListItem>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Mail color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="marie.dubois@gmail.com" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="+261 33 345 34" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary">
                  Addresse de Livraison
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">Marie Dubois</Typography>
                <Typography variant="body1">123 Rue de la paix</Typography>
                <Typography variant="body1">Madagascar</Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary">
                  Information de paiement
                </Typography>
              </Box>
              <Box>
                <List>
                  <ListItem>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="body1" color="text.secondary">
                        Méthode:
                      </Typography>
                      <Typography variant="body1">Carte Bancaire</Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="body1" color="text.secondary">
                        Statut:
                      </Typography>
                      <Chip label="En attente" color="info" />
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box>
                <Typography variant="h6" color="primary">
                  Récapitulatif
                </Typography>
              </Box>
              <Box>
                <List>
                  <ListItem sx={{ py: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="body1" color="text.secondary">
                        Sous-Total:
                      </Typography>
                      <Typography variant="body1">21.0000 MGA</Typography>
                    </Box>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="body1" color="text.secondary">
                        Livraison:
                      </Typography>
                      <Typography variant="body1">0.00 MGA</Typography>
                    </Box>
                  </ListItem>

                  <ListItem sx={{ py: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="body1" color="text.secondary">
                        TVA (20%):
                      </Typography>
                      <Typography variant="body1">6.000 MGA</Typography>
                    </Box>
                  </ListItem>

                  <Divider />

                  <ListItem sx={{ py: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="h6" color="primary">
                        Total:
                      </Typography>
                      <Typography variant="h6" color="primary">
                        6.000 MGA
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary">
                  Action Rapide
                </Typography>
              </Box>
              <Box>
                <Button variant="contained" startIcon={<Check />} sx={{ mb: 1 }} fullWidth>
                  Confirmer Paiement
                </Button>
                <Button variant="contained" startIcon={<LocalShipping />} sx={{ mb: 1 }} fullWidth>
                  Préparer Expédition
                </Button>
                <Button variant="contained" startIcon={<Close />} sx={{ mb: 1 }} fullWidth>
                  Annuler Commande
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
