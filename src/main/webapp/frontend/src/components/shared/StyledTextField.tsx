import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const StyledTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          color: 'white',
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
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-focused': {
            color: '#00A3FF',
          }
        },
        '& .MuiInputBase-input': {
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
            opacity: 1,
          }
        },
        ...props.sx
      }}
    />
  );
};

export default StyledTextField;
