import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { FeedbackData, ValidationResponse } from '../types';
import { getValidationResponse } from '../mockData/index';

interface FeedbackDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedSection: { id: string; title: string } | null;
  onSubmit: (feedback: FeedbackData, validation: ValidationResponse) => void;
}

const FeedbackDrawer: React.FC<FeedbackDrawerProps> = ({
  open,
  onClose,
  selectedSection,
  onSubmit,
}) => {
  const [comment, setComment] = useState('');
  const [validation, setValidation] = useState<ValidationResponse | null>(null);

  const handleSubmit = () => {
    if (!selectedSection || !comment.trim()) return;

    const validation = getValidationResponse(selectedSection.id, comment);
    setValidation(validation);

    if (validation.isValid) {
      const newFeedback: FeedbackData = {
        id: `feedback-${Date.now()}`,
        elementId: selectedSection.id,
        comment: comment.trim(),
        timestamp: new Date().toISOString(),
        position: { x: 0, y: 0 }, // Position will be set by parent
        status: 'pending'
      };
      onSubmit(newFeedback, validation);
    }
  };

  const handleClose = () => {
    setComment('');
    setValidation(null);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          p: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Add Feedback
          {selectedSection && (
            <Typography variant="subtitle2" color="text.secondary">
              {selectedSection.title}
            </Typography>
          )}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        multiline
        rows={4}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your feedback here..."
        variant="outlined"
        sx={{ mb: 2 }}
      />

      {validation && (
        <Alert 
          severity={validation.isValid ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {validation.message}
        </Alert>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={!comment.trim() || !selectedSection}
      >
        Submit Feedback
      </Button>
    </Drawer>
  );
};

export default FeedbackDrawer; 