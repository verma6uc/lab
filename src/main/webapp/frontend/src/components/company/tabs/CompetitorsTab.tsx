import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Competitor } from '../../../types/models';

interface CompetitorsTabProps {
  competitors: Competitor[];
}

const CompetitorsTab: React.FC<CompetitorsTabProps> = ({ competitors }) => {
  if (!competitors.length) return <Typography>No competitors available</Typography>;

  return (
    <Grid container spacing={3}>
      {competitors.map((competitor) => (
        <Grid item xs={12} sm={6} key={competitor.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{competitor.name}</Typography>
              <Typography color="textSecondary">{competitor.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompetitorsTab; 