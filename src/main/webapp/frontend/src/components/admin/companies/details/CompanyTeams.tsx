import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Stack,
} from '@mui/material';
import {
  Group as TeamIcon,
  SupervisorAccount as LeaderIcon,
  Person as MemberIcon,
  Edit as EditIcon,
  Info as InfoIcon,
  Work as DepartmentIcon,
  Timeline as ProjectIcon,
} from '@mui/icons-material';
import { Company } from '../../../../types/company';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  projects: string[];
  isLeader: boolean;
}

// Mock data - In real app, this would come from the backend
const mockTeams = [
  {
    id: 1,
    name: 'Product Development',
    description: 'Core product development and engineering team',
    members: [
      {
        id: 1,
        name: 'John Doe',
        role: 'Technical Lead',
        department: 'Engineering',
        projects: ['Sales Dashboard', 'Mobile App'],
        isLeader: true,
      },
      {
        id: 2,
        name: 'Jane Smith',
        role: 'Senior Developer',
        department: 'Engineering',
        projects: ['Customer Portal'],
        isLeader: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Design Team',
    description: 'UI/UX design and brand identity team',
    members: [
      {
        id: 3,
        name: 'Alice Johnson',
        role: 'Design Lead',
        department: 'Design',
        projects: ['Brand Guidelines', 'UI Components'],
        isLeader: true,
      },
    ],
  },
];

interface CompanyTeamsProps {
  company: Company;
  onEditTeam?: (teamId: number) => void;
}

const CompanyTeams: React.FC<CompanyTeamsProps> = ({
  company,
  onEditTeam,
}) => {
  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TeamIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Teams & Structure
          </Typography>
          <Box
            sx={{
              ml: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              border: '1px solid rgba(0, 163, 255, 0.2)',
            }}
          >
            <Typography sx={{ color: '#00A3FF', fontSize: '0.875rem' }}>
              {mockTeams.length}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Team structure and organization within {company.name}
        </Typography>
      </Box>

      {/* Teams List */}
      {mockTeams.map((team, teamIndex) => (
        <Box
          key={team.id}
          sx={{
            mb: teamIndex < mockTeams.length - 1 ? 3 : 0,
          }}
        >
          <Box sx={{ 
            p: 2,
            mb: 2,
            borderRadius: 1,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography sx={{ color: 'white', fontWeight: 500 }}>
                    {team.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={`${team.members.length} members`}
                    sx={{
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                      border: '1px solid rgba(0, 163, 255, 0.2)',
                    }}
                  />
                </Box>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                  {team.description}
                </Typography>
              </Box>
              {onEditTeam && (
                <IconButton 
                  onClick={() => onEditTeam(team.id)}
                  sx={{ color: '#00A3FF' }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          </Box>

          <List>
            {team.members.map((member, memberIndex) => (
              <React.Fragment key={member.id}>
                <ListItem sx={{ px: 2 }}>
                  <ListItemIcon>
                    {member.isLeader ? (
                      <LeaderIcon sx={{ color: '#e74c3c' }} />
                    ) : (
                      <MemberIcon sx={{ color: '#3498db' }} />
                    )}
                  </ListItemIcon>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography sx={{ color: 'white', fontWeight: 500 }}>
                        {member.name}
                      </Typography>
                      <Chip
                        size="small"
                        label={member.role}
                        sx={{
                          bgcolor: member.isLeader ? 'rgba(231, 76, 60, 0.1)' : 'rgba(52, 152, 219, 0.1)',
                          color: member.isLeader ? '#e74c3c' : '#3498db',
                          border: `1px solid ${member.isLeader ? 'rgba(231, 76, 60, 0.2)' : 'rgba(52, 152, 219, 0.2)'}`,
                        }}
                      />
                    </Box>
                    <Stack direction="row" spacing={2} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DepartmentIcon sx={{ fontSize: '0.875rem' }} />
                        <Typography variant="body2">
                          {member.department}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ProjectIcon sx={{ fontSize: '0.875rem' }} />
                        <Typography variant="body2">
                          {member.projects.length} projects
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Tooltip title="View Member Details">
                    <IconButton sx={{ color: '#00A3FF' }}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                {memberIndex < team.members.length - 1 && (
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      ))}
    </Paper>
  );
};

export default CompanyTeams;
