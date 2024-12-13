import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  IconButton,
  Link,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Article as ArticleIcon,
  Link as LinkIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface Research {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'whitepaper' | 'case-study';
  date: string;
  link: string;
}

const mockResearch: Research[] = [
  {
    id: '1',
    title: 'Cloud Migration Strategy',
    description: 'A comprehensive study on enterprise cloud migration patterns and best practices',
    type: 'whitepaper',
    date: '2024-01-15',
    link: 'https://example.com/research/cloud-migration',
  },
  {
    id: '2',
    title: 'AI Implementation Case Study',
    description: 'How TechCorp implemented AI solutions across various industries',
    type: 'case-study',
    date: '2024-02-01',
    link: 'https://example.com/research/ai-case-study',
  },
  {
    id: '3',
    title: 'Future of DevOps',
    description: 'Analysis of emerging trends in DevOps and CI/CD practices',
    type: 'article',
    date: '2024-02-15',
    link: 'https://example.com/research/devops-future',
  },
];

const ResearchTab = () => {
  return (
    <Grid container spacing={2}>
      {mockResearch.map((research) => (
        <Grid item xs={12} key={research.id}>
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
                    <ArticleIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                      {research.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {research.description}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(research.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Link
                    href={research.link}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <LinkIcon sx={{ fontSize: '0.9rem' }} />
                    <Typography variant="body2">View Research</Typography>
                  </Link>
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

export default ResearchTab; 