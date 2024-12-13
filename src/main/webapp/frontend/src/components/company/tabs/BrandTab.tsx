import React from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import { Brand } from '../../../types/models';

interface BrandTabProps {
  brand: Brand;
}

const hexToColorName = (hex: string) => {
  const colors: { [key: string]: string } = {
    '#FF5733': 'Red Orange',
    '#33FF57': 'Green',
    '#3357FF': 'Blue',
    // Add more mappings as needed
  };
  return colors[hex] || hex;
};

const BrandTab: React.FC<BrandTabProps> = ({ brand }) => {
  if (!brand) return <Typography>No brand information available</Typography>;

  return (
    <Box>
      <Typography variant="h6">Brand Colors</Typography>
      <Typography>Primary: {hexToColorName(brand.primaryColor)}</Typography>
      <Typography>Secondary: {hexToColorName(brand.secondaryColor)}</Typography>
    </Box>
  );
};

export default BrandTab; 