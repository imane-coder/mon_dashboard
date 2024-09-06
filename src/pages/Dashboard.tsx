import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Container, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const Dashboard: React.FC = () => {

  const simulatedEvents = [
    { date: '2024-09-01', cost: 500, quantity: 150 },
    { date: '2024-09-05', cost: 800, quantity: 100 },
    { date: '2024-09-10', cost: 300, quantity: 200 },
    { date: '2024-09-15', cost: 450, quantity: 120 },
    { date: '2024-09-20', cost: 600, quantity: 80 },
    { date: '2024-09-25', cost: 350, quantity: 250 },
  ];


  const totalCost = simulatedEvents.reduce((acc, event) => acc + event.cost, 0);
  const totalQuantity = simulatedEvents.reduce((acc, event) => acc + event.quantity, 0);
  const averageCost = (totalCost / simulatedEvents.length).toFixed(2);


  const barData = {
    labels: simulatedEvents.map(event => event.date),
    datasets: [
      {
        label: 'Coût',
        data: simulatedEvents.map(event => event.cost),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Quantité',
        data: simulatedEvents.map(event => event.quantity),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ],
  };


  const lineData = {
    labels: simulatedEvents.map(event => event.date),
    datasets: [
      {
        label: 'Coût',
        data: simulatedEvents.map(event => event.cost),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Quantité',
        data: simulatedEvents.map(event => event.quantity),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard des Consommations
      </Typography>
      

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Coût Total
              </Typography>
              <Typography variant="h5" component="div">
                {totalCost} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Quantité Totale
              </Typography>
              <Typography variant="h5" component="div">
                {totalQuantity}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Coût Moyen
              </Typography>
              <Typography variant="h5" component="div">
                {averageCost} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Graphique des Coûts et Quantités (Bar)
            </Typography>
            <div style={{ height: '300px', width: '100%' }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </Paper>
        </Grid>


        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Graphique des Coûts et Quantités (Ligne)
            </Typography>
            <div style={{ height: '300px', width: '100%' }}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Résumé des Consommations
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date de début</TableCell>
                    <TableCell>Date de fin</TableCell>
                    <TableCell>Coût Total</TableCell>
                    <TableCell>Quantité Totale</TableCell>
                    <TableCell>Coût Moyen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{simulatedEvents[0].date}</TableCell>
                    <TableCell>{simulatedEvents[simulatedEvents.length - 1].date}</TableCell>
                    <TableCell>{totalCost} €</TableCell>
                    <TableCell>{totalQuantity}</TableCell>
                    <TableCell>{averageCost} €</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
