import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@mui/material';
import {
  Close as CloseIcon,
  History as HistoryIcon,
  Comment as CommentIcon,
  AttachFile as AttachmentIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { TaskDetailsModalProps } from '../types';

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, open, onClose }) => {
  if (!task) return null;

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, color: 'common.white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{task.title}</Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
            {task.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {task.labels.map((label) => (
              <Chip
                key={label}
                label={label}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
            Agent Information
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{task.agent[0]}</Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: 'common.white' }}>
                {task.agent}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Confidence: {Math.round(task.confidence * 100)}%
              </Typography>
            </Box>
          </Box>
        </Box>

        {task.dependencies && task.dependencies.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
              Dependencies
            </Typography>
            <List dense>
              {task.dependencies.map((dep) => (
                <ListItem key={dep}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LinkIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={dep}
                    sx={{ '& .MuiListItemText-primary': { color: 'rgba(255, 255, 255, 0.7)' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
            History
          </Typography>
          <List dense>
            {task.history.map((event, index) => (
              <ListItem key={index}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <HistoryIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </ListItemIcon>
                <ListItemText
                  primary={event.action}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {event.details}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        By {event.agent} ({Math.round(event.confidence * 100)}% confidence) • {formatDate(event.timestamp)}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    '& .MuiListItemText-primary': { color: 'rgba(255, 255, 255, 0.7)' },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {task.comments && task.comments.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
              Comments
            </Typography>
            <List dense>
              {task.comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CommentIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={comment.content}
                    secondary={
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        By {comment.author} • {formatDate(comment.timestamp)}
                      </Typography>
                    }
                    sx={{
                      '& .MuiListItemText-primary': { color: 'rgba(255, 255, 255, 0.7)' },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {task.attachments && task.attachments.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
              Attachments
            </Typography>
            <List dense>
              {task.attachments.map((attachment) => (
                <ListItem key={attachment.id}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AttachmentIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={attachment.name}
                    secondary={attachment.type}
                    sx={{
                      '& .MuiListItemText-primary': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiListItemText-secondary': { color: 'rgba(255, 255, 255, 0.5)' },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal; 