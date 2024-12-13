import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ResearchItem } from '../../../types/models';

interface ResearchTabProps {
  research: ResearchItem[];
}

const ResearchTab: React.FC<ResearchTabProps> = ({ research }) => {
  if (!research.length) return <Typography>No research available</Typography>;

  return (
    <Grid container spacing={3}>
      {research.map((item) => (
        <Grid item xs={12} sm={6} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography color="textSecondary">{item.description}</Typography>
              <Box mt={2}>
                <Typography variant="body2">Type: {item.type}</Typography>
                <Typography variant="body2">Authors: {item.authors}</Typography>
                <Typography variant="body2">Published: {new Date(item.publishedDate).toLocaleDateString()}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResearchTab; 