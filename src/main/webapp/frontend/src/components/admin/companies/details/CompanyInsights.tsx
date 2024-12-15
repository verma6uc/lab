import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  Psychology as InsightsIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  CompareArrows as CompareIcon,
  Hub as EmbeddingIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { Company } from '../../../../types/company';

interface CompanyInsightsProps {
  company: Company;
  onRefreshEmbeddings: () => void;
  onViewCompetitors: () => void;
}

interface CompetitorInsight {
  id: number;
  name: string;
  similarity: number;
  matchingAttributes: string[];
}

// Mock data - In real app, this would come from the backend
const mockCompetitors: CompetitorInsight[] = [
  {
    id: 1,
    name: 'TechRival Inc',
    similarity: 0.85,
    matchingAttributes: ['Industry', 'Product Category', 'Target Market'],
  },
  {
    id: 2,
    name: 'InnovateCorp',
    similarity: 0.72,
    matchingAttributes: ['Technology Stack', 'Company Size'],
  },
  {
    id: 3,
    name: 'FutureTech Solutions',
    similarity: 0.68,
    matchingAttributes: ['Geographic Focus', 'Business Model'],
  },
];

const CompanyInsights: React.FC<CompanyInsightsProps> = ({
  company,
  onRefreshEmbeddings,
  onViewCompetitors,
}) => {
  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InsightsIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            AI Insights & Analysis
          </Typography>
        </Box>
        <Tooltip title="Refresh Embeddings">
          <IconButton onClick={onRefreshEmbeddings} sx={{ color: '#00A3FF' }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {/* Embeddings Status */}
        <Grid item xs={12}>
          <Box sx={{ 
            p: 2,
            borderRadius: 1,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <EmbeddingIcon sx={{ color: '#00A3FF' }} />
              <Typography sx={{ color: 'white', fontWeight: 500 }}>
                Brand Embeddings
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <UpdateIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                Last updated {new Date().toLocaleDateString()}
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem', mb: 1 }}>
              Embedding Quality
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    height: 8,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#00A3FF',
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>
              <Typography sx={{ color: '#00A3FF', fontWeight: 500 }}>
                85%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Market Position */}
        <Grid item xs={12}>
          <Box sx={{ 
            p: 2,
            borderRadius: 1,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUpIcon sx={{ color: '#00A3FF' }} />
                <Typography sx={{ color: 'white', fontWeight: 500 }}>
                  Market Position Analysis
                </Typography>
              </Box>
              <Chip 
                label="AI Generated"
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                  color: '#00A3FF',
                  border: '1px solid rgba(0, 163, 255, 0.2)',
                }}
              />
            </Box>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
              Based on our analysis, {company.name} shows strong positioning in the {company.industry.toLowerCase()} sector,
              particularly in enterprise software solutions. The company's product portfolio aligns well with current market demands.
            </Typography>
          </Box>
        </Grid>

        {/* Competitor Analysis */}
        <Grid item xs={12}>
          <Box sx={{ 
            p: 2,
            borderRadius: 1,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CompareIcon sx={{ color: '#00A3FF' }} />
                <Typography sx={{ color: 'white', fontWeight: 500 }}>
                  Similar Companies
                </Typography>
              </Box>
              <Tooltip title="View Full Analysis">
                <IconButton onClick={onViewCompetitors} sx={{ color: '#00A3FF' }}>
                  <TrendingUpIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Stack spacing={2}>
              {mockCompetitors.map(competitor => (
                <Box key={competitor.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: 'white' }}>
                      {competitor.name}
                    </Typography>
                    <Typography sx={{ color: '#00A3FF', fontWeight: 500 }}>
                      {(competitor.similarity * 100).toFixed(0)}% Match
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {competitor.matchingAttributes.map((attr, index) => (
                      <Chip
                        key={index}
                        label={attr}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CompanyInsights;
