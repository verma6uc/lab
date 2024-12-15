import React, { useState } from 'react';
import { 
  Box, 
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import StyledTextField from '../../shared/StyledTextField';
import StyledSelect from '../../shared/StyledSelect';
import StyledButton from '../../shared/StyledButton';

// From database enum type company_industry
const INDUSTRIES = [
  'TECHNOLOGY',
  'HEALTHCARE',
  'FINANCE',
  'RETAIL',
  'MANUFACTURING',
  'EDUCATION',
  'ENTERTAINMENT',
  'REAL_ESTATE',
  'ENERGY',
  'TRANSPORTATION',
  'CONSULTING',
  'TELECOMMUNICATIONS',
  'AGRICULTURE',
  'CONSTRUCTION',
  'HOSPITALITY',
  'MEDIA',
  'AUTOMOTIVE',
  'AEROSPACE',
  'BIOTECHNOLOGY',
  'OTHER',
];

const SIZE_RANGES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1001+', label: '1001+ employees' },
];

interface Filters {
  industry?: string;
  size?: string;
  status?: 'active' | 'inactive';
  hasProducts?: boolean;
  hasBranding?: boolean;
  sortBy: string;
}

interface CompanyFiltersProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Filters) => void;
  activeFilters: Filters;
}

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ 
  onSearch, 
  onFilterChange,
  activeFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFilterChange({
      ...activeFilters,
      [key]: value,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      sortBy: 'name',
    });
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).filter(key => {
      return key !== 'sortBy' && activeFilters[key as keyof Filters] !== undefined;
    }).length;
  };

  return (
    <Paper sx={{ 
      p: 3,
      mb: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      <Grid container spacing={3}>
        {/* Search and Filter Toggle */}
        <Grid item xs={12} md={8}>
          <StyledTextField
            fullWidth
            placeholder="Search companies by name, industry, or contact info..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    onClick={() => handleSearch('')}
                    sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <StyledSelect
              label="Sort By"
              value={activeFilters.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
              options={[
                { value: 'name', label: 'Company Name' },
                { value: 'created', label: 'Creation Date' },
                { value: 'size', label: 'Company Size' },
                { value: 'industry', label: 'Industry' },
              ]}
            />
            <Tooltip title="Toggle Filters">
              <StyledButton
                buttonType={showFilters ? 'primary' : 'secondary'}
                onClick={() => setShowFilters(!showFilters)}
                startIcon={<FilterListIcon />}
              >
                Filters
                {getActiveFilterCount() > 0 && (
                  <Chip
                    label={getActiveFilterCount()}
                    size="small"
                    sx={{
                      ml: 1,
                      height: 20,
                      minWidth: 20,
                      bgcolor: showFilters ? 'white' : 'rgba(0, 163, 255, 0.2)',
                      color: showFilters ? '#00A3FF' : 'white',
                    }}
                  />
                )}
              </StyledButton>
            </Tooltip>
          </Box>
        </Grid>

        {/* Filter Options */}
        {showFilters && (
          <>
            <Grid item xs={12} md={3}>
              <StyledSelect
                label="Industry"
                value={activeFilters.industry || ''}
                onChange={(value) => handleFilterChange('industry', value)}
                options={[
                  { value: '', label: 'All Industries' },
                  ...INDUSTRIES.map(industry => ({
                    value: industry,
                    label: industry.charAt(0) + industry.slice(1).toLowerCase().replace('_', ' '),
                  }))
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledSelect
                label="Company Size"
                value={activeFilters.size || ''}
                onChange={(value) => handleFilterChange('size', value)}
                options={[
                  { value: '', label: 'All Sizes' },
                  ...SIZE_RANGES.map(range => ({
                    value: range.value,
                    label: range.label,
                  }))
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledSelect
                label="Status"
                value={activeFilters.status || ''}
                onChange={(value) => handleFilterChange('status', value)}
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <StyledButton
                  buttonType="secondary"
                  onClick={handleClearFilters}
                  disabled={getActiveFilterCount() === 0}
                >
                  Clear Filters
                </StyledButton>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default CompanyFilters;
