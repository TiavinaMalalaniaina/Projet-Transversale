import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Cell,
  Pie,
} from 'recharts';
import StatCard from '../components/StatCard';
import { AttachMoney, Build, LocalMall, People, Timer } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Exemple de données
const salesData = [
  { date: '01/08', sales: 1200 },
  { date: '02/08', sales: 2100 },
  { date: '03/08', sales: 800 },
  { date: '04/08', sales: 1600 },
  { date: '05/08', sales: 900 },
  { date: '06/08', sales: 1700 },
  { date: '07/08', sales: 2000 },
];

const data = [
  { name: 'Révisions', value: 120 },
  { name: 'Réparations', value: 90 },
  { name: 'Vidanges', value: 60 },
  { name: 'Pneumatiques', value: 30 },
];

const COLORS = ['#1976d2', '#f50057', '#ff9800', '#4caf50'];

export default function Dashboard() {
  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Card 1 */}
        <Grid size={3}>
          <StatCard
            title="Chiffres d'affaires"
            value="20.000 MGA"
            icon={<AttachMoney fontSize="inherit" />}
            color="primary"
            rating={5.5}
          />
        </Grid>

        {/* Card 2 */}
        <Grid size={3}>
          <StatCard
            title="Commandes"
            value="320"
            icon={<Build fontSize="inherit" />}
            color="secondary"
            rating={7}
          />
        </Grid>

        {/* Card 3 */}
        <Grid size={3}>
          <StatCard
            title="Clients Actifs"
            value="45"
            icon={<People fontSize="inherit" />}
            color="success"
            rating={0}
          />
        </Grid>

        {/* Card 4 */}
        <Grid size={3}>
          <StatCard
            title="Taux de conversion"
            value="35%"
            icon={<Timer fontSize="inherit" />}
            color="warning"
            rating={-5.5}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Evolution des ventes */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Evolution des Ventes
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#1976d2" // couleur primaire du thème
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        {/* Répartition des commandes */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Evolution des Ventes
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                Etat des stocks
              </Typography>
              <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Produit En Stock" />
                  <Typography variant="body1" color="success">
                    433
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Stock Faible" />
                  <Typography variant="body1" color="warning">
                    433
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Ruptures" />
                  <Typography variant="body1" color="error">
                    433
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Valeur Totales" />
                  <Typography variant="body1" color="primary">
                    433
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                Clients
              </Typography>
              <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Nouveaux clients" />
                  <Typography variant="body1" color="success">
                    433
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Clients fidèles" />
                  <Typography variant="body1" color="warning">
                    433
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Panier moyen" />
                  <Typography variant="body1" color="primary">
                    433 MGA
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Satisfaction" />
                  <Typography variant="body1" color="success">
                    4/5
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                Perfomance
              </Typography>
              <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Temps de traitement" />
                  <Typography variant="body1" color="success">
                    433
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Retours" />
                  <Typography variant="body1" color="warning">
                    3.2%
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Livraison à temps" />
                  <Typography variant="body1" color="primary">
                    45%
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Note de service" />
                  <Typography variant="body1" color="success">
                    4/5
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6" color="primary">
                  Commandes récentes
                </Typography>
                <Link component={RouterLink} to="/orders" color="primary">
                  Voir Tout
                </Link>
              </Box>
              <Divider />
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalMall />
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <ListItemText
                      primary="Commande #CMD-2025-0001"
                      secondary={
                        <Typography variant="subtitle2" color="text.secondary">
                          Client: John Doe
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="primary">
                          46.000 MGA
                        </Typography>
                      }
                      secondary={
                        <Typography variant="subtitle2" color="text.secondary">
                          Il y a 6h
                        </Typography>
                      }
                      sx={{ textAlign: 'end' }}
                    />
                  </Box>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalMall />
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <ListItemText
                      primary="Commande #CMD-2025-0001"
                      secondary={
                        <Typography variant="subtitle2" color="text.secondary">
                          Client: John Doe
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="primary">
                          46.000 MGA
                        </Typography>
                      }
                      secondary={
                        <Typography variant="subtitle2" color="text.secondary">
                          Il y a 6h
                        </Typography>
                      }
                      sx={{ textAlign: 'end' }}
                    />
                  </Box>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalMall />
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <ListItemText
                      primary="Commande #CMD-2025-0001"
                      secondary={
                        <Typography variant="subtitle2" color="text.secondary">
                          Client: John Doe
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="primary">
                          46.000 MGA
                        </Typography>
                      }
                      secondary={
                        <Typography variant="subtitle2" color="text.secondary">
                          Il y a 6h
                        </Typography>
                      }
                      sx={{ textAlign: 'end' }}
                    />
                  </Box>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6" color="primary">
                  Produits Populaires
                </Typography>
                <Link component={RouterLink} to="/stocks" color="primary">
                  Voir Tout
                </Link>
              </Box>
              <Divider />
              <List>
                <ListItem>
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
                        <Typography variant="subtitle2" color="text.secondary">
                          143 ventes
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="primary" align="right">
                          23.000 MGA
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
                <ListItem>
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
                        <Typography variant="subtitle2" color="text.secondary">
                          143 ventes
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="primary" align="right">
                          23.000 MGA
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
                <ListItem>
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
                        <Typography variant="subtitle2" color="text.secondary">
                          143 ventes
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={
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
        </Grid>
      </Grid>
    </Box>
  );
}
