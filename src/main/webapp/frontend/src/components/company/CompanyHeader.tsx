import React from 'react';
import {
  Box,
  Typography,
  Avatar,
} from '@mui/material';

const CompanyHeader: React.FC<{ companyName: string }> = ({ companyName }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'primary.main', boxShadow: 1 }}>
      <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 56, height: 56 }}>
        {companyName.charAt(0)}
      </Avatar>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
        {companyName}
      </Typography>
    </Box>
  );
};

export default CompanyHeader; 