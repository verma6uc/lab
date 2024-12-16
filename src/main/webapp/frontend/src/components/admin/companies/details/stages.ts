import {
  Settings as MemoryIcon,
  Architecture as BlueprintIcon,
  Brush as VisualIcon,
  PhoneAndroid as PrototypeIcon,
  Code as DevelopmentIcon,
  Rocket as LaunchIcon,
} from '@mui/icons-material';

interface Stage {
  icon: typeof MemoryIcon;
  color: string;
  label: string;
  description: string;
}

export const STAGES: Record<string, string> = {
  memory: 'Memory',
  blueprint: 'Blueprint',
  visualPRD: 'Visual PRD',
  prototype: 'Prototype',
  development: 'Development',
  launch: 'Launch',
} as const;

export const STAGE_DETAILS: Record<keyof typeof STAGES, Stage> = {
  memory: {
    icon: MemoryIcon,
    color: '#9e9e9e',
    label: 'Memory',
    description: 'Early conceptual phase where ideas are being formed',
  },
  blueprint: {
    icon: BlueprintIcon,
    color: '#2196f3',
    label: 'Blueprint',
    description: 'Detailed technical specifications and architecture',
  },
  visualPRD: {
    icon: VisualIcon,
    color: '#4caf50',
    label: 'Visual PRD',
    description: 'Visual design and user interface specifications',
  },
  prototype: {
    icon: PrototypeIcon,
    color: '#ff9800',
    label: 'Prototype',
    description: 'Interactive prototype for testing and validation',
  },
  development: {
    icon: DevelopmentIcon,
    color: '#f44336',
    label: 'Development',
    description: 'Active development and implementation phase',
  },
  launch: {
    icon: LaunchIcon,
    color: '#9c27b0',
    label: 'Launch',
    description: 'Product launch and deployment',
  },
} as const;
