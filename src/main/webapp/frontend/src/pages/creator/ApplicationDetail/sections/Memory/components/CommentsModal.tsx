import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import {
  Comment as CommentIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Comment } from '../types';

interface CommentsModalProps {
  open: boolean;
  comments: Comment[];
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  open,
  comments,
  onClose,
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(13, 25, 41, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }
      }}
    >
      <DialogTitle sx={{ 
        color: 'common.white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
        <CommentIcon sx={{ color: '#00A3FF' }} />
        Feedback History
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <List disablePadding>
          {comments.map((comment, index) => (
            <ListItem
              key={comment.id}
              alignItems="flex-start"
              sx={{
                px: 0,
                py: 2,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={comment.avatarUrl} 
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: '2px solid rgba(0, 163, 255, 0.2)',
                    bgcolor: 'rgba(0, 163, 255, 0.1)',
                  }}
                >
                  <PersonIcon sx={{ color: '#00A3FF' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    gap: 1,
                  }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: 'common.white',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {comment.author}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.75rem',
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
                      mt: 1,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {comment.content}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Button
          onClick={onClose}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: '#00A3FF',
              bgcolor: 'rgba(0, 163, 255, 0.1)',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentsModal;
