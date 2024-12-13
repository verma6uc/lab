import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  IconButton,
  AvatarGroup,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projectCount: number;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Team',
    description: 'Web application development and UI/UX implementation',
    members: [
      { id: '1', name: 'John Smith' },
      { id: '2', name: 'Sarah Johnson' },
      { id: '3', name: 'Michael Chen' },
      { id: '4', name: 'Emma Wilson' },
    ],
    projectCount: 5,
  },
  {
    id: '2',
    name: 'Backend Team',
    description: 'API development and server infrastructure',
    members: [
      { id: '5', name: 'David Lee' },
      { id: '6', name: 'Lisa Anderson' },
      { id: '7', name: 'James Taylor' },
    ],
    projectCount: 3,
  },
  {
    id: '3',
    name: 'DevOps Team',
    description: 'CI/CD pipeline and cloud infrastructure management',
    members: [
      { id: '8', name: 'Robert Martin' },
      { id: '9', name: 'Emily Brown' },
    ],
    projectCount: 4,
  },
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const TeamsTab = () => {
  return (
    <Grid container spacing={2}>
      {mockTeams.map((team) => (
        <Grid item xs={12} key={team.id}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                    }}
                  >
                    <PeopleIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                      {team.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {team.description}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AvatarGroup 
                      max={4}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: 24,
                          height: 24,
                          fontSize: '0.75rem',
                          borderColor: 'transparent',
                        },
                      }}
                    >
                      {team.members.map((member) => (
                        <Avatar
                          key={member.id}
                          src={member.avatar}
                          sx={{
                            bgcolor: 'primary.main',
                          }}
                        >
                          {getInitials(member.name)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    <Typography variant="body2" color="text.secondary">
                      {team.members.length} members
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AssignmentIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {team.projectCount} projects
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'rgba(0, 163, 255, 0.1)' },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: 'error.main',
                    '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamsTab; 