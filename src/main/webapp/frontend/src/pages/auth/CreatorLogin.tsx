import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Create as CreateIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GradientText, BaseCard } from '../../components/shared/StyledComponents';
import { authService } from '../../services/auth';

interface CreatorLoginForm {
  email: string;
  password: string;
  inviteCode?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  inviteCode?: string;
}

const CreatorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreatorLoginForm>({
    email: '',
    password: '',
    inviteCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Invite code validation (optional)
    if (formData.inviteCode && formData.inviteCode.length < 6) {
      newErrors.inviteCode = 'Invalid invite code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await authService.creatorLogin(formData);
      navigate('/creator/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1A237E 0%, #311B92 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <BaseCard>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <CreateIcon 
                sx={{ 
                  fontSize: 48, 
                  mb: 2,
                  background: 'linear-gradient(45deg, #6200EA 30%, #651FFF 90%)',
                  borderRadius: '50%',
                  p: 1,
                  color: 'white',
                }} 
              />
              <GradientText variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                Creator Login
              </GradientText>
              <Typography variant="body1" color="text.secondary">
                Sign in to your creator account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Invite Code (Optional)"
              name="inviteCode"
              value={formData.inviteCode}
              onChange={handleChange}
              error={!!errors.inviteCode}
              helperText={errors.inviteCode}
              placeholder="Enter your invite code"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mt: 2,
                height: 48,
                background: 'linear-gradient(45deg, #6200EA 30%, #651FFF 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #651FFF 30%, #6200EA 90%)',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In as Creator'
              )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have a creator account?{' '}
                <Button
                  color="primary"
                  onClick={() => navigate('/creator/register')}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Apply Now
                </Button>
              </Typography>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none' }}
              >
                Sign in as User
              </Button>
            </Box>
          </Box>
        </BaseCard>
      </Container>
    </Box>
  );
};

export default CreatorLogin; 