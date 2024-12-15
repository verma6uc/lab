import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  DevicesOther,
  Timer,
  LocationOn,
  Visibility,
} from '@mui/icons-material';
import { Session, DeviceType, BrowserType, SessionStatus } from '../../types/models';
import { sessionService } from '../../services/sessionService';
import PageContainer from '../../components/admin/PageContainer';

// Helper function to format filter options
const formatFilterName = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const getStatusColor = (status: SessionStatus) => {
  switch (status) {
    case SessionStatus.ACTIVE:
      return 'success';
    case SessionStatus.IDLE:
      return 'warning';
    case SessionStatus.DISCONNECTED:
      return 'error';
    default:
      return 'default';
  }
};

const formatLastActivity = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const SessionCard: React.FC<{ session: Session }> = ({ session }) => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      transition: 'all 0.3s ease-in-out',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        '& .session-icon': {
          transform: 'scale(1.1)',
        },
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        p: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 203, 243, 0.05) 100%)',
          opacity: 0.5,
          transition: 'opacity 0.3s ease-in-out',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            className="session-icon"
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
              transition: 'transform 0.3s ease-in-out',
              mr: 2,
            }}
          >
            <DevicesOther sx={{ color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}>
              {session.browser} {session.browserVersion}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {session.deviceType}
            </Typography>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ mt: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'rgba(255,255,255,0.9)',
              mb: 1,
            }}
          >
            <LocationOn sx={{ mr: 1, fontSize: 16, color: '#2196F3' }} />
            {session.location?.city}, {session.location?.country}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.6)',
              mb: 2,
              pl: 3,
            }}
          >
            IP: {session.ipAddress}
          </Typography>
        </Box>

        {/* Footer */}
        <Box 
          sx={{ 
            mt: 3,
            pt: 2,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Chip
            label={session.status}
            color={getStatusColor(session.status)}
            size="small"
            sx={{
              borderRadius: '8px',
              fontWeight: 500,
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Timer sx={{ fontSize: 14, mr: 0.5 }} />
            Last Activity: {formatLastActivity(session.lastActivityTime)}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Card>
);

const LiveSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sessionService.getAll();
      if (Array.isArray(response)) {
        setSessions(response);
        setFilteredSessions(response);
      } else {
        setSessions([]);
        setFilteredSessions([]);
        setError('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setError('Failed to fetch sessions. Please try again later.');
      setSessions([]);
      setFilteredSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();
    const filtered = sessions.filter(session => 
      session.browser.toLowerCase().includes(searchTerm) ||
      session.deviceType.toLowerCase().includes(searchTerm) ||
      session.location?.city?.toLowerCase().includes(searchTerm) ||
      session.location?.country?.toLowerCase().includes(searchTerm) ||
      session.ipAddress.toLowerCase().includes(searchTerm)
    );
    setFilteredSessions(filtered);
  };

  // Create filter options
  const filterOptions = [
    { value: 'ALL', label: 'All Sessions' },
    ...Object.values(SessionStatus).map(status => ({
      value: status,
      label: formatFilterName(status)
    })),
    ...Object.values(DeviceType).map(type => ({
      value: type,
      label: formatFilterName(type)
    })),
    ...Object.values(BrowserType).map(browser => ({
      value: browser,
      label: formatFilterName(browser)
    }))
  ];

  const handleFilter = (value: string) => {
    setSelectedFilter(value);
    
    if (value === 'ALL') {
      setFilteredSessions(sessions);
      return;
    }

    const filtered = sessions.filter(session => 
      session.status === value ||
      session.deviceType === value ||
      session.browser === value
    );
    setFilteredSessions(filtered);
  };

  return (
    <PageContainer
      icon={<Visibility />}
      title="Live Sessions"
      onSearch={handleSearch}
      onFilter={handleFilter}
      filterOptions={filterOptions}
      searchPlaceholder="Search sessions..."
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : filteredSessions.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>No sessions found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredSessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <SessionCard session={session} />
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default LiveSessions; 