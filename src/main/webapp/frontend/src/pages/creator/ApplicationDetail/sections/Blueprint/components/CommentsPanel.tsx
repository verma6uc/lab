import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Drawer,
} from '@mui/material';
import { Comment, SelectedElement } from '../types';

interface CommentsPanelProps {
  open: boolean;
  onClose: () => void;
  selectedElement: SelectedElement | null;
  comments: Comment[];
  onAddComment: (content: string) => void;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({
  open,
  onClose,
  selectedElement,
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = React.useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  if (!selectedElement) return null;

  const elementComments = comments.filter(
    c => c.elementId === selectedElement.id && c.elementType === selectedElement.type
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          bgcolor: 'rgba(13, 25, 41, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'common.white', mb: 2 }}>
          Comments
        </Typography>

        <Box sx={{ mb: 3 }}>
          {elementComments.map(comment => (
            <Box
              key={comment.id}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                color: 'common.white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Add Comment
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CommentsPanel; 