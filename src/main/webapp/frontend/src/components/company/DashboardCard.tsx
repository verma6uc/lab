import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardCardProps {
  onCreate: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/admin');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        mb: 3,
        mt: 1,
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
      onClick={handleDashboardClick}
    >
      <BusinessIcon sx={{ color: 'primary.main', mr: 2 }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
      </CardContent>
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          onCreate();
        }}
        sx={{
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.dark',
            color: 'primary.dark',
          },
          borderRadius: 2,
          textTransform: 'none',
        }}
      >
        Start Creating
      </Button>
    </Card>
  );
};

export default DashboardCard; 