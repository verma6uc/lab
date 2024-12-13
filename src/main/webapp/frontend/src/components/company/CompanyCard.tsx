import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  useTheme,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Business as BusinessIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { Company } from '../../types/models';

interface CompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onView: (company: Company) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onEdit, onView }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0A1929',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.25)',
        },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        position: 'relative', 
        p: 3,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2
      }}>
        <Avatar
          sx={{
            height: '48px',
            width: '48px',
            bgcolor: 'primary.main',
            color: 'white',
            fontSize: '1.5rem'
          }}
        >
          {company.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              color: 'white',
              fontWeight: 500,
              mb: 0.5
            }}
          >
            {company.name}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Tooltip title="Company Type" arrow>
              <Chip
                icon={<BusinessIcon sx={{ fontSize: '1rem !important' }} />}
                label={company.type}
                size="small"
                sx={{
                  bgcolor: 'rgba(124, 58, 237, 0.1)',
                  color: '#8b96a2',
                  '& .MuiChip-icon': {
                    color: 'primary.main',
                  },
                  height: '24px',
                  '& .MuiChip-label': {
                    px: 1,
                    fontSize: '0.75rem',
                  }
                }}
              />
            </Tooltip>
            <Tooltip title="Industry Sector" arrow>
              <Chip
                icon={<CategoryIcon sx={{ fontSize: '1rem !important' }} />}
                label={company.industry}
                size="small"
                sx={{
                  bgcolor: 'rgba(124, 58, 237, 0.1)',
                  color: '#8b96a2',
                  '& .MuiChip-icon': {
                    color: 'primary.main',
                  },
                  height: '24px',
                  '& .MuiChip-label': {
                    px: 1,
                    fontSize: '0.75rem',
                  }
                }}
              />
            </Tooltip>
          </Box>

          <Typography 
            variant="body2" 
            sx={{
              color: '#8b96a2',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
              lineHeight: 1.6
            }}
          >
            {company.description || 'No description available'}
          </Typography>
        </Box>
      </Box>

      <Box 
        sx={{ 
          mt: 'auto',
          p: 2,
          pt: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          {company.website && (
            <Tooltip title="Visit Website" arrow>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#8b96a2',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open(company.website, '_blank')}
              >
                <WebsiteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {company.linkedinUrl && (
            <Tooltip title="LinkedIn Profile" arrow>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#8b96a2',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open(company.linkedinUrl, '_blank')}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {company.twitterUrl && (
            <Tooltip title="Twitter Profile" arrow>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#8b96a2',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open(company.twitterUrl, '_blank')}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {company.githubUrl && (
            <Tooltip title="GitHub Profile" arrow>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#8b96a2',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open(company.githubUrl, '_blank')}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Button
          variant="text"
          size="small"
          sx={{ 
            color: 'primary.main',
            '&:hover': { 
              bgcolor: 'rgba(124, 58, 237, 0.08)'
            }
          }}
          onClick={() => onView(company)}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default CompanyCard; 