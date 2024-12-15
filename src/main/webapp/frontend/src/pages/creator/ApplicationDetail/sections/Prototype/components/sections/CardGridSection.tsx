import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { SectionData } from '../../types.ts';

interface CardGridSectionProps {
  section: SectionData;
}

const CardGridSection: React.FC<CardGridSectionProps> = ({ section }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, itemId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  return (
    <Grid container spacing={3}>
      {section.config.items?.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-4px)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
          >
            {item.imageUrl && (
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.title}
              />
            )}
            
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, item.id)}
                  aria-label="settings"
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {item.description}
              </Typography>

              {item.tags && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {item.tags.map((tag: string) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </CardContent>

            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pb: 2 }}>
              <IconButton size="small" sx={{ mr: 1 }}>
                <FavoriteIcon />
              </IconButton>
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
              {item.status && (
                <Chip
                  label={item.status}
                  size="small"
                  color={
                    item.status === 'active' ? 'success' :
                    item.status === 'pending' ? 'warning' : 'error'
                  }
                  sx={{ ml: 'auto' }}
                />
              )}
            </Box>
          </Card>
        </Grid>
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
      </Menu>
    </Grid>
  );
};

export default CardGridSection; 