import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface FilterOption {
  value: string;
  label: string;
}

interface PageContainerProps {
  icon?: React.ReactNode;
  title: string;
  onSearch?: (value: string) => void;
  onFilter?: (value: string) => void;
  onAdd?: () => void;
  addButtonLabel?: string;
  filterOptions?: FilterOption[];
  searchPlaceholder?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  icon,
  title,
  onSearch,
  onFilter,
  onAdd,
  addButtonLabel = 'Add New',
  filterOptions = [],
  searchPlaceholder = 'Search...',
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFilterClick = (value: string) => {
    if (onFilter) {
      onFilter(value);
      setAnchorEl(null);
    }
  };

  return (
    <Box component="div">
      {/* Header Section with full-width glass effect */}
      <Box 
        component="div"
        sx={{ 
          width: '100%',
          bgcolor: 'rgba(10, 25, 41, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0, 163, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          mb: 1,
          py: 1,
          mt: 0,
        }}
      >
        <Box
          sx={{ 
            width: '100%',
            px: 1, // 8px padding
          }}
        >
          <Box 
            component="div"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box 
              component="div"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 // 8px gap
              }}
            >
              {icon && (
                <Box 
                  component="div"
                  sx={{ 
                    color: '#00A3FF',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.5rem',
                    '& > svg': {
                      fontSize: 'inherit',
                      strokeWidth: 1,
                      stroke: 'currentColor'
                    },
                  }}
                >
                  {icon}
                </Box>
              )}
              <Typography 
                component="div"
                variant="h4" 
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  fontSize: '1.5rem'
                }}
              >
                {title}
              </Typography>
            </Box>

            <Box 
              component="div"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, // 8px gap
              }}
            >
              {onSearch && (
                <TextField
                  size="small"
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#00A3FF', fontSize: '1.25rem' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: 250,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(10, 25, 41, 0.75)',
                      backdropFilter: 'blur(16px)',
                      borderRadius: 1.5,
                      border: '1px solid rgba(0, 163, 255, 0.1)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        border: '1px solid rgba(0, 163, 255, 0.2)',
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white',
                      fontSize: '0.875rem',
                    },
                  }}
                />
              )}

              {onFilter && (
                <>
                  <IconButton 
                    size="small"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{ 
                      color: '#00A3FF',
                      bgcolor: 'rgba(10, 25, 41, 0.75)',
                      border: '1px solid rgba(0, 163, 255, 0.1)',
                      p: 1,
                      '&:hover': {
                        bgcolor: 'rgba(10, 25, 41, 0.85)',
                        border: '1px solid rgba(0, 163, 255, 0.2)',
                      },
                    }}
                  >
                    <FilterIcon sx={{ fontSize: '1.25rem' }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        width: '500px',
                        maxHeight: '400px',
                        bgcolor: 'rgba(10, 25, 41, 0.95)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(0, 163, 255, 0.1)',
                        borderRadius: 1.5,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                        overflowY: 'auto',
                      },
                    }}
                  >
                    <Grid container spacing={0}>
                      {filterOptions.map((option) => (
                        <Grid item xs={4} key={option.value}>
                          <MenuItem 
                            onClick={() => handleFilterClick(option.value)}
                            sx={{
                              color: 'white',
                              justifyContent: 'center',
                              minHeight: '40px',
                              fontSize: '0.875rem',
                              borderRight: '1px solid rgba(0, 163, 255, 0.1)',
                              borderBottom: '1px solid rgba(0, 163, 255, 0.1)',
                              '&:hover': {
                                bgcolor: 'rgba(0, 163, 255, 0.1)',
                              },
                            }}
                          >
                            {option.label}
                          </MenuItem>
                        </Grid>
                      ))}
                    </Grid>
                  </Menu>
                </>
              )}

              {onAdd && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon sx={{ fontSize: '1.25rem' }} />}
                  onClick={onAdd}
                  sx={{
                    bgcolor: 'rgba(0, 163, 255, 0.15)',
                    border: '1px solid rgba(0, 163, 255, 0.5)',
                    color: '#00A3FF',
                    px: 2,
                    py: 1,
                    borderRadius: 1.5,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(0, 163, 255, 0.25)',
                      border: '1px solid rgba(0, 163, 255, 0.6)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 20px rgba(0, 163, 255, 0.2)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {addButtonLabel}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        sx={{ 
          width: '100%',
          px: 1, // 8px padding
          pb: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer;
