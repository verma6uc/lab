import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { STAGES, STAGE_DETAILS } from './stages';

interface Application {
  id: number;
  name: string;
  description: string;
  stage: keyof typeof STAGES;
}

interface CompanyApplicationsProps {
  companyId: string;
  applications: Application[];
  onAddApplication: () => void;
  onEditApplication: (id: number) => void;
  onDeleteApplication: (id: number) => void;
}

const CompanyApplications: React.FC<CompanyApplicationsProps> = ({
  companyId,
  applications,
  onAddApplication,
  onEditApplication,
  onDeleteApplication,
}) => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<{ [key: number]: HTMLElement | null }>({});

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setMenuAnchor({ ...menuAnchor, [id]: event.currentTarget });
  };

  const handleCloseMenu = (id: number) => {
    setMenuAnchor({ ...menuAnchor, [id]: null });
  };

  const handleViewApplication = (id: number) => {
    navigate(`/admin/companies/${companyId}/applications/${id}`);
  };

  const handleEditApplication = (id: number) => {
    onEditApplication(id);
    handleCloseMenu(id);
  };

  const handleDeleteApplication = (id: number) => {
    onDeleteApplication(id);
    handleCloseMenu(id);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Applications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddApplication}
          sx={{
            bgcolor: '#00A3FF',
            '&:hover': {
              bgcolor: 'rgba(0, 163, 255, 0.8)',
            },
          }}
        >
          Add Application
        </Button>
      </Box>

      <Grid container spacing={3}>
        {applications.map((app) => {
          const stageDetails = STAGE_DETAILS[app.stage];
          const Icon = stageDetails.icon;

          return (
            <Grid item xs={12} sm={6} md={4} key={app.id}>
              <Card
                sx={{
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
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                      {app.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleOpenMenu(e, app.id)}
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      <MoreIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchor[app.id]}
                      open={Boolean(menuAnchor[app.id])}
                      onClose={() => handleCloseMenu(app.id)}
                    >
                      <MenuItem onClick={() => handleEditApplication(app.id)}>
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteApplication(app.id)}>
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: '40px',
                    }}
                  >
                    {app.description}
                  </Typography>

                  <Chip
                    icon={<Icon sx={{ fontSize: '1.2rem' }} />}
                    label={stageDetails.label}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                      '& .MuiChip-icon': {
                        color: '#00A3FF',
                      },
                    }}
                  />
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                  <Tooltip title="View Application">
                    <IconButton
                      size="small"
                      onClick={() => handleViewApplication(app.id)}
                      sx={{
                        color: '#00A3FF',
                        bgcolor: 'rgba(0, 163, 255, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(0, 163, 255, 0.2)',
                        },
                      }}
                    >
                      <LaunchIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CompanyApplications;
