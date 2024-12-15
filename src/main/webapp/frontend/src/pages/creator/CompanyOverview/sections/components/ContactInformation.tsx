import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { Company } from '../../../../../types/models';

interface ContactInformationProps {
  company: Company;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  href?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, href }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
    {icon}
    <Box>
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: 'common.white' }}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#6200EA', textDecoration: 'none' }}>
            {value}
          </a>
        ) : (
          value || 'Not specified'
        )}
      </Typography>
    </Box>
  </Box>
);

const ContactInformation: React.FC<ContactInformationProps> = ({ company }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
          Contact Information
        </Typography>
        <Stack spacing={2}>
          <InfoItem 
            icon={<EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
            label="Email"
            value={company.email}
          />
          <InfoItem 
            icon={<PhoneIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
            label="Phone"
            value={company.phone}
          />
          <InfoItem 
            icon={<LocationIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
            label="Location"
            value={company.location}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
          Online Presence
        </Typography>
        <Stack spacing={2}>
          <InfoItem 
            icon={<LanguageIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
            label="Website"
            value={company.website}
            href={company.website}
          />
          <InfoItem 
            icon={<LinkedInIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
            label="LinkedIn"
            value={company.linkedinUrl}
            href={company.linkedinUrl}
          />
          <InfoItem 
            icon={<TwitterIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
            label="Twitter"
            value={company.twitterUrl}
            href={company.twitterUrl}
          />
          <InfoItem 
            icon={<GitHubIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
            label="GitHub"
            value={company.githubUrl}
            href={company.githubUrl}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ContactInformation; 