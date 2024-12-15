import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SpeedIcon from '@mui/icons-material/Speed';
import BiotechIcon from '@mui/icons-material/Biotech';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DataObjectIcon from '@mui/icons-material/DataObject';

interface CustomIconProps extends Omit<SvgIconProps, 'color'> {
  size?: number;
  color?: string;
}

const createAgentIcon = (IconComponent: typeof SvgIcon) => {
  return ({ size = 24, color = 'inherit', sx, ...props }: CustomIconProps) => (
    <IconComponent
      {...props}
      sx={{
        width: size,
        height: size,
        color: color,
        ...sx,
      }}
    />
  );
};

export const AgentIconMap = {
  Baley: createAgentIcon(PsychologyIcon),
  Seldon: createAgentIcon(AutoGraphIcon),
  Daneel: createAgentIcon(ArchitectureIcon),
  Calvin: createAgentIcon(BiotechIcon),
  Giskard: createAgentIcon(IntegrationInstructionsIcon),
  Vasilia: createAgentIcon(SpeedIcon),
  Amadiro: createAgentIcon(AccountTreeIcon),
  Fastolfe: createAgentIcon(DataObjectIcon),
  Dors: createAgentIcon(IntegrationInstructionsIcon),
};
