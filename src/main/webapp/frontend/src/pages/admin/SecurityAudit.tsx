import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Grid
} from '@mui/material';
import PageContainer from '../../components/shared/PageContainer';
import StyledSelect from '../../components/shared/StyledSelect';

// Mock data
const auditLogs = [
  { 
    id: 1, 
    timestamp: '2024-01-20 14:30:25',
    user: 'john.doe@example.com',
    action: 'User Login',
    type: 'Authentication',
    status: 'Success',
    ipAddress: '192.168.1.100'
  },
  { 
    id: 2, 
    timestamp: '2024-01-20 14:28:15',
    user: 'admin@yuvi.ai',
    action: 'Settings Update',
    type: 'System',
    status: 'Success',
    ipAddress: '192.168.1.101'
  },
  { 
    id: 3, 
    timestamp: '2024-01-20 14:25:10',
    user: 'jane.smith@example.com',
    action: 'Failed Login Attempt',
    type: 'Authentication',
    status: 'Failed',
    ipAddress: '192.168.1.102'
  },
  { 
    id: 4, 
    timestamp: '2024-01-20 14:20:05',
    user: 'admin@yuvi.ai',
    action: 'User Role Update',
    type: 'User Management',
    status: 'Success',
    ipAddress: '192.168.1.101'
  },
  { 
    id: 5, 
    timestamp: '2024-01-20 14:15:00',
    user: 'system',
    action: 'Database Backup',
    type: 'System',
    status: 'Success',
    ipAddress: 'localhost'
  },
];

const SecurityAudit: React.FC = () => {
  const [eventType, setEventType] = useState('all');
  const [status, setStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
          Security Audit Log
        </Typography>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Track and monitor system activities and security events
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ 
        p: 3, 
        mb: 3,
        bgcolor: 'rgba(10, 25, 41, 0.7)',
        borderRadius: 2,
        border: '1px solid rgba(0, 163, 255, 0.1)',
        backdropFilter: 'blur(10px)',
      }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledSelect
              label="Event Type"
              value={eventType}
              onChange={setEventType}
              options={[
                { value: 'all', label: 'All Events' },
                { value: 'auth', label: 'Authentication' },
                { value: 'system', label: 'System' },
                { value: 'user', label: 'User Management' },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledSelect
              label="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'success', label: 'Success' },
                { value: 'failed', label: 'Failed' },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledSelect
              label="Time Range"
              value={timeRange}
              onChange={setTimeRange}
              options={[
                { value: '24h', label: 'Last 24 Hours' },
                { value: '7d', label: 'Last 7 Days' },
                { value: '30d', label: 'Last 30 Days' },
                { value: 'custom', label: 'Custom Range' },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Audit Log Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          borderRadius: 2,
          border: '1px solid rgba(0, 163, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          '& .MuiTableCell-root': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Timestamp</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>User</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Action</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Type</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Status</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>IP Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell sx={{ color: 'white' }}>
                  {log.timestamp}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {log.user}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {log.action}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={log.type}
                    sx={{
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                      border: '1px solid rgba(0, 163, 255, 0.2)',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={log.status}
                    sx={{
                      bgcolor: log.status === 'Success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255, 99, 71, 0.1)',
                      color: log.status === 'Success' ? '#2ecc71' : '#ff6347',
                      border: `1px solid ${log.status === 'Success' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 99, 71, 0.2)'}`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {log.ipAddress}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default SecurityAudit;
