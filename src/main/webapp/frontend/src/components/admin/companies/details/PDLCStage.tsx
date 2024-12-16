import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { STAGES, STAGE_DETAILS } from './stages';
import MemoryView from '../../../../pages/admin/applications/Memory/MemoryView';
import { MemoryDocument } from '../../../../pages/admin/applications/Memory/types';

interface PDLCStageProps {
  currentStage: keyof typeof STAGES;
  memory: MemoryDocument;
  onStageSelect: (stage: keyof typeof STAGES) => void;
  onSave: (section: string, field: string, value: string) => Promise<void>;
  onAddComment: (elementId: string, section: string, content: string) => Promise<void>;
}

const PDLCStage: React.FC<PDLCStageProps> = ({
  currentStage,
  memory,
  onStageSelect,
  onSave,
  onAddComment,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
        Product Development Lifecycle Stage
      </Typography>

      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 4,
        overflowX: 'auto',
        pb: 2,
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'rgba(0, 163, 255, 0.3)',
          borderRadius: '2px',
          '&:hover': {
            bgcolor: 'rgba(0, 163, 255, 0.5)',
          },
        },
      }}>
        {Object.entries(STAGE_DETAILS).map(([stage, details], index) => {
          const Icon = details.icon;
          const isActive = currentStage === stage;
          const isPast = Object.keys(STAGES).indexOf(stage) < Object.keys(STAGES).indexOf(currentStage);

          return (
            <React.Fragment key={stage}>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 'fit-content',
              }}>
                <IconButton
                  onClick={() => onStageSelect(stage as keyof typeof STAGES)}
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: isActive ? '#00A3FF' : isPast ? 'rgba(0, 163, 255, 0.2)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? '#00A3FF' : isPast ? 'rgba(0, 163, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    color: isActive ? 'white' : isPast ? '#00A3FF' : 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      bgcolor: isActive ? '#00A3FF' : 'rgba(0, 163, 255, 0.1)',
                    },
                  }}
                >
                  <Icon />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    color: isActive ? '#00A3FF' : isPast ? 'rgba(0, 163, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {details.label}
                </Typography>
              </Box>
              {index < Object.keys(STAGES).length - 1 && (
                <Box sx={{ 
                  flex: 1,
                  height: 1,
                  minWidth: 32,
                  maxWidth: 64,
                  bgcolor: isPast ? 'rgba(0, 163, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  alignSelf: 'center',
                  mt: -2,
                }} />
              )}
            </React.Fragment>
          );
        })}
      </Box>

      <Box sx={{ width: '100%' }}>
        {currentStage === 'memory' && (
          <MemoryView
            memory={memory}
            onSave={onSave}
            onAddComment={onAddComment}
          />
        )}
        {/* Add other stage views here when implemented */}
      </Box>
    </Box>
  );
};

export default PDLCStage;
