import React from 'react';
import { Box, Card, Grid, Typography, Switch, TextField } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import PageContainer from '../../../components/creator/PageContainer';

const Settings = () => {
  return (
    <PageContainer
      icon={<SettingsIcon />}
      title="Settings"
    >
      <Box 
        component="div" 
        sx={{ 
          p: { xs: 2, sm: 3 },
          minHeight: 'calc(100vh - 180px)',
        }}
      >
        <Grid container spacing={3}>
          {/* General Settings */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                p: 3,
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                General Settings
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                  Display Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue="John Smith"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(10, 25, 41, 0.7)',
                      borderRadius: 1.5,
                      border: '1px solid rgba(0, 163, 255, 0.1)',
                      '&:hover': {
                        border: '1px solid rgba(0, 163, 255, 0.2)',
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white',
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue="john.smith@example.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(10, 25, 41, 0.7)',
                      borderRadius: 1.5,
                      border: '1px solid rgba(0, 163, 255, 0.1)',
                      '&:hover': {
                        border: '1px solid rgba(0, 163, 255, 0.2)',
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white',
                    },
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                p: 3,
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                Preferences
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Email Notifications
                  </Typography>
                  <Switch 
                    defaultChecked 
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#00A3FF',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'rgba(0, 163, 255, 0.5)',
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Desktop Notifications
                  </Typography>
                  <Switch 
                    defaultChecked 
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#00A3FF',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'rgba(0, 163, 255, 0.5)',
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Auto-save Changes
                  </Typography>
                  <Switch 
                    defaultChecked 
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#00A3FF',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'rgba(0, 163, 255, 0.5)',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Settings;
