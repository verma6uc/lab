import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface StyledButtonProps extends ButtonProps {
  buttonType: 'primary' | 'secondary';
}

const StyledButton = React.forwardRef<HTMLButtonElement, StyledButtonProps>(
  ({ buttonType, children, sx, ...props }, ref) => {
    const getButtonStyles = () => {
      const baseStyles = {
        textTransform: 'none' as const,
        fontWeight: 500,
        borderRadius: '8px',
        px: 3,
        py: 1,
      };

      if (buttonType === 'primary') {
        return {
          ...baseStyles,
          bgcolor: '#00A3FF',
          color: 'white',
          border: '1px solid transparent',
          '&:hover': {
            bgcolor: 'rgba(0, 163, 255, 0.8)',
          },
          ...sx,
        };
      }

      return {
        ...baseStyles,
        bgcolor: 'transparent',
        color: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
        ...sx,
      };
    };

    return (
      <Button ref={ref} sx={getButtonStyles()} {...props}>
        {children}
      </Button>
    );
  }
);

StyledButton.displayName = 'StyledButton';

export default StyledButton;
