import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import StyledButton from '../../../shared/StyledButton';

interface ApplicationEditModalProps {
  open: boolean;
  onClose: () => void;
  application?: {
    id: number;
    name: string;
    description: string;
  };
  onSave: (id: number, data: { name: string; description: string }) => void;
}

const ApplicationEditModal: React.FC<ApplicationEditModalProps> = ({
  open,
  onClose,
  application,
  onSave,
}) => {
  const [name, setName] = useState(application?.name || '');
  const [description, setDescription] = useState(application?.description || '');
  const [descriptionError, setDescriptionError] = useState('');

  const handleSave = () => {
    if (!application) return;

    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount < 100 || wordCount > 300) {
      setDescriptionError('Description must be between 100-300 words');
      return;
    }

    onSave(application.id, {
      name,
      description,
    });
    onClose();
  };

  const handleClose = () => {
    setName(application?.name || '');
    setDescription(application?.description || '');
    setDescriptionError('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 163, 255, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ color: 'white' }}>
        Edit Application
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Application Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00A3FF',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Description (100-300 words)"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError('');
            }}
            error={!!descriptionError}
            helperText={descriptionError || `${description.trim().split(/\s+/).length} words`}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00A3FF',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiFormHelperText-root': {
                color: descriptionError ? '#ff6347' : 'rgba(255, 255, 255, 0.5)',
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <StyledButton buttonType="secondary" onClick={handleClose}>
          Cancel
        </StyledButton>
        <StyledButton buttonType="primary" onClick={handleSave}>
          Save Changes
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationEditModal;
