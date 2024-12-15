import { Typography, TypographyProps, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GradientText = styled(Typography)<TypographyProps>({
  background: 'linear-gradient(135deg, #00A3FF 0%, #0057FF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
});

export const BaseCard = styled(Box)({
  background: 'rgba(10, 25, 41, 0.7)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '1px solid rgba(0, 163, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
  },
});

export const CardContent = styled(Box)({
  padding: '24px',
});

export const GlassButton = styled(Button)({
  background: 'rgba(0, 163, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 163, 255, 0.3)',
  color: '#00A3FF',
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(0, 163, 255, 0.2)',
    borderColor: 'rgba(0, 163, 255, 0.5)',
    transform: 'translateY(-2px)',
  },
});
