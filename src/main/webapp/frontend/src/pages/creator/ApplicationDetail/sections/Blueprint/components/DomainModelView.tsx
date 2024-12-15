import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Comment as CommentIcon } from '@mui/icons-material';
import { EntityDefinition, Entity, EntityRelationship, SelectedElement } from '../types';

interface DomainModelViewProps {
  entities: Record<Entity, EntityDefinition>;
  relationships: EntityRelationship[];
  onSelectElement: (element: SelectedElement) => void;
  onShowEntityDetails: (entity: Entity) => void;
}

const DomainModelView: React.FC<DomainModelViewProps> = ({
  entities,
  relationships,
  onSelectElement,
  onShowEntityDetails,
}) => {
  const renderEntityNode = (key: Entity, entity: EntityDefinition, index: number) => {
    const angle = (2 * Math.PI * index) / Object.keys(entities).length;
    const radius = 200;
    const x = 400 + radius * Math.cos(angle);
    const y = 300 + radius * Math.sin(angle);

    return (
      <Box
        key={key}
        sx={{
          position: 'absolute',
          left: x - 100,
          top: y - 75,
          width: 200,
          zIndex: 1,
        }}
      >
        <Paper
          sx={{
            p: 2,
            bgcolor: 'rgba(13, 25, 41, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              borderColor: '#00A3FF',
              transform: 'translateY(-2px)',
            },
          }}
          onClick={() => onShowEntityDetails(key)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {entity.icon}
            <Typography variant="subtitle1" sx={{ ml: 1, color: 'common.white', flex: 1 }}>
              {entity.name}
            </Typography>
            <Tooltip title="View comments">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement({ id: key, type: 'entity' });
                }}
              >
                <CommentIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ opacity: 0.7 }}>
            {entity.attributes.slice(0, 3).map(attr => (
              <Typography key={attr.name} variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)' }}>
                {attr.name}: {attr.type}
              </Typography>
            ))}
            {entity.attributes.length > 3 && (
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)' }}>
                +{entity.attributes.length - 3} more...
              </Typography>
            )}
          </Box>
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
        
        const radius = 200;
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
            <foreignObject
              x={controlX - 30}
              y={controlY - 15}
              width="60"
              height="30"
            >
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {rel.label}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'common.white', mb: 2 }}>
        Domain Model
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
          renderEntityNode(key as Entity, entity, index)
        )}
      </Box>
    </Box>
  );
};

export default DomainModelView; 