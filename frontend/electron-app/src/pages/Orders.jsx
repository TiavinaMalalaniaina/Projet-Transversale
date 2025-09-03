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
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

import StatCard from '../components/StatCard';
import {
  Add,
  AttachMoney,
  Build,
  Delete,
  EditSquare,
  FilterListAlt,
  People,
  Search,
  Timer,
} from '@mui/icons-material';

const rows = [
  {
    id: 1,
    num_command: 'CMD-0001',
    nom_client: 'John',
    mail_client: 'john@gmail.com',
    date: '01/01/2025',
    montant: 100000,
    statut: 'En Attente',
  },
  {
    id: 1,
    num_command: 'CMD-0001',
    nom_client: 'John',
    mail_client: 'john@gmail.com',
    date: '01/01/2025',
    montant: 100000,
    statut: 'En Attente',
  },
  {
    id: 1,
    num_command: 'CMD-0001',
    nom_client: 'John',
    mail_client: 'john@gmail.com',
    date: '01/01/2025',
    montant: 100000,
    statut: 'En Attente',
  },
  {
    id: 1,
    num_command: 'CMD-0001',
    nom_client: 'John',
    mail_client: 'john@gmail.com',
    date: '01/01/2025',
    montant: 100000,
    statut: 'En Attente',
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

export default function Orders() {
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
            Commandes à traiter
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Gérez et traitez les commandes en attente
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" startIcon={<Add />}>
            Nouvelle Commande
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 3 }}>
        {/* Card 1 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="En Attente"
            value="1235"
            icon={<AttachMoney fontSize="inherit" />}
            color="primary"
          />
        </Box>

        {/* Card 2 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="Problème"
            value="320"
            icon={<Build fontSize="inherit" />}
            color="secondary"
          />
        </Box>

        {/* Card 3 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="En Préparation"
            value="23"
            icon={<People fontSize="inherit" />}
            color="success"
          />
        </Box>

        {/* Card 4 */}
        <Box sx={{ flex: '1 1 25%', p: 1, minWidth: 250 }}>
          <StatCard
            title="Expédiées"
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
                placeholder="Rechercher par numéro de commande, client, ..."
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
                Commandes
              </Typography>
            </Toolbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'num_command'}
                        direction={orderBy === 'num_command' ? order : 'asc'}
                        onClick={() => handleRequestSort('num_command')}
                      >
                        COMMANDE
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'nom_client'}
                        direction={orderBy === 'nom_client' ? order : 'asc'}
                        onClick={() => handleRequestSort('nom_client')}
                      >
                        CLIENT
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'date'}
                        direction={orderBy === 'date' ? order : 'asc'}
                        onClick={() => handleRequestSort('date')}
                      >
                        DATE
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'montant'}
                        direction={orderBy === 'montant' ? order : 'asc'}
                        onClick={() => handleRequestSort('montant')}
                      >
                        MONTANT
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
                    <TableCell align="left">Actions</TableCell>
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
                          <TableCell align="left">
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                #{row.num_command}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                12 articles
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {row.nom_client}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {row.mail_client}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">{row.date}</TableCell>
                          <TableCell align="left">{row.montant} MGA</TableCell>
                          <TableCell align="left">
                            <Chip size="small" label={row.statut} />
                          </TableCell>
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
