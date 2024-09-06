import React, { useState, useEffect } from 'react';
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
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';

// Style personnalisé pour les cellules du tableau
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

interface Equipment {
  id: number;
  name: string; 
  type: string;
  location: string; 
  acquisitionDate: string; 
  cost: number; 
  status: string; 
}

const EquipmentManagement: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [open, setOpen] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState<Equipment | null>(null);
  const [newEquipment, setNewEquipment] = useState<Equipment>({
    id: 0,
    name: '',
    type: '',
    location: '',
    acquisitionDate: '',
    cost: 0,
    status: ''
  });
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

        const realisticEquipments: Equipment[] = [
          { id: 1, name: 'Dell XPS 15', type: 'PC', location: 'Bureau A', acquisitionDate: '2023-06-15', cost: 1500, status: 'Fonctionnel' },
          { id: 2, name: 'HP LaserJet Pro MFP M477', type: 'Imprimante', location: 'Bureau B', acquisitionDate: '2023-03-22', cost: 350, status: 'Fonctionnel' },
          { id: 3, name: 'Dell UltraSharp U2720Q', type: 'Écran', location: 'Salle de Réunion', acquisitionDate: '2023-08-10', cost: 700, status: 'Fonctionnel' },
          { id: 4, name: 'Logitech MX Keys', type: 'Clavier', location: 'Bureau C', acquisitionDate: '2023-01-29', cost: 100, status: 'Fonctionnel' },
          { id: 5, name: 'Logitech MX Master 3', type: 'Souris', location: 'Bureau D', acquisitionDate: '2023-05-14', cost: 120, status: 'Fonctionnel' },
          { id: 6, name: 'Netgear Nighthawk R7000', type: 'Routeur', location: 'Salle Serveur', acquisitionDate: '2023-07-20', cost: 200, status: 'Fonctionnel' },
          { id: 7, name: 'Epson Home Cinema 2150', type: 'Projecteur', location: 'Salle de Formation', acquisitionDate: '2023-02-15', cost: 500, status: 'Fonctionnel' },
        ];
        setEquipments(realisticEquipments);
      } catch (error) {
        setErrorMessage('Erreur lors de la récupération des équipements');
      } finally {
        setLoading(false);
      }
    };
    fetchEquipments();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentEquipment(null);
    setNewEquipment({
      id: 0,
      name: '',
      type: '',
      location: '',
      acquisitionDate: '',
      cost: 0,
      status: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
    setNewEquipment({
      id: 0,
      name: '',
      type: '',
      location: '',
      acquisitionDate: '',
      cost: 0,
      status: ''
    });
    setErrorMessage('');
  };

  const handleAddOrUpdateEquipment = async () => {
    if (!newEquipment.name || !newEquipment.type || !newEquipment.location || !newEquipment.acquisitionDate || newEquipment.cost <= 0 || !newEquipment.status) {
      setErrorMessage('Veuillez remplir tous les champs correctement !');
      return;
    }

    try {
      if (currentEquipment) {

        await axios.put(`https://jsonplaceholder.typicode.com/posts/${currentEquipment.id}`, newEquipment);
        setEquipments(equipments.map(equipment =>
          equipment.id === newEquipment.id ? newEquipment : equipment
        ));
        setSuccessMessage('Équipement mis à jour avec succès !');
      } else {

        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newEquipment);
        setEquipments([...equipments, response.data]);
        setSuccessMessage('Équipement ajouté avec succès !');
      }
    } catch (error) {
      setErrorMessage(currentEquipment ? 'Erreur lors de la mise à jour de l\'équipement' : 'Erreur lors de l\'ajout de l\'équipement');
    } finally {
      handleClose();
    }
  };

  const handleEdit = (equipment: Equipment) => {
    setNewEquipment(equipment);
    setCurrentEquipment(equipment);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setEquipments(equipments.filter(equipment => equipment.id !== id));
      setSuccessMessage('Équipement supprimé avec succès !');
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression de l\'équipement');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipment({
      ...newEquipment,
      [name]: value
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

  const filteredEquipments = equipments.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Équipements Informatiques
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<Add />}>
          Ajouter un équipement
        </Button>
      </Box>
      <TextField
        label="Rechercher"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          endAdornment: <IconButton><Search /></IconButton>
        }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nom</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Localisation</StyledTableCell>
                <StyledTableCell>Date d'acquisition</StyledTableCell>
                <StyledTableCell>Coût</StyledTableCell>
                <StyledTableCell>État</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((equipment) => (
                <StyledTableRow key={equipment.id}>
                  <StyledTableCell>{equipment.id}</StyledTableCell>
                  <StyledTableCell>{equipment.name}</StyledTableCell>
                  <StyledTableCell>{equipment.type}</StyledTableCell>
                  <StyledTableCell>{equipment.location}</StyledTableCell>
                  <StyledTableCell>{equipment.acquisitionDate}</StyledTableCell>
                  <StyledTableCell>{equipment.cost}</StyledTableCell>
                  <StyledTableCell>{equipment.status}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => handleEdit(equipment)} color="primary"><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(equipment.id)} color="error"><Delete /></IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEquipments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentEquipment ? 'Modifier l\'équipement' : 'Ajouter un équipement'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            variant="outlined"
            value={newEquipment.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            variant="outlined"
            value={newEquipment.type}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Localisation"
            type="text"
            fullWidth
            variant="outlined"
            value={newEquipment.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="acquisitionDate"
            label="Date d'acquisition"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newEquipment.acquisitionDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cost"
            label="Coût"
            type="number"
            fullWidth
            variant="outlined"
            value={newEquipment.cost}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="État"
            type="text"
            fullWidth
            variant="outlined"
            value={newEquipment.status}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddOrUpdateEquipment} color="primary">
            {currentEquipment ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EquipmentManagement;
