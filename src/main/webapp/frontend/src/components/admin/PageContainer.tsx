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
  Container,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface PageContainerProps {
  icon?: React.ReactNode;
  title: string;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onAdd?: () => void;
  addButtonLabel?: string;
  filterOptions?: string[];
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

  return (
    <Box sx={{ mt: -4 }}>
      {/* Header Section with full-width glass effect */}
      <Box 
        sx={{ 
          width: '100%',
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          mb: 4,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {icon && (
                <Box 
                  sx={{ 
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '2rem', // Make icon bigger
                    '& > svg': {
                      fontSize: 'inherit',
                    },
                  }}
                >
                  {icon}
                </Box>
              )}
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Box>

            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                '& > *': { // Add hover effect to all children
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            >
              {onSearch && (
                <TextField
                  size="medium" // Make search box bigger
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      },
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white',
                    },
                  }}
                />
              )}

              {onFilter && (
                <>
                  <IconButton 
                    size="large" // Make filter button bigger
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{ 
                      color: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      p: 2,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    <FilterIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      sx: {
                        mt: 2,
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      },
                    }}
                  >
                    {filterOptions.map((option) => (
                      <MenuItem 
                        key={option}
                        onClick={() => {
                          onFilter();
                          setAnchorEl(null);
                        }}
                        sx={{
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {onAdd && (
                <Button
                  variant="contained"
                  size="large" // Make button bigger
                  startIcon={<AddIcon />}
                  onClick={onAdd}
                  sx={{
                    bgcolor: 'primary.main',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {addButtonLabel}
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="xl">
        <Box sx={{ pb: 4 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default PageContainer; 