import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Person as OwnerIcon,
  Update as UpdateIcon,
  Warning as WarningIcon,
  Feedback as FeedbackIcon,
  Memory as MemoryIcon,
  Architecture as BlueprintIcon,
  DesignServices as VisualIcon,
  Build as PrototypeIcon,
  Code as DevelopmentIcon,
  Rocket as LaunchIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { STAGES } from '../stages';
import ApplicationEditModal from '../ApplicationEditModal';
import PageContainer from '../../../../shared/PageContainer';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const tabs = [
  { label: 'Memory', icon: <MemoryIcon />, path: 'memory' },
  { label: 'Blueprint', icon: <BlueprintIcon />, path: 'blueprint' },
  { label: 'Visual PRD', icon: <VisualIcon />, path: 'visual-prd' },
  { label: 'Prototype', icon: <PrototypeIcon />, path: 'prototype' },
  { label: 'Development', icon: <DevelopmentIcon />, path: 'development' },
  { label: 'Launch', icon: <LaunchIcon />, path: 'launch' },
];

const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  // Extract companyId and applicationId from URL
  const pathParts = location.pathname.split('/');
  const companyId = pathParts[3];
  const applicationId = pathParts[5];
  const currentSection = pathParts[6] || 'memory';

  // TODO: Replace with actual data fetching
  const application = {
    id: 1,
    name: 'Sales Dashboard',
    description: 'Real-time sales analytics and reporting dashboard',
    stage: 'development' as const,
    status: 'active' as const,
    pending_approval: true,
    feedback_required: false,
    owner: {
      id: 1,
      name: 'John Doe',
      role: 'Product Owner'
    },
    last_updated: '2024-01-15T10:30:00Z',
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleSave = (id: number, data: { name: string; description: string }) => {
    // TODO: Implement save logic
    console.log('Save application:', id, data);
  };

  const handleBack = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/companies/${companyId}/applications/${applicationId}/${newValue}`);
  };

  const Icon = STAGES[application.stage].icon;

  return (
    <PageContainer>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={handleBack} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
            {application.name}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip 
              label={STAGES[application.stage].label}
              size="small"
              icon={<Icon />}
              sx={{
                bgcolor: `${STAGES[application.stage].color}20`,
                color: STAGES[application.stage].color,
                border: `1px solid ${STAGES[application.stage].color}40`,
                '& .MuiChip-icon': {
                  color: 'inherit',
                },
              }}
            />
            {application.pending_approval && (
              <Tooltip title="Awaiting approval to proceed">
                <Chip 
                  icon={<WarningIcon />}
                  label="Pending Approval"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 152, 0, 0.1)',
                    color: '#ff9800',
                    border: '1px solid rgba(255, 152, 0, 0.2)',
                    '& .MuiChip-icon': {
                      color: 'inherit',
                    },
                  }}
                />
              </Tooltip>
            )}
            {application.feedback_required && (
              <Tooltip title="Feedback required">
                <Chip 
                  icon={<FeedbackIcon />}
                  label="Needs Feedback"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(233, 30, 99, 0.1)',
                    color: '#e91e63',
                    border: '1px solid rgba(233, 30, 99, 0.2)',
                    '& .MuiChip-icon': {
                      color: 'inherit',
                    },
                  }}
                />
              </Tooltip>
            )}
          </Stack>
        </Box>
        <Tooltip title="Edit Application">
          <IconButton 
            onClick={handleEdit}
            sx={{ 
              color: '#00A3FF',
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(0, 163, 255, 0.2)',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Navigation Tabs */}
      <Paper 
        sx={{ 
          mb: 3,
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          borderRadius: 2,
          border: '1px solid rgba(0, 163, 255, 0.1)',
        }}
      >
        <Tabs
          value={currentSection}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#00A3FF',
            },
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: '#00A3FF',
              },
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              value={tab.path}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {React.cloneElement(tab.icon, { fontSize: 'small' })}
                  {tab.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Content */}
      <Box>
        {children}
      </Box>

      <ApplicationEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        application={application}
        onSave={handleSave}
      />
    </PageContainer>
  );
};

export default ApplicationLayout;
