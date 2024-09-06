import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Coûts',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Quantités',
      data: [2, 3, 4, 8, 2, 5, 1],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.dataset.label || '';
          const value = context.raw;
          return `${label}: ${value}`;
        },
      },
    },
  },
};

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Taux de Croissance',
      data: [1, 2, 1, 4, 3, 6, 5],
      fill: false,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.dataset.label || '';
          const value = context.raw;
          return `${label}: ${value}`;
        },
      },
    },
  },
};

const pieData = {
  labels: ['Marketing', 'Développement', 'Design'],
  datasets: [
    {
      label: 'Répartition des Dépenses',
      data: [300, 500, 200],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || '';
          const value = context.raw;
          return `${label}: ${value}`;
        },
      },
    },
  },
};

const doughnutData = {
  labels: ['Catégorie A', 'Catégorie B', 'Catégorie C'],
  datasets: [
    {
      label: 'Répartition des Catégories',
      data: [40, 30, 30],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || '';
          const value = context.raw;
          return `${label}: ${value}`;
        },
      },
    },
  },
};

const Statistique: React.FC = () => {
  const theme = useTheme();

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        padding: 4,
      }}
    >
     

      <Grid container spacing={3} sx={{ mt: 3 }}>
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
              Taux de Croissance
            </Typography>
            <div style={{ height: '300px', width: '100%' }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Répartition des Dépenses
            </Typography>
            <div style={{ height: '300px', width: '100%' }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Répartition des Catégories
            </Typography>
            <div style={{ height: '300px', width: '100%' }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statistique;

