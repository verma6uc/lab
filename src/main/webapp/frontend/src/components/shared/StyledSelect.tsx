import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface StyledSelectProps extends Omit<SelectProps, 'onChange'> {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const StyledSelect: React.FC<StyledSelectProps> = ({ 
  label, 
  options, 
  value, 
  onChange,
  ...props 
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-focused': {
            color: '#00A3FF',
          }
        }}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as string)}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 163, 255, 0.3)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 163, 255, 0.5)',
          },
          '.MuiSvgIcon-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: 'rgba(10, 25, 41, 0.95)',
              border: '1px solid rgba(0, 163, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              '.MuiMenuItem-root': {
                color: 'rgba(255, 255, 255, 0.85)',
                '&:hover': {
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                },
                '&.Mui-selected': {
                  bgcolor: 'rgba(0, 163, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 163, 255, 0.25)',
                  }
                }
              }
            }
          }
        }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StyledSelect;
