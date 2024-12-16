import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
  Grid,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { spaceTypeConfig } from './SpaceTypeConfig';
import { Space, SpaceNodeProps, SpaceType } from '../../../../../types/space';

const SpaceNode: React.FC<SpaceNodeProps> = ({ space, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(space.id);
    handleCloseMenu();
  };

  const handleDelete = () => {
    onDelete(space.id);
    handleCloseMenu();
  };

  const config = spaceTypeConfig[space.type];
  const Icon = config.icon;
  const typeColor = config.color;

  return (
    <Card sx={{
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s ease',
      '&:hover': {
        border: '1px solid rgba(0, 163, 255, 0.2)',
        boxShadow: '0 4px 24px rgba(0, 163, 255, 0.1)',
        transform: 'translateY(-2px)',
      },
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              {space.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {space.description}
            </Typography>
          </Box>
          <IconButton onClick={handleOpenMenu} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon sx={{ color: typeColor }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {config.label}
              </Typography>
            </Box>
          </Grid>

          {space.attributes && (
            <>
              {space.attributes.member_count !== undefined && (
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Members
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {space.attributes.member_count}
                  </Typography>
                </Grid>
              )}
              {space.attributes.location && (
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {space.attributes.location}
                  </Typography>
                </Grid>
              )}
              {space.attributes.manager && (
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Manager
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {space.attributes.manager}
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>

        {space.children && space.children.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 1, display: 'block' }}>
              Sub-spaces
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {space.children.map((child) => {
                const ChildIcon = spaceTypeConfig[child.type].icon;
                return (
                  <Chip
                    key={child.id}
                    label={child.name}
                    size="small"
                    icon={<ChildIcon />}
                    sx={{
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      '& .MuiChip-icon': {
                        color: spaceTypeConfig[child.type].color,
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SpaceNode;
