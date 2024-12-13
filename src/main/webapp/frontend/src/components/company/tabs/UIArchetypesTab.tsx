import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { UIArchetype } from '../../../types/models';

interface UIArchetypesTabProps {
  uiArchetypes: UIArchetype[];
}

const UIArchetypesTab: React.FC<UIArchetypesTabProps> = ({ uiArchetypes }) => {
  if (!uiArchetypes.length) return <Typography>No UI archetypes available</Typography>;

  return (
    <Grid container spacing={3}>
      {uiArchetypes.map((archetype) => (
        <Grid item xs={12} sm={6} key={archetype.archetypeId}>
          <Card>
            <CardContent>
              <Typography variant="h6">{archetype.archetypeName || 'Unnamed Archetype'}</Typography>
              <Typography color="textSecondary">{archetype.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UIArchetypesTab; 