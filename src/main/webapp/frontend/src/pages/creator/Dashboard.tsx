import React from 'react';
import { Grid, Card } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import PageContainer from '../../components/admin/PageContainer';
import CompanyOverview from './components/Dashboard/CompanyOverview';
import CommandCenter from './components/Dashboard/CommandCenter';
import ActiveProjectsHub from './components/Dashboard/ActiveProjectsHub';
import WorkflowManager from './components/Dashboard/WorkflowManager';

const CompactDashboard = () => {
  return (
    <PageContainer
      icon={<DashboardIcon />}
      title="Creator Dashboard"
      maxWidth={false}
      disableGutters
      sx={{ px: 1 }}
    >
      <Grid container spacing={1}>
        {/* Company Overview */}
        <Grid item xs={12}>
          <CompanyOverview />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {/* Left Column */}
            <Grid item xs={12} lg={8}>
              <Grid container spacing={1}>
                {/* Command Center */}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <CommandCenter />
                  </Card>
                </Grid>

                {/* Active Projects Hub */}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <ActiveProjectsHub />
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column - Workflow Manager */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <WorkflowManager />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CompactDashboard; 