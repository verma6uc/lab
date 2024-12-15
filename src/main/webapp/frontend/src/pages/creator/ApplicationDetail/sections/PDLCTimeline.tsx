import React from 'react';
import { Box, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Memory as MemoryIcon,
  Architecture as BlueprintIcon,
  DesignServices as VisualIcon,
  Build as PrototypeIcon,
  Code as DevelopmentIcon,
  Rocket as LaunchIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export interface PDLCTimelineProps {
  applicationId?: string;
}

const stages = [
  { label: 'Memory', icon: MemoryIcon, path: 'memory' },
  { label: 'Blueprint', icon: BlueprintIcon, path: 'blueprint' },
  { label: 'Visual PRD', icon: VisualIcon, path: 'visual-prd' },
  { label: 'Prototype', icon: PrototypeIcon, path: 'prototype' },
  { label: 'Development', icon: DevelopmentIcon, path: 'development' },
  { label: 'Launch', icon: LaunchIcon, path: 'launch' },
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #00A3FF 0%, #0057FF 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #00A3FF 0%, #0057FF 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  ...(ownerState.active && {
    backgroundColor: '#00A3FF',
    boxShadow: '0 4px 20px 0 rgba(0, 163, 255, 0.35)',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#00A3FF',
  }),
}));

function ColorlibStepIcon(props: any) {
  const { active, completed, className, icon } = props;
  const StageIcon = stages[icon - 1].icon;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      <StageIcon />
    </ColorlibStepIconRoot>
  );
}

const PDLCTimeline: React.FC<PDLCTimelineProps> = ({ applicationId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'memory';
  const activeStep = stages.findIndex(stage => stage.path === currentPath);

  const handleStepClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      p: 3,
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <Stepper 
        alternativeLabel 
        activeStep={activeStep} 
        connector={<ColorlibConnector />}
      >
        {stages.map((stage, index) => (
          <Step 
            key={stage.label}
            onClick={() => handleStepClick(stage.path)}
            sx={{ 
              cursor: 'pointer',
              '& .MuiStepLabel-label': {
                color: activeStep >= index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                mt: 1,
              },
            }}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {stage.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default PDLCTimeline;
