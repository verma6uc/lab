import React from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Language as WebsiteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { Company } from '../../../types/models';

interface OverviewTabProps {
  company: Company;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ company }) => {
  const contactInfo = [
    { icon: <WebsiteIcon />, label: 'Website', value: company.website, link: company.website },
    { icon: <EmailIcon />, label: 'Email', value: company.email, link: `mailto:${company.email}` },
    { icon: <PhoneIcon />, label: 'Phone', value: company.phone },
  ].filter(item => item.value);

  const socialProfiles = [
    { icon: <LinkedInIcon />, label: 'LinkedIn', value: 'View Profile', link: company.linkedinUrl },
    { icon: <TwitterIcon />, label: 'Twitter', value: 'View Profile', link: company.twitterUrl },
    { icon: <GitHubIcon />, label: 'GitHub', value: 'View Profile', link: company.githubUrl },
  ].filter(item => item.link);

  return (
    <Box>
      {company.description && (
        <Box sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'white',
              mb: 2
            }}
          >
            <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} /> About
          </Typography>
          <Typography 
            sx={{ 
              color: '#8b96a2',
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}
          >
            {company.description}
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            p: 3, 
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 2 }}>
              Contact Information
            </Typography>
            <List>
              {contactInfo.map((item, index) => (
                item.link ? (
                  <ListItemButton
                    key={index}
                    onClick={() => window.open(item.link, '_blank')}
                    sx={{ px: 0 }}
                  >
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item.value}
                      primaryTypographyProps={{ sx: { color: 'white' } }}
                      secondaryTypographyProps={{
                        sx: { color: 'primary.main' },
                      }}
                    />
                  </ListItemButton>
                ) : (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item.value}
                      primaryTypographyProps={{ sx: { color: 'white' } }}
                      secondaryTypographyProps={{
                        sx: { color: '#8b96a2' },
                      }}
                    />
                  </ListItem>
                )
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            p: 3, 
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 2 }}>
              Social Profiles
            </Typography>
            <List>
              {socialProfiles.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => window.open(item.link, '_blank')}
                  sx={{ px: 0 }}
                >
                  <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={item.value}
                    primaryTypographyProps={{ sx: { color: 'white' } }}
                    secondaryTypographyProps={{
                      sx: { color: 'primary.main' },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewTab; 