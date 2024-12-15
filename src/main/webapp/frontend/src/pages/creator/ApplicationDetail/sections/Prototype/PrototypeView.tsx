import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Divider,
} from '@mui/material';
import {
  DevicesOther as DeviceIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { FeedbackData, ValidationResponse, SectionData } from './types';
import { mockSections } from './mockData/index';
import FeedbackDrawer from './components/FeedbackDrawer';
import PrototypeSection from './components/PrototypeSection';
import PrototypeSidebar from './components/PrototypeSidebar';

interface PrototypeViewProps {
  applicationId: string;
}

const PrototypeView: React.FC<PrototypeViewProps> = ({ applicationId }) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedbackList, setFeedbackList] = useState<FeedbackData[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
  const [isFeedbackDrawerOpen, setIsFeedbackDrawerOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');

  const handleDeviceChange = () => {
    const views: ('desktop' | 'tablet' | 'mobile')[] = ['desktop', 'tablet', 'mobile'];
    const currentIndex = views.indexOf(deviceView);
    setDeviceView(views[(currentIndex + 1) % views.length]);
  };

  const toggleFeedbackMode = () => {
    setFeedbackMode(!feedbackMode);
  };

  const handleFeedbackClick = (section: SectionData) => {
    setSelectedSection(section);
    setIsFeedbackDrawerOpen(true);
  };

  const handleFeedbackSubmit = (feedback: FeedbackData, validation: ValidationResponse) => {
    if (validation.isValid) {
      setFeedbackList([...feedbackList, feedback]);
      setIsFeedbackDrawerOpen(false);
      setSelectedSection(null);
    }
  };

  const getDeviceStyles = () => {
    const baseStyles = {
      display: 'flex',
      overflow: 'hidden',
      bgcolor: 'background.paper',
    };

    switch (deviceView) {
      case 'mobile':
        return {
          ...baseStyles,
          width: '375px',
          height: '667px',
          margin: '20px auto',
          border: '16px solid #1a1a1a',
          borderRadius: '32px',
        };
      case 'tablet':
        return {
          ...baseStyles,
          width: '768px',
          height: '1024px',
          margin: '20px auto',
          border: '16px solid #1a1a1a',
          borderRadius: '24px',
        };
      default:
        return {
          ...baseStyles,
          width: '100%',
          height: '100%',
          margin: 0,
        };
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0A1929' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Tooltip title={`Current view: ${deviceView}`}>
          <IconButton onClick={handleDeviceChange}>
            <DeviceIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={feedbackMode ? 'Exit feedback mode' : 'Enter feedback mode'}>
          <IconButton
            onClick={toggleFeedbackMode}
            color={feedbackMode ? 'primary' : 'default'}
          >
            <CommentIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 3 }}>
        <Box sx={getDeviceStyles()}>
          {deviceView !== 'mobile' && (
            <PrototypeSidebar
              selectedItem={selectedMenuItem}
              onItemSelect={setSelectedMenuItem}
            />
          )}
          <Box sx={{
            flexGrow: 1,
            overflow: 'auto',
            bgcolor: 'background.default',
            height: '100%',
          }}>
            {mockSections.map((prototypeSection) => (
              <Box key={prototypeSection.id} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {prototypeSection.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {prototypeSection.sections.map((section) => (
                  <PrototypeSection
                    key={section.id}
                    section={section}
                    feedbackList={feedbackList}
                    onFeedbackClick={handleFeedbackClick}
                    feedbackMode={feedbackMode}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <FeedbackDrawer
        open={isFeedbackDrawerOpen}
        onClose={() => {
          setIsFeedbackDrawerOpen(false);
          setSelectedSection(null);
        }}
        selectedSection={selectedSection}
        onSubmit={handleFeedbackSubmit}
      />
    </Box>
  );
};

export default PrototypeView; 