import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
} from '@mui/material';
import PageContainer from '../../components/shared/PageContainer';
import StyledTextField from '../../components/shared/StyledTextField';
import StyledSwitch from '../../components/shared/StyledSwitch';
import StyledButton from '../../components/shared/StyledButton';

const Settings: React.FC = () => {
  const [systemName, setSystemName] = useState('Yuvi Admin');
  const [supportEmail, setSupportEmail] = useState('support@yuvi.ai');
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [apiKey, setApiKey] = useState('sk-****************************************');
  const [rateLimiting, setRateLimiting] = useState(true);

  const handleSave = () => {
    // Handle save logic
  };

  const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Paper sx={{ 
      p: 3,
      mb: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      '&:hover': {
        border: '1px solid rgba(0, 163, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
      }
    }}>
      <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 500 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
          System Settings
        </Typography>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Configure system-wide settings and preferences
        </Typography>
      </Box>

      <Box component="form" noValidate autoComplete="off">
        {/* General Settings */}
        <SettingsSection title="General Settings">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="System Name"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Support Email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledSwitch
                label="Enable System Notifications"
                checked={notifications}
                onChange={setNotifications}
              />
            </Grid>
          </Grid>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection title="Security Settings">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledSwitch
                label="Two-Factor Authentication"
                checked={twoFactor}
                onChange={setTwoFactor}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledSwitch
                label="Session Timeout (2 hours)"
                checked={sessionTimeout}
                onChange={setSessionTimeout}
              />
            </Grid>
          </Grid>
        </SettingsSection>

        {/* API Settings */}
        <SettingsSection title="API Configuration">
          <StyledTextField
            fullWidth
            label="API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            sx={{ mb: 3 }}
          />

          <StyledSwitch
            label="Enable API Rate Limiting"
            checked={rateLimiting}
            onChange={setRateLimiting}
          />
        </SettingsSection>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <StyledButton
            buttonType="secondary"
          >
            Cancel
          </StyledButton>
          <StyledButton
            buttonType="primary"
            onClick={handleSave}
          >
            Save Changes
          </StyledButton>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Settings;
