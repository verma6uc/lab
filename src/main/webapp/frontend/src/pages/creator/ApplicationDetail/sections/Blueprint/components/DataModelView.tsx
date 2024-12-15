import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Comment as CommentIcon,
  Key as KeyIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { EntityDefinition, Entity, EntityRelationship, SelectedElement } from '../types';

interface DataModelViewProps {
  entities: Record<Entity, EntityDefinition>;
  relationships: EntityRelationship[];
  onSelectElement: (element: SelectedElement) => void;
}

const DataModelView: React.FC<DataModelViewProps> = ({
  entities,
  relationships,
  onSelectElement,
}) => {
  const renderEntityTable = (key: Entity, entity: EntityDefinition, index: number) => {
    const angle = (2 * Math.PI * index) / Object.keys(entities).length;
    const radius = 250;
    const x = 400 + radius * Math.cos(angle);
    const y = 300 + radius * Math.sin(angle);

    return (
      <Box
        key={key}
        sx={{
          position: 'absolute',
          left: x - 150,
          top: y - 100,
          width: 300,
          zIndex: 1,
        }}
      >
        <Paper
          sx={{
            bgcolor: 'rgba(13, 25, 41, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.2s ease',
            overflow: 'hidden',
            '&:hover': {
              borderColor: '#00A3FF',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              {entity.icon}
              <Typography
                variant="subtitle1"
                sx={{ ml: 1, color: 'common.white', fontWeight: 600 }}
              >
                {entity.name}
              </Typography>
            </Box>
            <Tooltip title="View comments">
              <IconButton
                size="small"
                onClick={() => onSelectElement({ id: key, type: 'entity' })}
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                <CommentIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Table Fields */}
          <Box sx={{ p: 1 }}>
            {entity.attributes.map((attr, idx) => (
              <Box
                key={attr.name}
                sx={{
                  py: 0.75,
                  px: 1,
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom:
                    idx < entity.attributes.length - 1
                      ? '1px solid rgba(255, 255, 255, 0.05)'
                      : 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.02)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  {attr.constraints?.includes('Required') && (
                    <KeyIcon
                      sx={{
                        fontSize: 16,
                        color: '#00A3FF',
                        mr: 0.5,
                      }}
                    />
                  )}
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    {attr.name}
                  </Typography>
                </Box>
                <Chip
                  label={attr.type}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1,
                      fontSize: '0.75rem',
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Table Footer - Foreign Keys */}
          {relationships.some(rel => rel.from === key || rel.to === key) && (
            <Box
              sx={{
                p: 1,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                bgcolor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              {relationships
                .filter(rel => rel.from === key || rel.to === key)
                .map((rel, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 0.5,
                    }}
                  >
                    <LinkIcon
                      sx={{
                        fontSize: 16,
                        color: '#00A3FF',
                        mr: 0.5,
                        transform: 'rotate(45deg)',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {rel.from === key
                        ? `→ ${entities[rel.to].name} (${rel.type})`
                        : `← ${entities[rel.from].name} (${rel.type})`}
                    </Typography>
                  </Box>
                ))}
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  const renderRelationships = () => (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#00A3FF" />
        </marker>
        <marker
          id="diamond"
          markerWidth="10"
          markerHeight="7"
          refX="5"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 3.5, 5 0, 10 3.5, 5 7" fill="#00A3FF" />
        </marker>
      </defs>
      {relationships.map((rel, index) => {
        const fromEntity = Object.entries(entities).findIndex(([key]) => key === rel.from);
        const toEntity = Object.entries(entities).findIndex(([key]) => key === rel.to);
        
        const fromAngle = (2 * Math.PI * fromEntity) / Object.keys(entities).length;
        const toAngle = (2 * Math.PI * toEntity) / Object.keys(entities).length;
        
        const radius = 250;
        const centerX = 400;
        const centerY = 300;
        
        const fromX = centerX + radius * Math.cos(fromAngle);
        const fromY = centerY + radius * Math.sin(fromAngle);
        const toX = centerX + radius * Math.cos(toAngle);
        const toY = centerY + radius * Math.sin(toAngle);

        const midAngle = (fromAngle + toAngle) / 2;
        const controlRadius = radius * 1.3;
        const controlX = centerX + controlRadius * Math.cos(midAngle);
        const controlY = centerY + controlRadius * Math.sin(midAngle);

        return (
          <g key={`${rel.from}-${rel.to}`}>
            <path
              d={`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`}
              fill="none"
              stroke="#00A3FF"
              strokeWidth="2"
              markerEnd={rel.type === 'one-to-many' ? 'url(#arrow)' : 'url(#diamond)'}
              strokeDasharray={rel.type === 'many-to-many' ? '5,5' : undefined}
            />
          </g>
        );
      })}
    </svg>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'common.white', mb: 2 }}>
        Data Model
      </Typography>
      <Box
        sx={{
          height: 600,
          bgcolor: 'rgba(13, 25, 41, 0.3)',
          borderRadius: 1,
          p: 2,
          position: 'relative',
        }}
      >
        {renderRelationships()}
        {Object.entries(entities).map(([key, entity], index) => 
          renderEntityTable(key as Entity, entity, index)
        )}
      </Box>
    </Box>
  );
};

export default DataModelView; 