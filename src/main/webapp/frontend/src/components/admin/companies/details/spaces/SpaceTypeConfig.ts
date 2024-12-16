import {
  Business as DepartmentIcon,
  Group as TeamIcon,
  Assignment as ProjectIcon,
  Person as PersonalIcon,
  LocationOn as FacilityIcon,
  SvgIconComponent,
} from '@mui/icons-material';
import { SpaceType } from '../../../../../types/space';

interface SpaceTypeConfigItem {
  icon: SvgIconComponent;
  color: string;
  label: string;
}

export const spaceTypeConfig: Record<SpaceType, SpaceTypeConfigItem> = {
  [SpaceType.DEPARTMENT]: {
    icon: DepartmentIcon,
    color: '#00A3FF',
    label: 'Department',
  },
  [SpaceType.TEAM]: {
    icon: TeamIcon,
    color: '#54D62C',
    label: 'Team',
  },
  [SpaceType.PROJECT]: {
    icon: ProjectIcon,
    color: '#FF4842',
    label: 'Project',
  },
  [SpaceType.PERSONAL]: {
    icon: PersonalIcon,
    color: '#7635DC',
    label: 'Personal',
  },
  [SpaceType.FACILITY]: {
    icon: FacilityIcon,
    color: '#FFC107',
    label: 'Facility',
  },
};
