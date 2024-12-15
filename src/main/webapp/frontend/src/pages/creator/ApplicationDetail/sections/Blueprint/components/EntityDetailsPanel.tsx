import React from 'react';
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  TextField,
  Button,
  Collapse,
  Badge,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Comment as CommentIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { EntityDefinition, Entity, Comment } from '../types';

interface EntityDetailsPanelProps {
  open: boolean;
  onClose: () => void;
  selectedEntity: Entity | null;
  entities: Record<Entity, EntityDefinition>;
}

interface EntityComment extends Comment {
  section: 'attribute' | 'state' | 'action';
  sectionId: string;
}

const EntityDetailsPanel: React.FC<EntityDetailsPanelProps> = ({
  open,
  onClose,
  selectedEntity,
  entities,
}) => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);
  const [newComment, setNewComment] = React.useState('');
  const [comments, setComments] = React.useState<EntityComment[]>([
    {
      id: 1,
      author: 'John Smith',
      content: 'Should we add a validation rule for the name field?',
      timestamp: new Date().toISOString(),
      elementId: 'company',
      elementType: 'entity',
      section: 'attribute',
      sectionId: 'name',
    },
  ]);

  if (!selectedEntity) return null;
  const entity = entities[selectedEntity];

  const handleAddComment = (section: 'attribute' | 'state' | 'action', sectionId: string) => {
    if (!newComment.trim()) return;

    const comment: EntityComment = {
      id: Date.now(),
      author: 'Current User',
      content: newComment,
      timestamp: new Date().toISOString(),
      elementId: selectedEntity,
      elementType: 'entity',
      section,
      sectionId,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const getSectionComments = (section: 'attribute' | 'state' | 'action', sectionId: string) => {
    return comments.filter(
      comment =>
        comment.elementId === selectedEntity &&
        comment.section === section &&
        comment.sectionId === sectionId
    );
  };

  const renderCommentSection = (
    section: 'attribute' | 'state' | 'action',
    sectionId: string,
    isExpanded: boolean
  ) => {
    const sectionComments = getSectionComments(section, sectionId);
    return (
      <Collapse in={isExpanded} sx={{ transition: 'all 0.3s ease' }}>
        <Box sx={{ mt: 2, pl: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
            Feedback & Suggestions ({sectionComments.length})
          </Typography>
          {sectionComments.map(comment => (
            <Box
              key={comment.id}
              sx={{
                p: 1.5,
                mb: 1,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 1,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ color: '#00A3FF', flex: 1 }}>
                  {comment.author}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {new Date(comment.timestamp).toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {comment.content}
              </Typography>
            </Box>
          ))}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              size="small"
              placeholder="Add feedback or suggestion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  color: 'common.white',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&.Mui-focused fieldset': { borderColor: '#00A3FF' },
                },
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => handleAddComment(section, sectionId)}
              disabled={!newComment.trim()}
              sx={{
                bgcolor: 'rgba(0, 163, 255, 0.1)',
                '&:hover': { bgcolor: 'rgba(0, 163, 255, 0.2)' },
                '&:disabled': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
              }}
            >
              Add Feedback
            </Button>
          </Box>
        </Box>
      </Collapse>
    );
  };

  const renderCommentButton = (section: 'attribute' | 'state' | 'action', sectionId: string) => {
    const sectionComments = getSectionComments(section, sectionId);
    const isExpanded = expandedSection === `${section}-${sectionId}`;
    
    return (
      <Tooltip title={isExpanded ? "Hide comments" : "Show comments"}>
        <IconButton
          size="small"
          onClick={() => setExpandedSection(isExpanded ? null : `${section}-${sectionId}`)}
          sx={{
            color: sectionComments.length > 0 ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#00A3FF',
              bgcolor: 'rgba(0, 163, 255, 0.1)',
            },
          }}
        >
          <Badge
            badgeContent={sectionComments.length}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: sectionComments.length > 0 ? '#00A3FF' : 'transparent',
                transition: 'all 0.2s ease',
              },
            }}
          >
            <CommentIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          bgcolor: 'rgba(13, 25, 41, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ p: 1, bgcolor: 'rgba(0, 163, 255, 0.1)', borderRadius: 1, mr: 2 }}>
            {entity.icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              {entity.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {entity.description}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { color: 'common.white' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
          Attributes
        </Typography>
        {entity.attributes.map(attr => (
          <Box
            key={attr.name}
            sx={{
              p: 2,
              mb: 1,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#00A3FF', flex: 1 }}>
                {attr.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  mr: 1,
                }}
              >
                {attr.type}
              </Typography>
              {renderCommentButton('attribute', attr.name)}
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {attr.description}
            </Typography>
            {attr.constraints && (
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mt: 1 }}>
                Constraints: {attr.constraints}
              </Typography>
            )}
            {renderCommentSection('attribute', attr.name, expandedSection === `attribute-${attr.name}`)}
          </Box>
        ))}

        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, mt: 3 }}>
          States
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {entity.states.map(state => (
            <Box
              key={state.name}
              sx={{
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${state.color}40`,
                borderRadius: 1,
                flex: '1 1 calc(50% - 8px)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: state.color,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: state.color,
                    mr: 1,
                  }}
                />
                <Typography variant="subtitle2" sx={{ color: 'common.white', flex: 1 }}>
                  {state.name}
                </Typography>
                {renderCommentButton('state', state.name)}
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {state.description}
              </Typography>
              {renderCommentSection('state', state.name, expandedSection === `state-${state.name}`)}
            </Box>
          ))}
        </Box>

        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, mt: 3 }}>
          Actions
        </Typography>
        {entity.actions.map(action => (
          <Box
            key={action.name}
            sx={{
              p: 2,
              mb: 1,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#00A3FF', flex: 1 }}>
                {action.name}
              </Typography>
              {renderCommentButton('action', action.name)}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {action.from}
              </Typography>
              <Box sx={{ flex: 1, borderBottom: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {action.to}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: '#00A3FF',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: 'rgba(0, 163, 255, 0.1)',
                display: 'inline-block',
                mb: 1,
              }}
            >
              {action.role}
            </Typography>
            <Box sx={{ mt: 1 }}>
              {action.effects.map((effect, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    display: 'block',
                    '&:before': {
                      content: '"•"',
                      mr: 1,
                    },
                  }}
                >
                  {effect}
                </Typography>
              ))}
            </Box>
            {renderCommentSection('action', action.name, expandedSection === `action-${action.name}`)}
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default EntityDetailsPanel; 