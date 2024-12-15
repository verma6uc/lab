import React from 'react';
import {
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Schema as SchemaIcon,
  WebAsset as PageIcon,
  DataObject as DataIcon,
} from '@mui/icons-material';

interface BlueprintSidebarProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const BlueprintSidebar: React.FC<BlueprintSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Paper
      sx={{
        width: 280,
        bgcolor: 'rgba(13, 25, 41, 0.5)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '100%',
      }}
    >
      <List component="nav">
        <ListItemButton
          selected={activeTab === 0}
          onClick={() => onTabChange(0)}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(0, 163, 255, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <SchemaIcon sx={{ color: '#00A3FF' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Domain Model"
            secondary="Entities and relationships"
          />
        </ListItemButton>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <ListItemButton
          selected={activeTab === 1}
          onClick={() => onTabChange(1)}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(0, 163, 255, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <PageIcon sx={{ color: '#00A3FF' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Page Flow"
            secondary="Navigation and screens"
          />
        </ListItemButton>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <ListItemButton
          selected={activeTab === 2}
          onClick={() => onTabChange(2)}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(0, 163, 255, 0.1)',
            },
          }}
        >
          <ListItemIcon>
            <DataIcon sx={{ color: '#00A3FF' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Data Model"
            secondary="Database schema"
          />
        </ListItemButton>
      </List>
    </Paper>
  );
};

export default BlueprintSidebar; 