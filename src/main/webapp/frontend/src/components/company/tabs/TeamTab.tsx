import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Groups as GroupsIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { Company } from '../../../types/models';

interface TeamTabProps {
  company: Company;
}

const TeamTab: React.FC<TeamTabProps> = ({ company }) => {
  // This is a placeholder structure - we'll need to update the data model
  // to include team information
  const teamMembers = company.team || [];

  return (
    <Box>
      <Box sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: 'white',
            mb: 2
          }}
        >
          <GroupsIcon sx={{ mr: 1, color: 'primary.main' }} /> Team Members
        </Typography>
        
        <Grid container spacing={3}>
          {teamMembers.length > 0 ? (
            teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  height: '100%'
                }}>
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 2,
                          border: '2px solid',
                          borderColor: 'primary.main'
                        }}
                      />
                      <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
                        {member.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 500,
                          mb: 1
                        }}
                      >
                        {member.role}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: '#8b96a2',
                          mb: 2,
                          fontSize: '0.875rem'
                        }}
                      >
                        {member.bio}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {member.linkedin && (
                          <Tooltip title="LinkedIn Profile">
                            <IconButton
                              size="small"
                              onClick={() => window.open(member.linkedin, '_blank')}
                              sx={{ 
                                color: 'primary.main',
                                '&:hover': { 
                                  bgcolor: 'rgba(255,255,255,0.05)'
                                }
                              }}
                            >
                              <LinkedInIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.twitter && (
                          <Tooltip title="Twitter Profile">
                            <IconButton
                              size="small"
                              onClick={() => window.open(member.twitter, '_blank')}
                              sx={{ 
                                color: 'primary.main',
                                '&:hover': { 
                                  bgcolor: 'rgba(255,255,255,0.05)'
                                }
                              }}
                            >
                              <TwitterIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.email && (
                          <Tooltip title="Send Email">
                            <IconButton
                              size="small"
                              onClick={() => window.location.href = `mailto:${member.email}`}
                              sx={{ 
                                color: 'primary.main',
                                '&:hover': { 
                                  bgcolor: 'rgba(255,255,255,0.05)'
                                }
                              }}
                            >
                              <EmailIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography sx={{ color: '#8b96a2' }}>
                No team members have been added for this company yet.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default TeamTab; 