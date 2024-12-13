import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  Stack,
  Alert,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Save,
  Refresh,
  Security,
  Notifications,
  Storage,
  Email,
  CloudSync,
  Help,
  InfoOutlined,
} from '@mui/icons-material';
import PageContainer from '../../components/admin/PageContainer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      {...other}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );
};

const SettingSection = ({ title, description, children }: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {children}
    </CardContent>
  </Card>
);

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [settings, setSettings] = useState({
    // Security Settings
    twoFactorAuth: true,
    passwordPolicy: 'strong',
    sessionTimeout: 30,
    ipWhitelist: '',
    
    // Notification Settings
    emailNotifications: true,
    slackIntegration: false,
    notificationFrequency: 'realtime',
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 30,
    
    // Email Settings
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    senderEmail: 'noreply@example.com',
    
    // Integration Settings
    apiKey: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    webhookUrl: '',
    allowedOrigins: '*',
  });

  const handleChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to default values
    console.log('Resetting settings');
  };

  return (
    <PageContainer
      icon={<SettingsIcon />}
      title="System Settings"
    >
      <Box sx={{ width: '100%' }}>
        {hasChanges && (
          <Alert 
            severity="warning" 
            sx={{ mb: 3 }}
            action={
              <Stack direction="row" spacing={1}>
                <Button 
                  variant="contained" 
                  size="small" 
                  onClick={handleSave}
                  startIcon={<Save />}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={handleReset}
                  startIcon={<Refresh />}
                >
                  Reset
                </Button>
              </Stack>
            }
          >
            You have unsaved changes. Don't forget to save your settings.
          </Alert>
        )}

        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          <Tab icon={<Security />} label="Security" />
          <Tab icon={<Notifications />} label="Notifications" />
          <Tab icon={<Storage />} label="Backup" />
          <Tab icon={<Email />} label="Email" />
          <Tab icon={<CloudSync />} label="Integrations" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <SettingSection
            title="Security Configuration"
            description="Configure security-related settings for your application"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                    />
                  }
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Two-Factor Authentication</Typography>
                      <Tooltip title="Requires users to provide a second form of verification">
                        <InfoOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                      </Tooltip>
                    </Stack>
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Password Policy</InputLabel>
                  <Select
                    value={settings.passwordPolicy}
                    label="Password Policy"
                    onChange={(e) => handleChange('security', 'passwordPolicy', e.target.value)}
                  >
                    <MenuItem value="basic">Basic (8+ characters)</MenuItem>
                    <MenuItem value="medium">Medium (8+ chars, numbers)</MenuItem>
                    <MenuItem value="strong">Strong (8+ chars, numbers, symbols)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Session Timeout (minutes)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="IP Whitelist"
                  placeholder="Enter IP addresses separated by commas"
                  value={settings.ipWhitelist}
                  onChange={(e) => handleChange('security', 'ipWhitelist', e.target.value)}
                  helperText="Leave empty to allow all IPs"
                />
              </Grid>
            </Grid>
          </SettingSection>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <SettingSection
            title="Notification Preferences"
            description="Configure how and when notifications are sent"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.slackIntegration}
                      onChange={(e) => handleChange('notifications', 'slackIntegration', e.target.checked)}
                    />
                  }
                  label="Slack Integration"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Notification Frequency</InputLabel>
                  <Select
                    value={settings.notificationFrequency}
                    label="Notification Frequency"
                    onChange={(e) => handleChange('notifications', 'notificationFrequency', e.target.value)}
                  >
                    <MenuItem value="realtime">Real-time</MenuItem>
                    <MenuItem value="hourly">Hourly Digest</MenuItem>
                    <MenuItem value="daily">Daily Digest</MenuItem>
                    <MenuItem value="weekly">Weekly Digest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </SettingSection>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <SettingSection
            title="Backup Configuration"
            description="Configure automatic backup settings and retention policies"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoBackup}
                      onChange={(e) => handleChange('backup', 'autoBackup', e.target.checked)}
                    />
                  }
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Automatic Backups</Typography>
                      <Tooltip title="Automatically backup your data at scheduled intervals">
                        <InfoOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                      </Tooltip>
                    </Stack>
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Backup Frequency</InputLabel>
                  <Select
                    value={settings.backupFrequency}
                    label="Backup Frequency"
                    onChange={(e) => handleChange('backup', 'backupFrequency', e.target.value)}
                  >
                    <MenuItem value="hourly">Every Hour</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Retention Period (days)"
                  value={settings.retentionPeriod}
                  onChange={(e) => handleChange('backup', 'retentionPeriod', e.target.value)}
                  helperText="Number of days to keep backup files"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Manual backup triggered')}
                >
                  Create Manual Backup
                </Button>
              </Grid>
            </Grid>
          </SettingSection>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <SettingSection
            title="Email Configuration"
            description="Configure SMTP settings for sending emails"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Server"
                  value={settings.smtpServer}
                  onChange={(e) => handleChange('email', 'smtpServer', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="SMTP Port"
                  value={settings.smtpPort}
                  onChange={(e) => handleChange('email', 'smtpPort', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Username"
                  value={settings.smtpUsername}
                  onChange={(e) => handleChange('email', 'smtpUsername', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="SMTP Password"
                  value={settings.smtpPassword}
                  onChange={(e) => handleChange('email', 'smtpPassword', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sender Email"
                  value={settings.senderEmail}
                  onChange={(e) => handleChange('email', 'senderEmail', e.target.value)}
                  helperText="Default 'From' address for system emails"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => console.log('Test email configuration')}
                >
                  Test Configuration
                </Button>
              </Grid>
            </Grid>
          </SettingSection>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <SettingSection
            title="API & Integration Settings"
            description="Configure external integrations and API access"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API Key"
                  value={settings.apiKey}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => console.log('Generate new API key')}
                      >
                        Regenerate
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Webhook URL"
                  value={settings.webhookUrl}
                  onChange={(e) => handleChange('integration', 'webhookUrl', e.target.value)}
                  helperText="URL to receive webhook notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Allowed Origins (CORS)"
                  value={settings.allowedOrigins}
                  onChange={(e) => handleChange('integration', 'allowedOrigins', e.target.value)}
                  helperText="Comma-separated list of allowed origins, use * for all"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Webhook Events</InputLabel>
                  <Select
                    multiple
                    value={settings.webhookEvents || []}
                    label="Webhook Events"
                    onChange={(e) => handleChange('integration', 'webhookEvents', e.target.value)}
                  >
                    <MenuItem value="company.created">Company Created</MenuItem>
                    <MenuItem value="company.updated">Company Updated</MenuItem>
                    <MenuItem value="company.deleted">Company Deleted</MenuItem>
                    <MenuItem value="user.login">User Login</MenuItem>
                    <MenuItem value="user.logout">User Logout</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </SettingSection>
        </TabPanel>
      </Box>
    </PageContainer>
  );
};

export default Settings; 