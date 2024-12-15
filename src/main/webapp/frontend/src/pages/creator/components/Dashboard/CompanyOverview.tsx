import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
} from '@mui/icons-material';

const CompanyOverview = () => {
  return (
    <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
          <BusinessIcon />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">TechCorp Solutions</Typography>
          <Typography variant="caption" color="text.secondary">
            AI-powered product development hub
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {[
          { icon: <PeopleIcon />, value: '156', label: 'Active Users', color: 'primary.main', bgColor: 'rgba(33, 150, 243, 0.1)' },
          { icon: <GroupsIcon />, value: '12', label: 'Teams', color: '#9C27B0', bgColor: 'rgba(156, 39, 176, 0.1)' },
          { icon: <MessageIcon />, value: '1,234', label: 'Conversations', color: '#4CAF50', bgColor: 'rgba(76, 175, 80, 0.1)' },
        ].map((stat, index) => (
          <Grid item xs={4} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: stat.bgColor,
                  '& .MuiSvgIcon-root': { fontSize: 16, color: stat.color },
                }}
              >
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyOverview; 