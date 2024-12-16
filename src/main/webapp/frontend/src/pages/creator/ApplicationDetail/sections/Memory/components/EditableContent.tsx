import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import CommentSection from './CommentSection';
import { Comment } from '../types';

interface EditableContentProps {
  content: string;
  elementId: string;
  section: string;
  field: string;
  comments: Comment[];
  expandedComments: string[];
  activeCommentElement: string | null;
  loadingComments: string[];
  editingField: string | null;
  editValue: string;
  isLoading: boolean;
  newComment: string;
  onStartEdit: (field: string, value: string) => void;
  onSaveEdit: (section: string, field: string) => void;
  onCancelEdit: () => void;
  onEditValueChange: (value: string) => void;
  onToggleComments: (elementId: string) => void;
  onOpenCommentsModal: (comments: Comment[]) => void;
  onSetActiveCommentElement: (elementId: string | null) => void;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (elementId: string, section: string) => void;
}

const EditableContent: React.FC<EditableContentProps> = ({
  content,
  elementId,
  section,
  field,
  comments,
  expandedComments,
  activeCommentElement,
  loadingComments,
  editingField,
  editValue,
  isLoading,
  newComment,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditValueChange,
  onToggleComments,
  onOpenCommentsModal,
  onSetActiveCommentElement,
  onCommentChange,
  onCommentSubmit,
}) => {
  const isEditing = editingField === elementId;

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          p: { xs: 1.5, sm: 2 },
          background: isEditing
            ? 'rgba(13, 25, 41, 0.7)'
            : 'transparent',
          backdropFilter: 'blur(20px)',
          borderRadius: 1,
          border: isEditing ? '1px solid rgba(0, 163, 255, 0.2)' : 'none',
          boxShadow: isEditing ? '0 8px 32px rgba(0, 163, 255, 0.1)' : 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            '& .edit-button': {
              opacity: 1,
            },
            background: isEditing ? 'rgba(13, 25, 41, 0.7)' : 'rgba(13, 25, 41, 0.3)',
          },
        }}
      >
        {isEditing ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              size="small"
              rows={3}
              placeholder="Enter your text..."
              value={editValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onEditValueChange(e.target.value)}
              autoFocus
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={() => onSaveEdit(section, field)}
                disabled={isLoading || !editValue.trim()}
                sx={{
                  color: '#00A3FF',
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: 'rgba(0, 163, 255, 0.2)',
                    transform: 'scale(1.05)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} thickness={4} sx={{ color: '#00A3FF' }} />
                ) : (
                  <CheckIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton
                size="small"
                onClick={onCancelEdit}
                disabled={isLoading}
                sx={{
                  color: 'error.main',
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: 'rgba(244, 67, 54, 0.2)',
                    transform: 'scale(1.05)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'common.white',
                flex: 1,
                minHeight: '24px',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}
            >
              {content}
            </Typography>
            <IconButton
              className="edit-button"
              size="small"
              onClick={() => onStartEdit(elementId, content)}
              sx={{
                opacity: 0,
                transition: 'all 0.3s ease',
                color: '#00A3FF',
                bgcolor: 'rgba(0, 163, 255, 0.1)',
                '&:hover': { 
                  bgcolor: 'rgba(0, 163, 255, 0.2)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      <CommentSection
        elementId={elementId}
        section={section}
        comments={comments}
        expandedComments={expandedComments}
        activeCommentElement={activeCommentElement}
        loadingComments={loadingComments}
        newComment={newComment}
        onToggleComments={onToggleComments}
        onOpenCommentsModal={onOpenCommentsModal}
        onSetActiveCommentElement={onSetActiveCommentElement}
        onCommentChange={onCommentChange}
        onCommentSubmit={onCommentSubmit}
      />
    </Box>
  );
};

export default EditableContent;
