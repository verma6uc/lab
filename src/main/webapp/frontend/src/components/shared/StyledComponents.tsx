import { styled } from '@mui/material/styles';
import { Typography, Box, Button, SvgIcon } from '@mui/material';

export const TestTubeIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M7,2V4H8V18A4,4 0 0,0 12,22A4,4 0 0,0 16,18V4H17V2H7M11,16C10.4,16 10,15.6 10,15C10,14.4 10.4,14 11,14C11.6,14 12,14.4 12,15C12,15.6 11.6,16 11,16M13,12C12.4,12 12,11.6 12,11C12,10.4 12.4,10 13,10C13.6,10 14,10.4 14,11C14,11.6 13.6,12 13,12M14,7H10V4H14V7Z" />
  </SvgIcon>
);

export const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00A3FF 0%, #0066FF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

// Base card component that ensures equal height
export const BaseCard = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(13, 25, 41, 0.5)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    border: '1px solid rgba(0, 163, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
    transform: 'translateY(-4px)',
  },
}));

// Card content wrapper to maintain consistent padding
export const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const FeatureCard = styled(BaseCard)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'scale(1.1)',
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: 'rgba(0, 163, 255, 0.1)',
  color: '#00A3FF',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 163, 255, 0.2)',
    transform: 'scale(1.05)',
  },
}));

export const GlassButton = styled(Button)(({ theme }) => ({
  background: 'rgba(0, 163, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(0, 163, 255, 0.3)',
  color: '#00A3FF',
  padding: '6px 20px',
  height: '32px',
  borderRadius: '16px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '0.3px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(0, 163, 255, 0.15)',
    border: '1px solid rgba(0, 163, 255, 0.5)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 163, 255, 0.15)',
  },
  '&.primary': {
    background: 'rgba(0, 163, 255, 0.15)',
    border: '1px solid rgba(0, 163, 255, 0.5)',
    color: '#00A3FF',
    '&:hover': {
      background: 'rgba(0, 163, 255, 0.2)',
      border: '1px solid rgba(0, 163, 255, 0.6)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 163, 255, 0.2)',
    },
  },
  '&.secondary': {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
  },
})); 