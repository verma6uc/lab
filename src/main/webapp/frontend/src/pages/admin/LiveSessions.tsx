import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Paper,
  Container,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Button,
  Stack,
  TextField,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import {
  Search,
  FilterAlt,
  DevicesOther,
  Language,
  Timer,
  LocationOn,
  Refresh,
  Visibility,
} from '@mui/icons-material';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import AdminPageWrapper from '../../components/admin/AdminPageWrapper';
import { mockSessions, getSessionStats, Session } from '../../mocks/liveSessions';
import '../../utils/leaflet-icons';
import PageContainer from '../../components/admin/PageContainer';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Idle':
      return 'warning';
    case 'Disconnected':
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

interface FilterState {
  status: string[];
  browser: string[];
  deviceType: string[];
  duration: {
    min: number;
    max: number;
  };
  searchTerm: string;
}

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
              {session.browser} {session.version}
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
            {session.location.city}, {session.location.country}
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
            Last Activity: {formatLastActivity(session.lastActivity)}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Card>
);

const LiveSessions: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    browser: [],
    deviceType: [],
    duration: { min: 0, max: 120 },
    searchTerm: '',
  });

  const filterOptions = {
    status: ['Active', 'Idle', 'Disconnected'],
    browser: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    deviceType: ['desktop', 'mobile', 'tablet'],
  };

  const filteredSessions = useMemo(() => {
    let sessions = mockSessions;

    if (selectedLocation) {
      sessions = sessions.filter(
        session => session.location.city === selectedLocation
      );
    }

    if (filters.status.length > 0) {
      sessions = sessions.filter(session => 
        filters.status.includes(session.status)
      );
    }

    if (filters.browser.length > 0) {
      sessions = sessions.filter(session => 
        filters.browser.includes(session.browser)
      );
    }

    if (filters.deviceType.length > 0) {
      sessions = sessions.filter(session => 
        filters.deviceType.includes(session.deviceType)
      );
    }

    sessions = sessions.filter(session => 
      session.duration >= filters.duration.min && 
      session.duration <= filters.duration.max
    );

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      sessions = sessions.filter(session => 
        session.location.city.toLowerCase().includes(searchLower) ||
        session.location.country.toLowerCase().includes(searchLower) ||
        session.ipAddress.includes(searchLower) ||
        session.browser.toLowerCase().includes(searchLower)
      );
    }

    return sessions;
  }, [selectedLocation, filters]);

  const stats = useMemo(() => getSessionStats(filteredSessions), [filteredSessions]);

  const MapView: React.FC = () => {
    const [isMapReady, setIsMapReady] = useState(false);

    return (
      <Card 
        elevation={0}
        sx={{ 
          height: 400, 
          mb: 3,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Global Session Distribution</Typography>
          </Box>
          <IconButton onClick={() => setSelectedLocation(null)}>
            <Refresh />
          </IconButton>
        </Box>
        <Divider sx={{ opacity: 0.1 }} />
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: 'calc(100% - 60px)', width: '100%' }}
          whenReady={() => setIsMapReady(true)}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {isMapReady && filteredSessions.map((session) => (
            <Marker
              key={session.id}
              position={session.location.coordinates}
              eventHandlers={{
                click: () => setSelectedLocation(session.location.city),
              }}
            >
              <Popup>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {session.location.city}, {session.location.country}
                  </Typography>
                  <Typography variant="body2">
                    Active Sessions: {
                      filteredSessions.filter(s => 
                        s.location.city === session.location.city
                      ).length
                    }
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card>
    );
  };

  const StatisticsView: React.FC = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <Card 
          elevation={0}
          sx={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Sessions by Status</Typography>
            </Box>
            <PieChart width={400} height={300}>
              <Pie
                data={Object.entries(stats.byStatus).map(([name, value]) => ({
                  name,
                  value,
                }))}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(stats.byStatus).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip contentStyle={{ background: '#1a2035', border: 'none' }} />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card 
          elevation={0}
          sx={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Sessions by Device</Typography>
            </Box>
            <BarChart width={400} height={300} data={
              Object.entries(stats.byDevice).map(([name, value]) => ({
                name,
                sessions: value,
              }))
            }>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <RechartsTooltip contentStyle={{ background: '#1a2035', border: 'none' }} />
              <Legend />
              <Bar dataKey="sessions" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const FilterMenu: React.FC = () => (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search sessions..."
          value={filters.searchTerm}
          onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterAlt />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color={Object.values(filters).some(f => 
            Array.isArray(f) ? f.length > 0 : f.searchTerm !== ''
          ) ? 'primary' : 'inherit'}
        >
          Filters
        </Button>
        {Object.values(filters).some(f => 
          Array.isArray(f) ? f.length > 0 : f.searchTerm !== ''
        ) && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setFilters({
              status: [],
              browser: [],
              deviceType: [],
              duration: { min: 0, max: 120 },
              searchTerm: '',
            })}
          >
            Clear Filters
          </Button>
        )}
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1,
            width: 300,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Status
          </Typography>
          <Autocomplete
            multiple
            size="small"
            options={filterOptions.status}
            value={filters.status}
            onChange={(_, newValue) => 
              setFilters(prev => ({ ...prev, status: newValue }))
            }
            renderInput={(params) => <TextField {...params} placeholder="Select status" />}
          />

          <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
            Browser
          </Typography>
          <Autocomplete
            multiple
            size="small"
            options={filterOptions.browser}
            value={filters.browser}
            onChange={(_, newValue) => 
              setFilters(prev => ({ ...prev, browser: newValue }))
            }
            renderInput={(params) => <TextField {...params} placeholder="Select browser" />}
          />

          <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
            Device Type
          </Typography>
          <Autocomplete
            multiple
            size="small"
            options={filterOptions.deviceType}
            value={filters.deviceType}
            onChange={(_, newValue) => 
              setFilters(prev => ({ ...prev, deviceType: newValue }))
            }
            renderInput={(params) => <TextField {...params} placeholder="Select device type" />}
          />

          <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
            Session Duration (minutes)
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              type="number"
              label="Min"
              value={filters.duration.min}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                duration: { ...prev.duration, min: Number(e.target.value) }
              }))}
            />
            <TextField
              size="small"
              type="number"
              label="Max"
              value={filters.duration.max}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                duration: { ...prev.duration, max: Number(e.target.value) }
              }))}
            />
          </Stack>
        </Box>
      </Menu>
    </>
  );

  return (
    <AdminPageWrapper>
      <PageContainer
        icon={<Visibility />}
        title="Live Sessions"
        onSearch={(value) => setFilters(prev => ({ ...prev, searchTerm: value }))}
        onFilter={() => setAnchorEl(null)}
        filterOptions={[
          'Status',
          'Browser',
          'Device Type',
          'Location',
          'Duration',
        ]}
        searchPlaceholder="Search sessions..."
      >
        <MapView />
        <StatisticsView />
        <Grid container spacing={3}>
          {filteredSessions.map((session) => (
            <Grid item xs={12} md={6} lg={4} key={session.id}>
              <SessionCard session={session} />
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </AdminPageWrapper>
  );
};

export default LiveSessions; 