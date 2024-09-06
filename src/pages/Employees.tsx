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
  Card,
  CardContent,
  Box,
  Button,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstancee from '../axios/axiosInstance';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState<number | null>(null);
  const [editEmployeeName, setEditEmployeeName] = useState('');
  const [editEmployeePosition, setEditEmployeePosition] = useState('');
  const [editEmployeeDepartment, setEditEmployeeDepartment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstancee.get('/users');
        const employeesData = response.data.map((employee: any) => ({
          id: employee.id,
          name: employee.name || '',
          position: employee.position || getRandomPosition(),
          department: employee.department || getRandomDepartment(),
        }));
        setEmployees(employeesData);
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
      }
    };

    fetchEmployees();
  }, []);

  const getRandomPosition = () => {
    const positions = [
      'Software Engineer',
      'Product Manager',
      'Data Scientist',
      'UX Designer',
      'Marketing Specialist',
      'HR Manager',
    ];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  const getRandomDepartment = () => {
    const departments = [
      'Engineering',
      'Product',
      'Data',
      'Design',
      'Marketing',
      'Human Resources',
    ];
    return departments[Math.floor(Math.random() * departments.length)];
  };

  const handleOpenDialog = (employee: any) => {
    setEditEmployeeId(employee.id);
    setEditEmployeeName(employee.name);
    setEditEmployeePosition(employee.position);
    setEditEmployeeDepartment(employee.department);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditEmployeeId(null);
    setEditEmployeeName('');
    setEditEmployeePosition('');
    setEditEmployeeDepartment('');
    setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
      const updatedEmployee = { name: editEmployeeName, position: editEmployeePosition, department: editEmployeeDepartment };
      if (editEmployeeId !== null) {
        await axiosInstancee.put(`/users/${editEmployeeId}`, updatedEmployee);
        setEmployees(employees.map(emp => emp.id === editEmployeeId ? { ...emp, ...updatedEmployee } : emp));
        setSuccessMessage('Employé mis à jour avec succès');
      } else {
        const response = await axiosInstancee.post('/users', updatedEmployee);
        setEmployees([...employees, response.data]);
        setSuccessMessage('Employé ajouté avec succès');
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'employé:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstancee.delete(`/users/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
      setSuccessMessage('Employé supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Employés
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog({ id: null, name: '', position: '', department: '' })}>
          Ajouter un employé
        </Button>
      </Box>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Département</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(employee)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editEmployeeId ? 'Modifier l\'employé' : 'Ajouter un employé'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom"
            fullWidth
            variant="standard"
            value={editEmployeeName}
            onChange={(e) => setEditEmployeeName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            variant="standard"
            value={editEmployeePosition}
            onChange={(e) => setEditEmployeePosition(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Département"
            fullWidth
            variant="standard"
            value={editEmployeeDepartment}
            onChange={(e) => setEditEmployeeDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Employees;
