import React from 'react';
import { Stack, TextField, MenuItem, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FileDownload } from '@mui/icons-material';
import type { Dayjs } from 'dayjs';
import type { Filters } from '../types';
import { BaseCard, CardContent, GlassButton } from '../../../../components/shared/StyledComponents';

interface FilterSectionProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  filters: Filters;
  loading: boolean;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  onFiltersChange: (field: keyof Filters, value: string) => void;
  onExport: () => void;
}

const commonInputStyles = {
  '& .MuiInputBase-root': {
    fontSize: '0.875rem',
    background: 'rgba(13, 25, 41, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    height: '40px',
    '&:hover': {
      border: '1px solid rgba(0, 163, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
    },
    '&.Mui-focused': {
      border: '1px solid rgba(0, 163, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 163, 255, 0.2)',
    }
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.7)',
    transform: 'translate(14px, 11px) scale(1)',
    '&.Mui-focused, &.MuiFormLabel-filled': {
      transform: 'translate(14px, -9px) scale(0.75)',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiSelect-select': {
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  '& .MuiSvgIcon-root': {
    color: 'rgba(0, 163, 255, 0.8)',
    fontSize: '1.25rem'
  }
};

const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: 'rgba(13, 25, 41, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 1.5,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      '& .MuiMenuItem-root': {
        fontSize: '0.875rem',
        minHeight: '32px',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(0, 163, 255, 0.1)',
        },
        '&.Mui-selected': {
          bgcolor: 'rgba(0, 163, 255, 0.15)',
          '&:hover': {
            bgcolor: 'rgba(0, 163, 255, 0.2)',
          }
        }
      }
    }
  }
};

const FilterSection: React.FC<FilterSectionProps> = ({
  startDate,
  endDate,
  filters,
  loading,
  onStartDateChange,
  onEndDateChange,
  onFiltersChange,
  onExport,
}) => {
  return (
    <BaseCard>
      <CardContent>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
          <Box sx={{ display: 'flex', gap: 1.5, flexGrow: 1, flexWrap: 'wrap' }}>
            <DatePicker
              label="From Date"
              value={startDate}
              onChange={onStartDateChange}
              slotProps={{
                textField: {
                  size: "small",
                  sx: commonInputStyles
                },
              }}
            />
            <DatePicker
              label="To Date"
              value={endDate}
              onChange={onEndDateChange}
              slotProps={{
                textField: {
                  size: "small",
                  sx: commonInputStyles
                },
              }}
            />
            <TextField
              select
              label="Operation"
              size="small"
              value={filters.operation}
              onChange={(e) => onFiltersChange('operation', e.target.value)}
              sx={{ ...commonInputStyles, minWidth: 150 }}
              SelectProps={{ MenuProps: menuProps }}
            >
              <MenuItem value="">All Operations</MenuItem>
              <MenuItem value="INSERT">Insert</MenuItem>
              <MenuItem value="UPDATE">Update</MenuItem>
              <MenuItem value="DELETE">Delete</MenuItem>
            </TextField>
            <TextField
              select
              label="Status"
              size="small"
              value={filters.status}
              onChange={(e) => onFiltersChange('status', e.target.value)}
              sx={{ ...commonInputStyles, minWidth: 150 }}
              SelectProps={{ MenuProps: menuProps }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </TextField>
            <TextField
              select
              label="Severity"
              size="small"
              value={filters.severity}
              onChange={(e) => onFiltersChange('severity', e.target.value)}
              sx={{ ...commonInputStyles, minWidth: 150 }}
              SelectProps={{ MenuProps: menuProps }}
            >
              <MenuItem value="">All Severities</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </TextField>
          </Box>
          <GlassButton
            className="primary"
            size="large"
            startIcon={<FileDownload sx={{ fontSize: '1.25rem' }} />}
            onClick={onExport}
            disabled={loading}
            sx={{
              minWidth: '120px',
              height: '40px',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            Export
          </GlassButton>
        </Stack>
      </CardContent>
    </BaseCard>
  );
};

export default FilterSection;
