import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Collapse,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
} from '@mui/material';
import {
  Comment as CommentIcon,
  Send as SendIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Comment } from '../types';

interface CommentSectionProps {
  elementId: string;
  section: string;
  comments: Comment[];
  expandedComments: string[];
  activeCommentElement: string | null;
  loadingComments: string[];
  newComment: string;
  onToggleComments: (elementId: string) => void;
  onOpenCommentsModal: (comments: Comment[]) => void;
  onSetActiveCommentElement: (elementId: string | null) => void;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (elementId: string, section: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  elementId,
  section,
  comments,
  expandedComments,
  activeCommentElement,
  loadingComments,
  newComment,
  onToggleComments,
  onOpenCommentsModal,
  onSetActiveCommentElement,
  onCommentChange,
  onCommentSubmit,
}) => {
  const isExpanded = expandedComments.includes(elementId);
  const isActive = activeCommentElement === elementId;
  const isCommentLoading = loadingComments.includes(elementId);

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        px: { xs: 0.5, sm: 1 },
      }}>
        <IconButton
          size="small"
          onClick={() => onToggleComments(elementId)}
          sx={{
            color: comments.length > 0 ? '#00A3FF' : 'rgba(255, 255, 255, 0.5)',
            bgcolor: comments.length > 0 ? 'rgba(0, 163, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s ease',
            transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)',
            '&:hover': { 
              bgcolor: comments.length > 0 ? 'rgba(0, 163, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              transform: isExpanded ? 'rotate(-180deg) scale(1.05)' : 'scale(1.05)',
            },
          }}
        >
          <CommentIcon fontSize="small" />
        </IconButton>
        <Button
          size="small"
          onClick={() => onOpenCommentsModal(comments)}
          sx={{ 
            color: 'rgba(255, 255, 255, 0.5)',
            minWidth: 'auto',
            p: 0.5,
            '&:hover': {
              color: '#00A3FF',
              bgcolor: 'transparent',
            },
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'inherit',
              transition: 'all 0.3s ease',
            }}
          >
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </Typography>
        </Button>
        <Button
          size="small"
          onClick={() => onSetActiveCommentElement(isActive ? null : elementId)}
          sx={{
            color: isActive ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
            ml: { xs: 'auto', sm: 'auto' },
            order: { xs: 2, sm: 2 },
            '&:hover': { 
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Add feedback
        </Button>
      </Box>

      <Collapse 
        in={isExpanded || isActive}
        timeout={300}
        sx={{
          '& .MuiCollapse-wrapperInner': {
            transition: 'all 0.3s ease',
          },
        }}
      >
        <Box sx={{ 
          pl: { xs: 2, sm: 4 }, 
          mt: 1,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: { xs: '8px', sm: '16px' },
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'rgba(0, 163, 255, 0.2)',
            borderRadius: '4px',
          }
        }}>
          {comments.length > 0 && (
            <List disablePadding>
              {comments.map((comment, index) => (
                <ListItem
                  key={comment.id}
                  alignItems="flex-start"
                  sx={{
                    px: 0,
                    py: 1,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
                    '@keyframes fadeIn': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(10px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'rgba(13, 25, 41, 0.3)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={comment.author.avatarUrl} 
                      sx={{ 
                        width: { xs: 28, sm: 32 }, 
                        height: { xs: 28, sm: 32 },
                        border: '2px solid rgba(0, 163, 255, 0.2)',
                        bgcolor: 'rgba(0, 163, 255, 0.1)',
                      }}
                    >
                      <PersonIcon sx={{ 
                        color: '#00A3FF',
                        fontSize: { xs: 16, sm: 20 },
                      }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                        gap: { xs: 0.5, sm: 1 },
                      }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            color: 'common.white',
                            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                          }}
                        >
                          {comment.author.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                            width: { xs: '100%', sm: 'auto' },
                            order: { xs: 2, sm: 1 },
                          }}
                        >
                          {new Date(comment.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          mt: 0.5,
                          lineHeight: 1.6,
                          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                        }}
                      >
                        {comment.content}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}

          {isActive && (
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mt: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}>
              <TextField
                fullWidth
                multiline
                size="small"
                rows={2}
                placeholder="Add your feedback..."
                value={newComment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCommentChange(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'common.white',
                    bgcolor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 163, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(0, 163, 255, 0.5)',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => onCommentSubmit(elementId, section)}
                disabled={!newComment.trim() || isCommentLoading}
                sx={{
                  minWidth: { xs: '100%', sm: 'auto' },
                  px: 2,
                  py: { xs: 1, sm: 'auto' },
                  bgcolor: 'rgba(0, 163, 255, 0.2)',
                  border: '1px solid rgba(0, 163, 255, 0.3)',
                  color: '#00A3FF',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(0, 163, 255, 0.3)',
                    transform: 'translateY(-1px)',
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                {isCommentLoading ? (
                  <CircularProgress size={20} thickness={4} sx={{ color: '#00A3FF' }} />
                ) : (
                  <SendIcon />
                )}
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CommentSection;
