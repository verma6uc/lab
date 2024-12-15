import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Comment as CommentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { FeedbackData, SectionData } from '../types.ts';
import DataTableSection from './sections/DataTableSection.tsx';
import MetricsSection from './sections/MetricsSection.tsx';
import CardGridSection from './sections/CardGridSection.tsx';
import KanbanSection from './sections/KanbanSection.tsx';

interface PrototypeSectionProps {
  section: SectionData;
  feedbackList: FeedbackData[];
  onFeedbackClick: (section: SectionData) => void;
  feedbackMode: boolean;
}

const PrototypeSection: React.FC<PrototypeSectionProps> = ({
  section,
  feedbackList,
  onFeedbackClick,
  feedbackMode,
}) => {
  const sectionFeedback = feedbackList.filter(f => f.elementId === section.id);

  const getStatusIcon = (status: FeedbackData['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon color="success" />;
      case 'rejected':
        return <CancelIcon color="error" />;
      default:
        return <ScheduleIcon color="warning" />;
    }
  };

  const renderSectionContent = () => {
    switch (section.type) {
      case 'data-table':
        return <DataTableSection section={section} />;
      case 'metrics':
        return <MetricsSection section={section} />;
      case 'card-grid':
        return <CardGridSection section={section} />;
      case 'kanban':
        return <KanbanSection section={section} />;
      default:
        return (
          <Typography variant="body1" color="text.secondary">
            Unsupported section type: {section.type}
          </Typography>
        );
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        mb: 2,
        position: 'relative',
        cursor: feedbackMode ? 'pointer' : 'default',
        '&:hover': feedbackMode ? {
          boxShadow: 3,
          '& .feedback-button': {
            opacity: 1,
          },
        } : {},
      }}
      onClick={() => feedbackMode && onFeedbackClick(section)}
    >
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {section.title}
          </Typography>
          {section.description && (
            <Typography variant="body2" color="text.secondary">
              {section.description}
            </Typography>
          )}
        </Box>

        {/* Feedback indicators */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {sectionFeedback.map((feedback) => (
            <Tooltip
              key={feedback.id}
              title={`${feedback.comment} (${feedback.status})`}
              placement="left"
            >
              <IconButton size="small">
                {getStatusIcon(feedback.status)}
              </IconButton>
            </Tooltip>
          ))}
          
          {feedbackMode && (
            <IconButton
              className="feedback-button"
              size="small"
              sx={{
                opacity: 0,
                transition: 'opacity 0.2s',
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              <CommentIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      {renderSectionContent()}
    </Paper>
  );
};

export default PrototypeSection; 