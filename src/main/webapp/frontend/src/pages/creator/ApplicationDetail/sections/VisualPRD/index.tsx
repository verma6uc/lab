import React from 'react';
import { Box } from '@mui/material';
import PageContainer from '../../../../../components/creator/PageContainer';
import { DesignServices as VisualIcon } from '@mui/icons-material';

const VisualPRDPage = () => {
  return (
    <PageContainer
      icon={<VisualIcon />}
      title="Visual PRD"
    >
      <Box sx={{ mt: 2 }}>
        {/* Visual PRD content will be implemented here */}
        Visual PRD stage content
      </Box>
    </PageContainer>
  );
};

export default VisualPRDPage;
