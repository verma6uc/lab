import React from 'react';
import { FormControlLabel, Switch, FormControlLabelProps } from '@mui/material';

interface StyledSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
}

const StyledSwitch: React.FC<StyledSwitchProps> = ({
  label,
  checked,
  onChange,
  labelPlacement = 'end'
}) => {
  return (
    <FormControlLabel
      control={
        <Switch 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          sx={{
            '& .MuiSwitch-switchBase': {
              color: 'rgba(255, 255, 255, 0.3)',
              '&.Mui-checked': {
                color: '#00A3FF',
              },
            },
            '& .MuiSwitch-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'rgba(0, 163, 255, 0.5)',
            },
            '&:hover .MuiSwitch-switchBase': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
            '&:hover .MuiSwitch-switchBase.Mui-checked': {
              backgroundColor: 'rgba(0, 163, 255, 0.1)',
            },
          }}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
      sx={{
        color: 'rgba(255, 255, 255, 0.7)',
        '& .MuiTypography-root': {
          fontSize: '0.9375rem',
        },
        '&:hover': {
          '& .MuiTypography-root': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
        },
      }}
    />
  );
};

export default StyledSwitch;
