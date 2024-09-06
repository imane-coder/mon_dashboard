import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  TablePagination,
  CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Simulated data
const simulatedEvents = [
  {
    id: 1,
    eventName: 'Soirée de lancement',
    date: '2024-09-01',
    consumptionType: 'Boissons',
    quantity: 150,
    cost: 500,
    supplier: 'Fournitures Événementielles Paris'
  },
  {
    id: 2,
    eventName: 'Déjeuner d\'entreprise',
    date: '2024-09-05',
    consumptionType: 'Repas',
    quantity: 100,
    cost: 800,
    supplier: 'Gourmet Catering'
  },
  {
    id: 3,
    eventName: 'Réunion annuelle',
    date: '2024-09-10',
    consumptionType: 'Snacks',
    quantity: 200,
    cost: 300,
    supplier: 'Event Solutions Inc.'
  },
  {
    id: 4,
    eventName: 'Anniversaire de l\'entreprise',
    date: '2024-09-15',
    consumptionType: 'Boissons',
    quantity: 120,
    cost: 450,
    supplier: 'Provisions & Co.'
  },
  {
    id: 5,
    eventName: 'Séminaire de formation',
    date: '2024-09-20',
    consumptionType: 'Repas',
    quantity: 80,
    cost: 600,
    supplier: 'Elite Catering Services'
  },
  {
    id: 6,
    eventName: 'Conférence annuelle',
    date: '2024-09-25',
    consumptionType: 'Snacks',
    quantity: 250,
    cost: 350,
    supplier: 'Célébrations & Co.'
  }
];

const Consommation: React.FC = () => {
  const [consumptions, setConsumptions] = useState(simulatedEvents);
  const [open, setOpen] = useState(false);
  const [newConsumption, setNewConsumption] = useState(simulatedEvents[0]);
  const [editingConsumption, setEditingConsumption] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setEditingConsumption(null);
    setNewConsumption(simulatedEvents[0]);
  };

  const handleClose = () => {
    setOpen(false);
    setNewConsumption(simulatedEvents[0]);
    setErrorMessage('');
  };

  const handleAddOrUpdateConsumption = () => {
    if (!newConsumption.eventName || !newConsumption.date || !newConsumption.consumptionType || newConsumption.quantity <= 0 || newConsumption.cost <= 0 || !newConsumption.supplier) {
      setErrorMessage('Veuillez remplir tous les champs correctement !');
      return;
    }

    try {
      if (editingConsumption) {
        setConsumptions(consumptions.map(consumption => (consumption.id === newConsumption.id ? newConsumption : consumption)));
        setSuccessMessage('Consommation mise à jour avec succès !');
      } else {
        setConsumptions([...consumptions, { ...newConsumption, id: Math.max(...consumptions.map(c => c.id)) + 1 }]);
        setSuccessMessage('Consommation ajoutée avec succès !');
      }
    } catch (error) {
      setErrorMessage(editingConsumption ? 'Erreur lors de la mise à jour de la consommation' : 'Erreur lors de l\'ajout de la consommation');
    } finally {
      handleClose();
    }
  };

  const handleEdit = (consumption: any) => {
    setNewConsumption({ ...consumption });
    setEditingConsumption(consumption);
    setOpen(true);
  };

  const handleDeleteConsumption = (id: number) => {
    try {
      setConsumptions(consumptions.filter(consumption => consumption.id !== id));
      setSuccessMessage('Consommation supprimée avec succès !');
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression de la consommation');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConsumption({
      ...newConsumption,
      [name]: name === 'quantity' || name === 'cost' ? parseFloat(value) : value
    });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredConsumptions = consumptions.filter(consumption =>
    consumption.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Consommations pour Événements
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleClickOpen}>
          Ajouter une consommation
        </Button>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Rechercher une consommation"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mr: 2 }}
        />
        <IconButton>
          <Search />
        </IconButton>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nom de l'Événement</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Type de Consommation</StyledTableCell>
                <StyledTableCell align="right">Quantité</StyledTableCell>
                <StyledTableCell align="right">Coût</StyledTableCell>
                <StyledTableCell>Fournisseur</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredConsumptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((consumption) => (
                <StyledTableRow key={consumption.id}>
                  <StyledTableCell component="th" scope="row">
                    {consumption.id}
                  </StyledTableCell>
                  <StyledTableCell>{consumption.eventName}</StyledTableCell>
                  <StyledTableCell>{consumption.date}</StyledTableCell>
                  <StyledTableCell>{consumption.consumptionType}</StyledTableCell>
                  <StyledTableCell align="right">{consumption.quantity}</StyledTableCell>
                  <StyledTableCell align="right">{consumption.cost.toFixed(2)}</StyledTableCell>
                  <StyledTableCell>{consumption.supplier}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(consumption)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteConsumption(consumption.id)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredConsumptions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingConsumption ? 'Modifier la consommation' : 'Ajouter une consommation'}</DialogTitle>
        <DialogContent>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            name="eventName"
            label="Nom de l'Événement"
            type="text"
            fullWidth
            variant="standard"
            value={newConsumption.eventName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={newConsumption.date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="consumptionType"
            label="Type de Consommation"
            type="text"
            fullWidth
            variant="standard"
            value={newConsumption.consumptionType}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantité"
            type="number"
            fullWidth
            variant="standard"
            value={newConsumption.quantity}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cost"
            label="Coût"
            type="number"
            fullWidth
            variant="standard"
            value={newConsumption.cost}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="supplier"
            label="Fournisseur"
            type="text"
            fullWidth
            variant="standard"
            value={newConsumption.supplier}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleAddOrUpdateConsumption}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Consommation;
