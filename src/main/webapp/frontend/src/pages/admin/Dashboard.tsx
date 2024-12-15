import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import PageContainer from '../../components/shared/PageContainer';
import GlobalOverview from '../../components/admin/dashboard/GlobalOverview';
import UserRoleSummary from '../../components/admin/dashboard/UserRoleSummary';
import SecuritySnapshot from '../../components/admin/dashboard/SecuritySnapshot';

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
          Admin Dashboard
        </Typography>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Overview of system metrics and activities
        </Typography>
      </Box>

      <GlobalOverview />
      
      <Divider sx={{ 
        my: 6, 
        borderColor: 'rgba(255, 255, 255, 0.1)',
        '&::before, &::after': {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }
      }} />
      
      <UserRoleSummary />
      
      <Divider sx={{ 
        my: 6, 
        borderColor: 'rgba(255, 255, 255, 0.1)',
        '&::before, &::after': {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }
      }} />
      
      <SecuritySnapshot />
      
      <Box sx={{ height: 40 }} /> {/* Bottom spacing */}
    </PageContainer>
  );
};

export default Dashboard;
