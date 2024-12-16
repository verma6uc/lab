import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import CommentSection from './CommentSection';
import { Comment } from '../types';

export interface EditableContentProps {
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
  renderContent?: (content: string) => React.ReactNode;
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
  renderContent,
}) => {
  const isEditing = editingField === field;

  return (
    <Box>
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="flex-start"
        sx={{
          position: 'relative',
          '&:hover .edit-button': {
            opacity: 1,
          },
        }}
      >
        {isEditing ? (
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              size="small"
              value={editValue}
              onChange={(e) => onEditValueChange(e.target.value)}
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
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <IconButton
                size="small"
                onClick={() => onSaveEdit(section, field)}
                disabled={isLoading}
                sx={{
                  color: '#00A3FF',
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 163, 255, 0.2)',
                  },
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={onCancelEdit}
                sx={{
                  color: '#f44336',
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(244, 67, 54, 0.2)',
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1 }}>
              {renderContent ? (
                renderContent(content)
              ) : (
                <Typography 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.6,
                  }}
                >
                  {content}
                </Typography>
              )}
            </Box>
            <IconButton
              className="edit-button"
              size="small"
              onClick={() => onStartEdit(field, content)}
              sx={{
                opacity: 0,
                color: 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#00A3FF',
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Stack>

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
