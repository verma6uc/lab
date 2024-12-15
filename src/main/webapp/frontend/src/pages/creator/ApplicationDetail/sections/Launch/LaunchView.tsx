import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Collapse,
  IconButton,
  Tooltip,
  Grid,
  LinearProgress,
  Chip,
  AlertTitle,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Launch as LaunchIcon,
  Description as DocumentationIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  Api as ApiIcon,
  Assignment as AssignmentIcon,
  BugReport as BugReportIcon,
  Speed as SpeedIcon,
  Group as GroupIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'DEPARTMENT' | 'FACILITY' | 'TEAM' | 'PROJECT' | 'DIVISION';
}

interface LaunchViewProps {
  applicationId: string;
  applicationName: string;
}

const mockSpaces: Space[] = [
  {
    id: 'dept-1',
    name: 'Engineering Department',
    description: 'Primary engineering workspace for core systems',
    type: 'DEPARTMENT',
  },
  {
    id: 'team-1',
    name: 'Platform Team',
    description: 'Platform development and deployment space',
    type: 'TEAM',
  },
  {
    id: 'project-1',
    name: 'Core Services Project',
    description: 'Project space for core service development',
    type: 'PROJECT',
  },
];

const mockDocumentation = {
  sections: [
    { name: 'API Documentation', status: 'approved', agent: 'Daneel', confidence: 0.98, date: '2024-03-20' },
    { name: 'User Guide', status: 'approved', agent: 'Dors', confidence: 0.96, date: '2024-03-19' },
    { name: 'Technical Specs', status: 'approved', agent: 'Amadiro', confidence: 0.97, date: '2024-03-18' },
    { name: 'Deployment Guide', status: 'approved', agent: 'Giskard', confidence: 0.99, date: '2024-03-17' },
  ],
};

const mockTests = {
  summary: {
    total: 245,
    passed: 245,
    coverage: 94.8,
    agent: 'Calvin',
    confidence: 0.995,
  },
  categories: [
    { name: 'Unit Tests', passed: 156, total: 156 },
    { name: 'Integration Tests', passed: 58, total: 58 },
    { name: 'E2E Tests', passed: 31, total: 31 },
  ],
  performance: {
    avgResponseTime: '120ms',
    p95ResponseTime: '250ms',
    maxConcurrentUsers: 1000,
    agent: 'Vasilia',
    confidence: 0.98,
  },
};

interface Permission {
  name: string;
  description: string;
  type: 'read' | 'write' | 'execute' | 'manage';
}

const mockRoles = [
  {
    name: 'Admin',
    configured: true,
    permissions: [
      { name: 'Manage Spaces', description: 'Create and configure deployment spaces', type: 'manage' },
      { name: 'Manage Agents', description: 'Configure and monitor AI agents', type: 'manage' },
      { name: 'Deploy Applications', description: 'Deploy to any space', type: 'execute' },
      { name: 'Edit Blueprints', description: 'Modify application structure', type: 'write' },
      { name: 'View Analytics', description: 'Access all performance metrics', type: 'read' },
    ],
    agent: 'Daneel',
    confidence: 0.97
  },
  {
    name: 'Manager',
    configured: true,
    permissions: [
      { name: 'View Spaces', description: 'View all deployment spaces', type: 'read' },
      { name: 'Deploy Applications', description: 'Deploy to assigned spaces', type: 'execute' },
      { name: 'Edit Blueprints', description: 'Modify application structure', type: 'write' },
      { name: 'View Analytics', description: 'Access performance metrics', type: 'read' },
    ],
    agent: 'Daneel',
    confidence: 0.98
  },
  {
    name: 'Editor',
    configured: true,
    permissions: [
      { name: 'View Spaces', description: 'View assigned spaces', type: 'read' },
      { name: 'Edit Blueprints', description: 'Modify application structure', type: 'write' },
      { name: 'View Analytics', description: 'Access basic metrics', type: 'read' },
    ],
    agent: 'Daneel',
    confidence: 0.99
  },
  {
    name: 'Viewer',
    configured: true,
    permissions: [
      { name: 'View Spaces', description: 'View assigned spaces', type: 'read' },
      { name: 'View Blueprints', description: 'View application structure', type: 'read' },
      { name: 'View Analytics', description: 'Access basic metrics', type: 'read' },
    ],
    agent: 'Daneel',
    confidence: 0.99
  },
];

const mockEntitiesAndActions = [
  { name: 'User Entity', type: 'entity', verifications: ['Schema', 'Relations', 'Constraints'], agent: 'Giskard', confidence: 0.98 },
  { name: 'Product Entity', type: 'entity', verifications: ['Schema', 'Relations', 'Lifecycle'], agent: 'Giskard', confidence: 0.97 },
  { name: 'Order Processing', type: 'action', verifications: ['Flow', 'Validation', 'Effects'], agent: 'Giskard', confidence: 0.99 },
  { name: 'Data Analytics', type: 'action', verifications: ['Input', 'Processing', 'Output'], agent: 'Giskard', confidence: 0.98 },
];

const LaunchView: React.FC<LaunchViewProps> = ({
  applicationId,
  applicationName,
}) => {
  const [selectedSpace, setSelectedSpace] = React.useState<string>('');
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [deploymentProgress, setDeploymentProgress] = React.useState<{
    stage: string;
    agent: string;
    progress: number;
  } | null>(null);

  const handleDeploy = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDeploy = () => {
    setShowConfirmation(false);
    // Simulate deployment stages with different agents
    const stages = [
      { stage: 'Environment Validation', agent: 'Amadiro', duration: 1000 },
      { stage: 'Security Verification', agent: 'Daneel', duration: 1500 },
      { stage: 'Integration Check', agent: 'Giskard', duration: 1000 },
      { stage: 'Performance Validation', agent: 'Vasilia', duration: 1200 },
      { stage: 'Final Deployment', agent: 'Calvin', duration: 1300 },
    ];

    let currentStage = 0;
    const runStage = () => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        setDeploymentProgress({
          stage: stage.stage,
          agent: stage.agent,
          progress: 0,
        });

        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          if (progress <= 100) {
            setDeploymentProgress(prev => ({
              ...prev!,
              progress,
            }));
          } else {
            clearInterval(interval);
            currentStage++;
            if (currentStage < stages.length) {
              setTimeout(runStage, 100);
            } else {
              setDeploymentProgress(null);
              setShowSuccess(true);
            }
          }
        }, stage.duration / 20);
      }
    };

    runStage();
  };

  const renderStatusChip = (status: string) => (
    <Chip
      size="small"
      icon={<CheckCircleIcon />}
      label={status}
      sx={{
        bgcolor: 'rgba(76, 175, 80, 0.1)',
        color: '#4CAF50',
        borderColor: '#4CAF50',
      }}
    />
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Grid container spacing={3}>
        {/* Documentation Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'transparent',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DocumentationIcon sx={{ color: '#00A3FF', fontSize: 24, mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'common.white', flex: 1 }}>
                  Documentation Approval
                </Typography>
                {renderStatusChip('Approved')}
              </Box>
              <List>
                {mockDocumentation.sections.map((section, index) => (
                  <React.Fragment key={section.name}>
                    {index > 0 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentIcon sx={{ color: '#00A3FF' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
                            {section.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block' }}>
                              Verified by {section.agent} on {section.date}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                              Confidence: {(section.confidence * 100).toFixed(1)}%
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Tests Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'transparent',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BugReportIcon sx={{ color: '#00A3FF', fontSize: 24, mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'common.white', flex: 1 }}>
                  Test Results
                </Typography>
                {renderStatusChip('All Passed')}
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
                  Test Coverage: {mockTests.summary.coverage}%
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mb: 1 }}>
                  Verified by {mockTests.summary.agent} with {(mockTests.summary.confidence * 100).toFixed(1)}% confidence
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={mockTests.summary.coverage}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#4CAF50',
                    },
                  }}
                />
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {mockTests.categories.map((category) => (
                  <Grid item xs={4} key={category.name}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                        {category.passed}/{category.total}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {category.name}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
                Performance Metrics
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mb: 2 }}>
                Analyzed by {mockTests.performance.agent} with {(mockTests.performance.confidence * 100).toFixed(1)}% confidence
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#00A3FF' }}>
                      {mockTests.performance.avgResponseTime}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Avg Response
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#00A3FF' }}>
                      {mockTests.performance.p95ResponseTime}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      P95 Response
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#00A3FF' }}>
                      {mockTests.performance.maxConcurrentUsers}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Max Users
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Roles Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'transparent',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SecurityIcon sx={{ color: '#00A3FF', fontSize: 24, mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'common.white', flex: 1 }}>
                  Roles and Permissions
                </Typography>
                {renderStatusChip('Configured')}
              </Box>
              <List>
                {mockRoles.map((role, index) => (
                  <React.Fragment key={role.name}>
                    {index > 0 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
                    <ListItem>
                      <ListItemIcon>
                        <GroupIcon sx={{ color: '#00A3FF' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
                            {role.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
                              {role.permissions.map((permission) => (
                                <Chip
                                  key={permission.name}
                                  size="small"
                                  label={permission.name}
                                  sx={{
                                    bgcolor: (() => {
                                      switch (permission.type) {
                                        case 'manage':
                                          return 'rgba(156, 39, 176, 0.1)';
                                        case 'execute':
                                          return 'rgba(0, 163, 255, 0.1)';
                                        case 'write':
                                          return 'rgba(76, 175, 80, 0.1)';
                                        default:
                                          return 'rgba(255, 255, 255, 0.1)';
                                      }
                                    })(),
                                    color: (() => {
                                      switch (permission.type) {
                                        case 'manage':
                                          return '#9C27B0';
                                        case 'execute':
                                          return '#00A3FF';
                                        case 'write':
                                          return '#4CAF50';
                                        default:
                                          return 'rgba(255, 255, 255, 0.7)';
                                      }
                                    })(),
                                    height: '20px',
                                  }}
                                />
                              ))}
                            </Box>
                            <Typography variant="caption" sx={{ color: '#4CAF50', display: 'block' }}>
                              Verified by {role.agent} with {(role.confidence * 100).toFixed(1)}% confidence
                            </Typography>
                          </Box>
                        }
                      />
                      <Tooltip
                        title={
                          <List dense>
                            {role.permissions.map((permission) => (
                              <ListItem key={permission.name}>
                                <ListItemText
                                  primary={
                                    <Typography variant="caption" sx={{ color: 'common.white' }}>
                                      {permission.name}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                      {permission.description}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        }
                        arrow
                      >
                        <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Entities and Actions Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'transparent',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ApiIcon sx={{ color: '#00A3FF', fontSize: 24, mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'common.white', flex: 1 }}>
                  Entities and Actions
                </Typography>
                {renderStatusChip('Verified')}
              </Box>
              <List>
                {mockEntitiesAndActions.map((item, index) => (
                  <React.Fragment key={item.name}>
                    {index > 0 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
                    <ListItem>
                      <ListItemIcon>
                        {item.type === 'entity' ? (
                          <CodeIcon sx={{ color: '#00A3FF' }} />
                        ) : (
                          <SpeedIcon sx={{ color: '#00A3FF' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
                              {item.name}
                            </Typography>
                            <Chip
                              size="small"
                              label={item.type}
                              sx={{
                                bgcolor: item.type === 'entity' ? 'rgba(0, 163, 255, 0.1)' : 'rgba(156, 39, 176, 0.1)',
                                color: item.type === 'entity' ? '#00A3FF' : '#9C27B0',
                                height: '20px',
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block' }}>
                              Verified: {item.verifications.join(', ')}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                              Verified by {item.agent} with {(item.confidence * 100).toFixed(1)}% confidence
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Deployment Section */}
      <Card
        sx={{
          background: 'transparent',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <LaunchIcon sx={{ color: '#00A3FF', fontSize: 24, mr: 1 }} />
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Deploy Application
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="space-select-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Select Deployment Space
            </InputLabel>
            <Select
              labelId="space-select-label"
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              sx={{
                color: 'common.white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00A3FF',
                },
              }}
            >
              {mockSpaces.map((space) => (
                <MenuItem key={space.id} value={space.id}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">{space.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {space.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<LaunchIcon />}
            onClick={handleDeploy}
            disabled={!selectedSpace}
            sx={{
              bgcolor: '#00A3FF',
              '&:hover': {
                bgcolor: '#0081CC',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(0, 163, 255, 0.1)',
              },
            }}
          >
            Deploy to Selected Space
          </Button>
        </CardContent>
      </Card>

      {/* Success Alert */}
      <Collapse in={showSuccess}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowSuccess(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Deployment Successful</AlertTitle>
          All agents have verified and completed the deployment process successfully.
        </Alert>
      </Collapse>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(18, 18, 18, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DialogTitle sx={{ color: 'common.white' }}>Confirm Deployment</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
            The following AI agents will verify and execute the deployment of {applicationName} to the selected space:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CodeIcon sx={{ color: '#00A3FF' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ color: 'common.white' }}>Amadiro</Typography>}
                secondary={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Environment validation and compatibility check</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon sx={{ color: '#00A3FF' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ color: 'common.white' }}>Daneel</Typography>}
                secondary={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Security and access control verification</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ApiIcon sx={{ color: '#00A3FF' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ color: 'common.white' }}>Giskard</Typography>}
                secondary={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Integration and system coherence check</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SpeedIcon sx={{ color: '#00A3FF' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ color: 'common.white' }}>Vasilia</Typography>}
                secondary={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Performance and resource optimization</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LaunchIcon sx={{ color: '#00A3FF' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ color: 'common.white' }}>Calvin</Typography>}
                secondary={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Final deployment verification and execution</Typography>}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowConfirmation(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDeploy}
            variant="contained"
            sx={{
              bgcolor: '#00A3FF',
              '&:hover': { bgcolor: '#0081CC' },
            }}
          >
            Start Deployment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deployment Progress Dialog */}
      <Dialog
        open={!!deploymentProgress}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(18, 18, 18, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: '400px',
          },
        }}
      >
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" sx={{ color: 'common.white', mb: 1 }}>
              {deploymentProgress?.stage}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
              Agent {deploymentProgress?.agent} is working...
            </Typography>
            <LinearProgress
              variant="determinate"
              value={deploymentProgress?.progress || 0}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#00A3FF',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LaunchView; 