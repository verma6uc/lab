import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Divider,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Apps as AppsIcon,
  Edit as EditIcon,
  OpenInNew as OpenInNewIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ArrowBack as ArrowBackIcon,
  Memory as MemoryIcon,
  Architecture as BlueprintIcon,
  Visibility as VisualIcon,
  Build as PrototypeIcon,
  Code as DevelopmentIcon,
  Rocket as LaunchIcon,
} from '@mui/icons-material';
import { Product } from '../../../../../types/models';
import { useParams, Link as RouterLink } from 'react-router-dom';

interface ApplicationsOverviewProps {
  products: Product[];
  onAddProduct: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return { bg: 'rgba(76, 175, 80, 0.1)', text: '#4caf50', border: '#4caf50' };
    case 'beta':
      return { bg: 'rgba(255, 152, 0, 0.1)', text: '#ff9800', border: '#ff9800' };
    case 'deprecated':
      return { bg: 'rgba(244, 67, 54, 0.1)', text: '#f44336', border: '#f44336' };
    default:
      return { bg: 'rgba(158, 158, 158, 0.1)', text: '#9e9e9e', border: '#9e9e9e' };
  }
};

const getStageIcon = (stage: string) => {
  switch (stage) {
    case 'MEMORY':
      return <MemoryIcon fontSize="small" />;
    case 'BLUEPRINT':
      return <BlueprintIcon fontSize="small" />;
    case 'VISUAL_PRD':
      return <VisualIcon fontSize="small" />;
    case 'PROTOTYPE':
      return <PrototypeIcon fontSize="small" />;
    case 'DEVELOPMENT':
      return <DevelopmentIcon fontSize="small" />;
    case 'LAUNCH':
      return <LaunchIcon fontSize="small" />;
    default:
      return null;
  }
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'MEMORY':
      return '#2196F3';
    case 'BLUEPRINT':
      return '#9C27B0';
    case 'VISUAL_PRD':
      return '#FF9800';
    case 'PROTOTYPE':
      return '#00BCD4';
    case 'DEVELOPMENT':
      return '#4CAF50';
    case 'LAUNCH':
      return '#F44336';
    default:
      return '#919EAB';
  }
};

const ApplicationsOverview: React.FC<ApplicationsOverviewProps> = ({ products, onAddProduct }) => {
  const { companyId } = useParams();
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleStageFilter = (stage: string | null) => {
    setSelectedStage(stage);
    handleFilterClose();
  };

  const filteredProducts = selectedStage
    ? products.filter(product => 
        Object.entries(product.stages || {}).some(([stage, progress]) => 
          stage === selectedStage && progress > 0
        )
      )
    : products;

  const stageCounts = products.reduce((acc, product) => {
    Object.entries(product.stages || {}).forEach(([stage, progress]) => {
      if (progress > 0) {
        acc[stage] = (acc[stage] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ color: 'common.white', display: 'flex', alignItems: 'center', gap: 1 }}>
              <AppsIcon />
              Applications ({filteredProducts.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Filter by stage">
                <IconButton
                  size="small"
                  onClick={handleFilterClick}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sort applications">
                <IconButton
                  size="small"
                  onClick={handleSortClick}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <SortIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={onAddProduct}
            sx={{
              bgcolor: 'rgba(98, 0, 234, 0.1)',
              color: '#6200EA',
              '&:hover': {
                bgcolor: 'rgba(98, 0, 234, 0.2)',
              },
            }}
          >
            New Application
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
            Stage Overview
          </Typography>
          <Grid container spacing={1}>
            {Object.entries(stageCounts).map(([stage, count]) => (
              <Grid item key={stage}>
                <Chip
                  icon={getStageIcon(stage)}
                  label={`${stage.replace(/_/g, ' ')} (${count})`}
                  onClick={() => handleStageFilter(stage)}
                  sx={{
                    bgcolor: selectedStage === stage ? `${getStageColor(stage)}30` : 'rgba(255, 255, 255, 0.05)',
                    color: getStageColor(stage),
                    border: `1px solid ${getStageColor(stage)}40`,
                    '&:hover': {
                      bgcolor: `${getStageColor(stage)}20`,
                    },
                  }}
                />
              </Grid>
            ))}
            {selectedStage && (
              <Grid item>
                <Chip
                  icon={<ArrowBackIcon />}
                  label="Show All"
                  onClick={() => handleStageFilter(null)}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

        <Grid container spacing={2}>
          {filteredProducts.map((product) => {
            const statusColor = getStatusColor(product.status || '');
            const launchDateStr = product.launchDate ? new Date(product.launchDate).toLocaleDateString() : 'TBD';
            
            return (
              <Grid item xs={12} key={product.id}>
                <Box
                  component={RouterLink}
                  to={`/creator/companies/${companyId}/applications/${product.id}`}
                  sx={{
                    p: 2,
                    display: 'block',
                    textDecoration: 'none',
                    bgcolor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 1,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                      transform: 'translateY(-1px)',
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'common.white', mb: 0.5 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          size="small"
                          label={product.type}
                          sx={{
                            bgcolor: 'rgba(98, 0, 234, 0.1)',
                            color: '#6200EA',
                          }}
                        />
                        <Chip
                          size="small"
                          label={product.status}
                          sx={{
                            bgcolor: statusColor.bg,
                            color: statusColor.text,
                            borderColor: statusColor.border,
                          }}
                        />
                        <Chip
                          size="small"
                          label={`Launch: ${launchDateStr}`}
                          variant="outlined"
                          sx={{
                            borderColor: 'rgba(255, 255, 255, 0.12)',
                            color: 'rgba(255, 255, 255, 0.7)',
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Edit Application">
                        <IconButton
                          size="small"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Open Application">
                        <IconButton
                          size="small"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                          }}
                          href={product.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', mb: 1 }}>
                      Development Progress
                    </Typography>
                    <Grid container spacing={1}>
                      {Object.entries(product.stages || {}).map(([stage, progress]) => (
                        <Grid item xs={12} sm={6} md={4} key={stage}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 120, gap: 1 }}>
                              {getStageIcon(stage)}
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                {stage.replace(/_/g, ' ')}
                              </Typography>
                            </Box>
                            <Box sx={{ flex: 1, mx: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={progress as number}
                                sx={{
                                  height: 4,
                                  borderRadius: 2,
                                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 2,
                                    bgcolor: getStageColor(stage),
                                  },
                                }}
                              />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                {progress}%
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    {product.documentationUrl && (
                      <Typography 
                        variant="body2" 
                        component="a"
                        href={product.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          textDecoration: 'none',
                          '&:hover': { color: '#6200EA' },
                        }}
                      >
                        Documentation
                      </Typography>
                    )}
                    {product.apiUrl && (
                      <Typography 
                        variant="body2"
                        component="a"
                        href={product.apiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          textDecoration: 'none',
                          '&:hover': { color: '#6200EA' },
                        }}
                      >
                        API Reference
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              bgcolor: 'rgba(18, 18, 18, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <MenuItem onClick={() => handleStageFilter(null)} sx={{ color: 'common.white' }}>
            All Stages
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
          {Object.keys(stageCounts).map((stage) => (
            <MenuItem
              key={stage}
              onClick={() => handleStageFilter(stage)}
              sx={{
                color: getStageColor(stage),
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {getStageIcon(stage)}
              {stage.replace(/_/g, ' ')}
            </MenuItem>
          ))}
        </Menu>

        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
          PaperProps={{
            sx: {
              bgcolor: 'rgba(18, 18, 18, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <MenuItem onClick={handleSortClose} sx={{ color: 'common.white' }}>
            Latest Updated
          </MenuItem>
          <MenuItem onClick={handleSortClose} sx={{ color: 'common.white' }}>
            Name (A-Z)
          </MenuItem>
          <MenuItem onClick={handleSortClose} sx={{ color: 'common.white' }}>
            Stage Progress
          </MenuItem>
          <MenuItem onClick={handleSortClose} sx={{ color: 'common.white' }}>
            Launch Date
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ApplicationsOverview; 