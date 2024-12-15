import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  WebAsset as PageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { PageNode, SelectedElement } from '../types';
import PageDetailsModal from './PageDetailsModal';

interface PageFlowViewProps {
  pages: PageNode[];
  onSelectElement: (element: SelectedElement) => void;
  onShowPageDetails: (pageId: string) => void;
}

const PageFlowView: React.FC<PageFlowViewProps> = ({
  pages,
  onSelectElement,
}) => {
  const [selectedPage, setSelectedPage] = React.useState<PageNode | null>(null);

  const handlePageClick = (page: PageNode) => {
    setSelectedPage(page);
  };

  const renderPageNode = (page: PageNode) => {
    return (
      <Box
        key={page.id}
        sx={{
          position: 'absolute',
          left: page.position.x,
          top: page.position.y,
          width: 200,
          zIndex: 1,
        }}
      >
        <Paper
          sx={{
            p: 2,
            background: 'rgba(13, 25, 41, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#00A3FF',
              transform: 'translateY(-2px)',
            },
          }}
          onClick={() => handlePageClick(page)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            {page.type === 'page' && <PageIcon sx={{ color: '#00A3FF' }} />}
            {page.type === 'modal' && <EditIcon sx={{ color: '#00A3FF' }} />}
            {page.type === 'dialog' && <DeleteIcon sx={{ color: '#00A3FF' }} />}
            <Typography variant="subtitle1" sx={{ color: 'common.white', flex: 1 }}>
              {page.title}
            </Typography>
            <Tooltip title="View comments">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement({ id: page.id, type: 'page' });
                }}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { color: '#00A3FF' },
                }}
              >
                <CommentIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Type: {page.type}
          </Typography>
        </Paper>
      </Box>
    );
  };

  const renderConnections = () => {
    return (
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
          {pages.map(page =>
            page.connections.map(connection => (
              <marker
                key={`marker-${page.id}-${connection.to}`}
                id={`arrowhead-${page.id}-${connection.to}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill={connection.type === 'navigation' ? '#00A3FF' : '#4CAF50'}
                />
              </marker>
            ))
          )}
        </defs>

        {pages.map(page =>
          page.connections.map(connection => {
            const targetPage = pages.find(p => p.id === connection.to);
            if (!targetPage) return null;

            const startX = page.position.x + 200;
            const startY = page.position.y + 30;
            const endX = targetPage.position.x;
            const endY = targetPage.position.y + 30;
            const midX = (startX + endX) / 2;

            return (
              <g key={`${page.id}-${connection.to}`}>
                <path
                  d={`M ${startX} ${startY} Q ${midX} ${startY} ${endX} ${endY}`}
                  fill="none"
                  stroke={connection.type === 'navigation' ? '#00A3FF' : '#4CAF50'}
                  strokeWidth="2"
                  markerEnd={`url(#arrowhead-${page.id}-${connection.to})`}
                  strokeDasharray={connection.type === 'action' ? '5,5' : undefined}
                />
                <foreignObject
                  x={midX - 50}
                  y={(startY + endY) / 2 - 15}
                  width="100"
                  height="30"
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '12px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {connection.label}
                  </div>
                </foreignObject>
              </g>
            );
          })
        )}
      </svg>
    );
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'common.white', mb: 2 }}>
          Page Flow
        </Typography>
        <Box
          sx={{
            height: 600,
            bgcolor: 'rgba(13, 25, 41, 0.3)',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              p: 3,
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 1200,
                height: 800,
              }}
            >
              {renderConnections()}
              {pages.map(renderPageNode)}
            </Box>
          </Box>
        </Box>
      </Box>

      <PageDetailsModal
        open={!!selectedPage}
        onClose={() => setSelectedPage(null)}
        pageId={selectedPage?.id || ''}
        pageTitle={selectedPage?.title || ''}
        pageType={selectedPage?.type || 'page'}
      />
    </>
  );
};

export default PageFlowView; 