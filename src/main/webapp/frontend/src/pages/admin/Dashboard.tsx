import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  LinearProgress,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  TrendingDown,
  Business,
  People,
  Visibility,
  Warning,
  Speed,
  Storage,
  CloudUpload,
  Memory,
  ArrowForward,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import PageContainer from '../../components/admin/PageContainer';

// Mock data for charts
const activityData = [
  { name: '00:00', users: 30, companies: 20 },
  { name: '03:00', users: 25, companies: 15 },
  { name: '06:00', users: 20, companies: 10 },
  { name: '09:00', users: 45, companies: 25 },
  { name: '12:00', users: 65, companies: 35 },
  { name: '15:00', users: 55, companies: 30 },
  { name: '18:00', users: 40, companies: 22 },
  { name: '21:00', users: 35, companies: 18 },
];

const industryData = [
  { name: 'Technology', value: 35 },
  { name: 'Healthcare', value: 25 },
  { name: 'Finance', value: 20 },
  { name: 'Manufacturing', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const recentActivities = [
  {
    id: 1,
    type: 'company',
    action: 'New company registered',
    name: 'TechCorp Solutions',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'security',
    action: 'Failed login attempt',
    name: 'john.doe@example.com',
    time: '5 minutes ago',
    status: 'error',
  },
  {
    id: 3,
    type: 'system',
    action: 'Database backup completed',
    name: 'Automated Backup',
    time: '10 minutes ago',
    status: 'success',
  },
  // Add more activities...
];

const systemMetrics = {
  cpu: 45,
  memory: 68,
  storage: 72,
  network: 34,
};

const StatCard = ({ title, value, trend, trendValue, icon: Icon }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {trend === 'up' ? (
              <TrendingUp fontSize="small" color="success" />
            ) : (
              <TrendingDown fontSize="small" color="error" />
            )}
            <Typography
              variant="body2"
              color={trend === 'up' ? 'success.main' : 'error.main'}
            >
              {trendValue}%
            </Typography>
          </Stack>
        </Box>
        <IconButton sx={{ bgcolor: 'action.hover', p: 1.5 }}>
          <Icon />
        </IconButton>
      </Stack>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <PageContainer
      icon={<DashboardIcon />}
      title="Dashboard"
    >
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Companies"
            value="2,543"
            trend="up"
            trendValue={12.5}
            icon={Business}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Active Sessions"
            value="847"
            trend="up"
            trendValue={8.2}
            icon={Visibility}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="System Health"
            value="98.2%"
            trend="up"
            trendValue={3.1}
            icon={Speed}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Security Alerts"
            value="12"
            trend="down"
            trendValue={5.8}
            icon={Warning}
          />
        </Grid>

        {/* Activity Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCompanies" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a2035' }} />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                    <Area
                      type="monotone"
                      dataKey="companies"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorCompanies)"
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Industry Distribution */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Industry Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a2035' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Health */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Health
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Memory fontSize="small" />
                      <Typography>CPU Usage</Typography>
                    </Stack>
                    <Typography>{systemMetrics.cpu}%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={systemMetrics.cpu}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Storage fontSize="small" />
                      <Typography>Storage</Typography>
                    </Stack>
                    <Typography>{systemMetrics.storage}%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={systemMetrics.storage}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CloudUpload fontSize="small" />
                      <Typography>Network</Typography>
                    </Stack>
                    <Typography>{systemMetrics.network}%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={systemMetrics.network}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Recent Activity</Typography>
                <Button endIcon={<ArrowForward />}>View All</Button>
              </Stack>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem
                    key={activity.id}
                    sx={{
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      py: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: activity.status === 'success' ? 'success.main' : 'error.main' }}>
                        {activity.type === 'company' ? <Business /> : 
                         activity.type === 'security' ? <Warning /> : <Speed />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" color="primary">
                            {activity.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            • {activity.time}
                          </Typography>
                        </Stack>
                      }
                    />
                    <Chip
                      size="small"
                      label={activity.status}
                      color={activity.status === 'success' ? 'success' : 'error'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard; 