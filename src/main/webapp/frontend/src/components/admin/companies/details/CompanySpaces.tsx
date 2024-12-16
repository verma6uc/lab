import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import SpaceNode from './spaces/SpaceNode';
import { CompanySpacesProps } from '../../../../types/company';

const CompanySpaces: React.FC<CompanySpacesProps> = ({
  spaces,
  onAddSpace,
  onEditSpace,
  onDeleteSpace,
}) => {
  // Build tree structure
  const buildSpaceTree = (spaceList: typeof spaces) => {
    const map = new Map();
    const tree: typeof spaces = [];

    spaceList.forEach(space => {
      map.set(space.id, { ...space, children: [] });
    });

    spaceList.forEach(space => {
      if (space.parent) {
        const parent = map.get(space.parent);
        if (parent) {
          parent.children.push(map.get(space.id));
        }
      } else {
        tree.push(map.get(space.id));
      }
    });

    return tree;
  };

  const spaceTree = buildSpaceTree(spaces);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Spaces
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddSpace}
          sx={{
            bgcolor: '#00A3FF',
            '&:hover': {
              bgcolor: 'rgba(0, 163, 255, 0.8)',
            },
          }}
        >
          Add Space
        </Button>
      </Box>

      <Grid container spacing={3}>
        {spaceTree.map((space) => (
          <Grid item xs={12} sm={6} md={4} key={space.id}>
            <SpaceNode
              space={space}
              onEdit={onEditSpace}
              onDelete={onDeleteSpace}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanySpaces;
