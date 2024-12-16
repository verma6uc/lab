import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from '@mui/material';
import {
  Close as CloseIcon,
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
          bgcolor: 'rgba(10, 25, 41, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 163, 255, 0.1)',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          Comments
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: '#00A3FF',
              transform: 'rotate(90deg)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <List sx={{ py: 0 }}>
          {comments.map((comment, index) => (
            <ListItem
              key={comment.id}
              sx={{
                px: 2,
                py: 2,
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
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;
