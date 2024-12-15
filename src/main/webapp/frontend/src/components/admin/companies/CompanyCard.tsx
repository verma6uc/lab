import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip,
  IconButton,
  Stack,
  Avatar,
  Tooltip,
  Grid,
  Divider,
} from '@mui/material';
import {
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Apps as ProductsIcon,
  Image as ScreenshotsIcon,
  Palette as BrandingIcon,
} from '@mui/icons-material';
import { Company } from '../../../types/company';

interface CompanyCardProps {
  company: Company;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const socialLinks = [
    { icon: <WebsiteIcon />, url: company.website, label: 'Website' },
    { icon: <LinkedInIcon />, url: company.linkedin_url, label: 'LinkedIn' },
    { icon: <TwitterIcon />, url: company.twitter_url, label: 'Twitter' },
    { icon: <GitHubIcon />, url: company.github_url, label: 'GitHub' },
  ].filter(link => link.url);

  const contactInfo = [
    { icon: <EmailIcon />, value: company.contact_email, label: 'Email' },
    { icon: <PhoneIcon />, value: company.contact_phone, label: 'Phone' },
    { icon: <LocationIcon />, value: company.contact_address, label: 'Address' },
  ].filter(info => info.value);

  const metrics = [
    { 
      icon: <ProductsIcon sx={{ color: '#00A3FF' }} />, 
      value: company.products_count,
      label: 'Products'
    },
    { 
      icon: <ScreenshotsIcon sx={{ color: '#2ecc71' }} />, 
      value: company.screenshots_count,
      label: 'Screenshots'
    },
    { 
      icon: <BrandingIcon sx={{ color: '#9b59b6' }} />, 
      value: company.branding ? 'Configured' : 'Not Set',
      label: 'Branding'
    },
  ];

  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      height: '100%',
      '&:hover': {
        border: '1px solid rgba(0, 163, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
        transform: 'translateY(-2px)',
      }
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={company.logo_url}
            sx={{ 
              width: 56, 
              height: 56,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              border: '1px solid rgba(0, 163, 255, 0.2)',
            }}
          >
            {company.name[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              {company.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
              <Chip 
                label={company.industry.charAt(0) + company.industry.slice(1).toLowerCase().replace('_', ' ')}
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                  color: '#00A3FF',
                  border: '1px solid rgba(0, 163, 255, 0.2)',
                }}
              />
              <Chip 
                label={company.status}
                size="small"
                sx={{
                  bgcolor: company.status === 'active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255, 99, 71, 0.1)',
                  color: company.status === 'active' ? '#2ecc71' : '#ff6347',
                  border: `1px solid ${company.status === 'active' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 99, 71, 0.2)'}`,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Edit Company">
            <IconButton 
              onClick={() => onEdit(company.id)}
              sx={{ 
                color: '#00A3FF',
                '&:hover': { bgcolor: 'rgba(0, 163, 255, 0.1)' }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={company.status === 'active' ? 'Deactivate' : 'Activate'}>
            <IconButton 
              onClick={() => onStatusChange(company.id)}
              sx={{ 
                color: company.status === 'active' ? '#ff9800' : '#2ecc71',
                '&:hover': { 
                  bgcolor: company.status === 'active' 
                    ? 'rgba(255, 152, 0, 0.1)' 
                    : 'rgba(46, 204, 113, 0.1)' 
                }
              }}
            >
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Company">
            <IconButton 
              onClick={() => onDelete(company.id)}
              sx={{ 
                color: '#ff6347',
                '&:hover': { bgcolor: 'rgba(255, 99, 71, 0.1)' }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Description */}
      {company.bio && (
        <Typography 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {company.bio}
        </Typography>
      )}

      {/* Metrics */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={4} key={index}>
            <Box sx={{ 
              p: 1.5,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}>
              {metric.icon}
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 500 }}>
                  {metric.value}
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
                  {metric.label}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <>
          <Divider sx={{ 
            my: 2,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }} />
          <Stack direction="row" spacing={1}>
            {socialLinks.map((link, index) => (
              <Tooltip key={index} title={link.label}>
                <IconButton
                  size="small"
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#00A3FF',
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                    }
                  }}
                >
                  {link.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </>
      )}

      {/* Contact Info */}
      {contactInfo.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Stack spacing={1}>
            {contactInfo.map((info, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                }}
              >
                {info.icon}
                <Typography sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {info.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Footer */}
      <Typography 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.75rem',
          mt: 2,
          textAlign: 'right',
        }}
      >
        Created {new Date(company.created_at).toLocaleDateString()}
      </Typography>
    </Paper>
  );
};

export default CompanyCard;
