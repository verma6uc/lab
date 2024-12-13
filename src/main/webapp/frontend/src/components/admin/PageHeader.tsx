import React from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Search, FilterAlt } from '@mui/icons-material';

interface PageHeaderProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  onFilterClick?: () => void;
  showFilters?: boolean;
  activeFilters?: number;
  onClearFilters?: () => void;
  chips?: Array<{
    label: string;
    onDelete: () => void;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  searchPlaceholder = 'Search...',
  onSearchChange,
  searchValue = '',
  onFilterClick,
  showFilters = true,
  activeFilters = 0,
  onClearFilters,
  chips,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
        mb: 3,
      }}>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 1,
          }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          mb: chips && chips.length > 0 ? 2 : 0,
        }}
      >
        {onSearchChange && (
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ 
              width: 300,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              },
            }}
          />
        )}
        
        {showFilters && onFilterClick && (
          <Button
            variant="outlined"
            startIcon={<FilterAlt />}
            onClick={onFilterClick}
            color={activeFilters > 0 ? 'primary' : 'inherit'}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Filters {activeFilters > 0 && `(${activeFilters})`}
          </Button>
        )}

        {activeFilters > 0 && onClearFilters && (
          <Button
            variant="outlined"
            color="error"
            onClick={onClearFilters}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                borderColor: 'error.main',
              },
            }}
          >
            Clear Filters
          </Button>
        )}
      </Stack>

      {chips && chips.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip.label}
              onDelete={chip.onDelete}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                '& .MuiChip-deleteIcon': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.9)',
                  },
                },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default PageHeader; 