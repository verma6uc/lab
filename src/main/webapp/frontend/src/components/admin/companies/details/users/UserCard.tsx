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
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { UserCardProps, UserRole } from '../../../../../types/user';

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case UserRole.CREATOR:
      return {
        color: '#00A3FF',
        bgColor: 'rgba(0, 163, 255, 0.1)',
      };
    case UserRole.ADMIN:
      return {
        color: '#FF4842',
        bgColor: 'rgba(255, 72, 66, 0.1)',
      };
    default:
      return {
        color: '#54D62C',
        bgColor: 'rgba(84, 214, 44, 0.1)',
      };
  }
};

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(user.id);
    handleCloseMenu();
  };

  const handleDelete = () => {
    onDelete(user.id);
    handleCloseMenu();
  };

  const roleColors = getRoleColor(user.role);

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - then.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;
    
    return `${Math.floor(diffInMonths / 12)}y ago`;
  };

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
          <Avatar
            src={user.avatar_url}
            alt={user.name}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {user.email}
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip
            label={user.role}
            size="small"
            sx={{
              bgcolor: roleColors.bgColor,
              color: roleColors.color,
              borderRadius: 1,
            }}
          />
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {user.designation}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {user.department}
          </Typography>
          <Tooltip title={new Date(user.lastActive).toLocaleString()}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {formatTimeAgo(user.lastActive)}
            </Typography>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
