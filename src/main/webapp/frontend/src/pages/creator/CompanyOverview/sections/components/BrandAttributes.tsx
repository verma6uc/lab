import React from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
} from '@mui/icons-material';
import { Brand } from '../../../../../types/models';

interface BrandAttributesProps {
  brand: Brand;
  onEdit: () => void;
}

const BrandAttributes: React.FC<BrandAttributesProps> = ({ brand, onEdit }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          <PaletteIcon sx={{ fontSize: '1rem', mr: 1, verticalAlign: 'text-bottom' }} />
          Brand Attributes
        </Typography>
        <Tooltip title="Edit Brand Attributes">
          <IconButton 
            onClick={onEdit}
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.02)', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mb: 1 }}>
              Brand Colors
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {brand.colors?.split(',').map((color, index) => (
                <Box
                  key={color}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: color,
                    borderRadius: '4px',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.02)', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mb: 1 }}>
              Typography
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {brand.typography?.split(',').map((font, index) => (
                <Chip
                  key={font}
                  label={font.trim()}
                  size="small"
                  icon={<TextFieldsIcon sx={{ fontSize: '1rem' }} />}
                  sx={{
                    bgcolor: 'rgba(98, 0, 234, 0.1)',
                    color: '#6200EA',
                    fontFamily: font.trim(),
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BrandAttributes; 