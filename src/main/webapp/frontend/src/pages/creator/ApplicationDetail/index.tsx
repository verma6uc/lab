import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route, useParams } from 'react-router-dom';
import ApplicationHeader from './sections/ApplicationHeader';
import PDLCTimeline from './sections/PDLCTimeline';
import MemoryPage from './sections/Memory';
import BlueprintPage from './sections/Blueprint';
import VisualPRDPage from './sections/VisualPRD';
import DevelopmentPage from './sections/Development';
import LaunchPage from './sections/Launch';

const ApplicationDetail = () => {
  const { id } = useParams();

  return (
    <Box>
      <ApplicationHeader applicationId={id} />
      <PDLCTimeline applicationId={id} />
      <Box sx={{ mt: 2 }}>
        <Routes>
          <Route path="memory" element={<MemoryPage />} />
          <Route path="blueprint" element={<BlueprintPage />} />
          <Route path="visual-prd" element={<VisualPRDPage />} />
          <Route path="development" element={<DevelopmentPage />} />
          <Route path="launch" element={<LaunchPage />} />
          <Route path="*" element={<MemoryPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default ApplicationDetail;
