import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  Style as StyleIcon,
} from '@mui/icons-material';
import { Company } from '../../../../types/company';

interface BrandAttributesProps {
  company: Company;
  onEdit: () => void;
}

const BrandAttributes: React.FC<BrandAttributesProps> = ({ company, onEdit }) => {
  const { branding } = company;

  if (!branding) {
    return (
      <Paper sx={{ 
        p: 3,
        bgcolor: 'rgba(10, 25, 41, 0.7)',
        borderRadius: 2,
        border: '1px solid rgba(0, 163, 255, 0.1)',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Brand Attributes
          </Typography>
          <Tooltip title="Configure Branding">
            <IconButton onClick={onEdit} sx={{ color: '#00A3FF' }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          No branding configured yet. Click edit to set up brand attributes.
        </Typography>
      </Paper>
    );
  }

  const brandElements = [
    {
      icon: <PaletteIcon />,
      label: 'Primary Color',
      value: branding.primary_color,
      preview: true,
    },
    {
      icon: <PaletteIcon />,
      label: 'Secondary Color',
      value: branding.secondary_color,
      preview: true,
    },
    {
      icon: <TextFieldsIcon />,
      label: 'Font Family',
      value: branding.font_family,
      preview: false,
    },
  ].filter(element => element.value);

  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StyleIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Brand Attributes
          </Typography>
        </Box>
        <Tooltip title="Edit Branding">
          <IconButton onClick={onEdit} sx={{ color: '#00A3FF' }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Stack spacing={3}>
        {brandElements.map((element, index) => (
          <Box key={index}>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', mb: 1 }}>
              {element.label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {element.preview && (
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1,
                    bgcolor: element.value,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }} 
                />
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {React.cloneElement(element.icon, { 
                  sx: { color: element.preview ? element.value : '#00A3FF' } 
                })}
                <Typography sx={{ 
                  color: 'white',
                  fontFamily: element.label === 'Font Family' ? element.value : 'inherit',
                }}>
                  {element.value}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>

      {company.ui_archetype && (
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', mb: 1 }}>
            UI Archetype
          </Typography>
          <Typography sx={{ color: 'white' }}>
            {company.ui_archetype}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default BrandAttributes;
