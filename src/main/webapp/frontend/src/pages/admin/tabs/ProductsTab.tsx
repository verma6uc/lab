import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Language,
  Storage,
  CloudQueue,
} from '@mui/icons-material';

interface Product {
  id: string;
  name: string;
  description: string;
  type: 'web' | 'database' | 'cloud';
  status: 'active' | 'beta' | 'deprecated';
  users: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Analytics Dashboard',
    description: 'Real-time data analytics and visualization platform',
    type: 'web',
    status: 'active',
    users: 1200,
  },
  {
    id: '2',
    name: 'Data Warehouse',
    description: 'Enterprise-scale data storage solution',
    type: 'database',
    status: 'active',
    users: 450,
  },
  {
    id: '3',
    name: 'Cloud Functions',
    description: 'Serverless compute platform',
    type: 'cloud',
    status: 'beta',
    users: 280,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'web':
      return <Language sx={{ fontSize: '1.2rem' }} />;
    case 'database':
      return <Storage sx={{ fontSize: '1.2rem' }} />;
    case 'cloud':
      return <CloudQueue sx={{ fontSize: '1.2rem' }} />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return { bg: 'rgba(76, 175, 80, 0.1)', text: '#4caf50', border: '#4caf50' };
    case 'beta':
      return { bg: 'rgba(255, 152, 0, 0.1)', text: '#ff9800', border: '#ff9800' };
    case 'deprecated':
      return { bg: 'rgba(244, 67, 54, 0.1)', text: '#f44336', border: '#f44336' };
    default:
      return { bg: 'rgba(158, 158, 158, 0.1)', text: '#9e9e9e', border: '#9e9e9e' };
  }
};

const ProductsTab = () => {
  return (
    <Grid container spacing={2}>
      {mockProducts.map((product) => (
        <Grid item xs={12} key={product.id}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                    }}
                  >
                    {getTypeIcon(product.type)}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: getStatusColor(product.status).bg,
                      color: getStatusColor(product.status).text,
                      border: `1px solid ${getStatusColor(product.status).border}`,
                      textTransform: 'capitalize',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {product.status}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {product.users.toLocaleString()} active users
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'rgba(0, 163, 255, 0.1)' },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: 'error.main',
                    '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsTab; 