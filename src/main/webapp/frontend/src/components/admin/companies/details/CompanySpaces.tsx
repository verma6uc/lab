import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Business as FacilityIcon,
  AccountTree as DepartmentIcon,
  Groups as TeamIcon,
  Domain as DivisionIcon,
  Hub as UnitIcon,
  Edit as EditIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  LocationOn as LocationIcon,
  Person as ManagerIcon,
  Info as InfoIcon,
  AccountTree as OrgStructureIcon,
} from '@mui/icons-material';
import { Company } from '../../../../types/company';
import { Space, SpaceType } from '../../../../types/space';

interface CompanySpacesProps {
  company: Company;
  onEditSpace?: (spaceId: number) => void;
  onAddSpace?: (parentId?: number) => void;
}

// Mock data - In real app, this would come from the backend
const mockSpaces: Space[] = [
  {
    id: 1,
    name: 'San Francisco HQ',
    type: 'facility',
    description: 'Main headquarters facility',
    attributes: {
      location: 'San Francisco, CA',
      capacity: 500,
      manager: 'John Smith',
    },
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Engineering',
    type: 'department',
    parent_id: 1,
    description: 'Engineering department',
    attributes: {
      manager: 'Jane Doe',
    },
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Frontend Team',
    type: 'team',
    parent_id: 2,
    description: 'Frontend development team',
    attributes: {
      manager: 'Bob Wilson',
    },
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Backend Team',
    type: 'team',
    parent_id: 2,
    description: 'Backend development team',
    attributes: {
      manager: 'Alice Johnson',
    },
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: 'Sales Division',
    type: 'division',
    parent_id: 1,
    description: 'Global sales division',
    attributes: {
      manager: 'Mike Brown',
    },
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
  },
];

const spaceTypeConfig: Record<SpaceType, {
  icon: React.ReactElement;
  color: string;
  label: string;
}> = {
  facility: {
    icon: <FacilityIcon />,
    color: '#3498db',
    label: 'Facility',
  },
  department: {
    icon: <DepartmentIcon />,
    color: '#2ecc71',
    label: 'Department',
  },
  team: {
    icon: <TeamIcon />,
    color: '#e74c3c',
    label: 'Team',
  },
  division: {
    icon: <DivisionIcon />,
    color: '#9b59b6',
    label: 'Division',
  },
  unit: {
    icon: <UnitIcon />,
    color: '#f1c40f',
    label: 'Unit',
  },
};

interface SpaceNodeProps {
  space: Space;
  children?: Space[];
  level: number;
  onEdit?: (spaceId: number) => void;
  onAdd?: (parentId?: number) => void;
}

const SpaceNode: React.FC<SpaceNodeProps> = ({
  space,
  children,
  level,
  onEdit,
  onAdd,
}) => {
  const [expanded, setExpanded] = useState(true);
  const config = spaceTypeConfig[space.type];
  const hasChildren = children && children.length > 0;

  return (
    <>
      <ListItem
        sx={{
          pl: level * 3,
          py: 2,
          borderLeft: level > 0 ? '1px dashed rgba(255, 255, 255, 0.1)' : 'none',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 40 }}>
          {hasChildren && (
            <IconButton
              onClick={() => setExpanded(!expanded)}
              sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
          {React.cloneElement(config.icon, { sx: { color: config.color } })}
        </Box>
        <Box sx={{ flex: 1, ml: hasChildren ? 0 : 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography sx={{ color: 'white', fontWeight: 500 }}>
              {space.name}
            </Typography>
            <Chip
              label={config.label}
              size="small"
              sx={{
                bgcolor: `${config.color}20`,
                color: config.color,
                border: `1px solid ${config.color}40`,
              }}
            />
            {space.status === 'inactive' && (
              <Chip
                label="Inactive"
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 99, 71, 0.1)',
                  color: '#ff6347',
                  border: '1px solid rgba(255, 99, 71, 0.2)',
                }}
              />
            )}
          </Box>
          {space.description && (
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', mb: 1 }}>
              {space.description}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {space.attributes?.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
                  {space.attributes.location}
                </Typography>
              </Box>
            )}
            {space.attributes?.manager && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ManagerIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
                  {space.attributes.manager}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onAdd && (
            <Tooltip title={`Add Sub-${config.label}`}>
              <IconButton
                onClick={() => onAdd(space.id)}
                sx={{ color: '#00A3FF' }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          {onEdit && (
            <Tooltip title={`Edit ${config.label}`}>
              <IconButton
                onClick={() => onEdit(space.id)}
                sx={{ color: '#00A3FF' }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="View Details">
            <IconButton sx={{ color: '#00A3FF' }}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </ListItem>
      {hasChildren && (
        <Collapse in={expanded}>
          {children.map(child => (
            <SpaceNode
              key={child.id}
              space={child}
              children={mockSpaces.filter(s => s.parent_id === child.id)}
              level={level + 1}
              onEdit={onEdit}
              onAdd={onAdd}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

const CompanySpaces: React.FC<CompanySpacesProps> = ({
  company,
  onEditSpace,
  onAddSpace,
}) => {
  // Build space hierarchy
  const rootSpaces = mockSpaces.filter(space => !space.parent_id);

  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <OrgStructureIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Organizational Structure
          </Typography>
          <Box
            sx={{
              ml: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              border: '1px solid rgba(0, 163, 255, 0.2)',
            }}
          >
            <Typography sx={{ color: '#00A3FF', fontSize: '0.875rem' }}>
              {mockSpaces.length}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Hierarchical view of facilities, departments, teams, and other organizational units
        </Typography>
      </Box>

      {/* Space Tree */}
      <List sx={{ mx: -3 }}>
        {rootSpaces.map((space, index) => (
          <React.Fragment key={space.id}>
            <SpaceNode
              space={space}
              children={mockSpaces.filter(s => s.parent_id === space.id)}
              level={0}
              onEdit={onEditSpace}
              onAdd={onAddSpace}
            />
            {index < rootSpaces.length - 1 && (
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default CompanySpaces;
