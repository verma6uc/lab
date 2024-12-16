import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Assessment as AnalyticsIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import StyledButton from '../../../shared/StyledButton';
import { Company } from '../../../../types/company';

interface CompanyOverviewProps {
  company: Company;
  onEdit: () => void;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ company, onEdit }) => {
  const contactInfo = [
    { icon: <EmailIcon />, value: company.contact_email, label: 'Email' },
    { icon: <PhoneIcon />, value: company.contact_phone, label: 'Phone' },
    { icon: <LocationIcon />, value: company.contact_address, label: 'Address' },
  ].filter(info => info.value);

  return (
    <Box sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header with Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar 
            src={company.logo_url}
            sx={{ 
              width: 80, 
              height: 80,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              border: '1px solid rgba(0, 163, 255, 0.2)',
            }}
          >
            {company.name[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
              {company.name}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
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
              {company.type && (
                <Chip 
                  label={company.type}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                />
              )}
            </Stack>
          </Box>
        </Box>

        <Stack direction="row" spacing={2}>
          <StyledButton
            buttonType="secondary"
            startIcon={<AnalyticsIcon />}
            onClick={() => {/* Handle analytics */}}
          >
            View Analytics
          </StyledButton>
          <StyledButton
            buttonType="primary"
            startIcon={<EditIcon />}
            onClick={onEdit}
          >
            Edit Company
          </StyledButton>
        </Stack>
      </Box>

      {/* Description */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
          Overview
        </Typography>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
          {company.bio}
        </Typography>
        {company.description && (
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {company.description}
          </Typography>
        )}
      </Box>

      {/* Contact Information */}
      <Box sx={{ flex: 1 }}>
        {contactInfo.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Contact Information
            </Typography>
            <Stack spacing={2}>
              {contactInfo.map((info, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: 'rgba(0, 163, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.cloneElement(info.icon as React.ReactElement, { sx: { color: '#00A3FF' } })}
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
                      {info.label}
                    </Typography>
                    <Typography sx={{ color: 'white' }}>
                      {info.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Founded Date */}
      <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.875rem',
          }}
        >
          Created {new Date(company.created_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanyOverview;
