import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  InputAdornment,
  TablePagination,
  Chip,
  IconButton,
  Toolbar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@mui/material';

import StatCard from '../components/StatCard';
import {
  Add,
  AttachMoney,
  Build,
  Delete,
  EditSquare,
  FilterListAlt,
  Inventory,
  People,
  Search,
  Timer,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const rows = [
  {
    id: 1,
    name: 'Produit A',
    category: 'Électronique',
    price: 100,
    stock: 100,
    statut: 'En Stock',
  },
  {
    id: 2,
    name: 'Produit A',
    category: 'Électronique',
    price: 100,
    stock: 100,
    statut: 'En Stock',
  },
  {
    id: 3,
    name: 'Produit A',
    category: 'Électronique',
    price: 100,
    stock: 100,
    statut: 'En Stock',
  },
  {
    id: 4,
    name: 'Produit A',
    category: 'Électronique',
    price: 100,
    stock: 100,
    statut: 'En Stock',
  },
  {
    id: 5,
    name: 'Produit A',
    category: 'Électronique',
    price: 100,
    stock: 100,
    statut: 'En Stock',
  },
];
// Fonction de tri
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map(el => el[0]);
}

export default function Stocks() {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = id => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  // Gestion de la pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = () => {
    console.log('Recherche :', search);
    // Ici tu peux appeler une API ou filtrer une liste
  };

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
            Gestion des stocks
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Gérer vos produits et surveillez les niveaux de stock
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button component={Link} variant="contained" startIcon={<Add />} color="info" to="/add-product">
            Nouveau produit
          </Button>
          <Button component={Link} variant="contained" startIcon={<Inventory />} to="/add-stock">
            Ajouter du stock
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 3 }}>
        {/* Card 1 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="Total Produits"
            value="1235"
            icon={<AttachMoney fontSize="inherit" />}
            color="primary"
          />
        </Box>

        {/* Card 2 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="En Stock"
            value="320"
            icon={<Build fontSize="inherit" />}
            color="secondary"
          />
        </Box>

        {/* Card 3 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="Stock Faible"
            value="23"
            icon={<People fontSize="inherit" />}
            color="success"
          />
        </Box>

        {/* Card 4 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="Rupture"
            value="12"
            icon={<Timer fontSize="inherit" />}
            color="warning"
          />
        </Box>
      </Box>

      <Box sx={{ marginBottom: '1rem' }}>
        <Card sx={{ p: 1 }}>
          <CardContent sx={{ p: 1, pb: 1 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {/* Recherche */}
              <TextField
                placeholder="Rechercher par nom"
                variant="outlined"
                size="small"
                value={search}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={e => {
                  setSearch(e.target.value);
                  handleFilterChange();
                }}
                sx={{ flexGrow: 1 }}
              />
              <Button variant="contained" startIcon={<FilterListAlt />}>
                Filtre avancée
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box>
        <Card
          sx={{
            p: 0,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Toolbar>
              <Typography color="inherit" variant="h6" component="div">
                Produits
              </Typography>
            </Toolbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" padding="checkbox">
                      <Checkbox
                        checked={selected.length === rows.length}
                        indeterminate={selected.length > 0 && selected.length < rows.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}
                      >
                        NOM
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'category'}
                        direction={orderBy === 'category' ? order : 'asc'}
                        onClick={() => handleRequestSort('category')}
                      >
                        CATEGORIE
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'stock'}
                        direction={orderBy === 'stock' ? order : 'asc'}
                        onClick={() => handleRequestSort('stock')}
                      >
                        STOCK
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'statut'}
                        direction={orderBy === 'statut' ? order : 'asc'}
                        onClick={() => handleRequestSort('statut')}
                      >
                        STATUT
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'price'}
                        direction={orderBy === 'price' ? order : 'asc'}
                        onClick={() => handleRequestSort('price')}
                      >
                        PRIX
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const isItemSelected = isSelected(row.id);
                      return (
                        <TableRow
                          key={row.id}
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                          onClick={() => handleClick(row.id)}
                        >
                          <TableCell align="left" padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell align="left">
                            <ListItem>
                              <ListItemIcon>
                                <img
                                  src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                                  alt="Produit A"
                                  style={{
                                    width: 46,
                                    height: 46,
                                    borderRadius: 8,
                                    objectFit: 'cover',
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={row.name}
                                secondary={
                                  <Typography variant="subtitle2" color="text.secondary">
                                    Référence: PRO-OUI
                                  </Typography>
                                }
                              />
                            </ListItem>
                          </TableCell>
                          <TableCell align="left">{row.category}</TableCell>
                          <TableCell align="left">{row.stock}</TableCell>
                          <TableCell align="left">
                            <Chip label={row.statut} size="small" />
                          </TableCell>
                          <TableCell align="left">{row.price} MGA</TableCell>
                          <TableCell align="left">
                            <IconButton
                              color="primary"
                              onClick={e => {
                                e.stopPropagation(); // Empêche la sélection de la ligne
                                console.log('Modifier', row.id);
                                // Ici tu peux ouvrir un modal ou naviguer vers la page d'édition
                              }}
                            >
                              <EditSquare />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={e => {
                                e.stopPropagation();
                                console.log('Supprimer', row.id);
                                // Ici tu peux appeler une fonction pour supprimer le produit
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
