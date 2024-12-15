import React from 'react';
import { Box, Grid } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import PageContainer from '../../../components/admin/PageContainer';

// Import all section components
import CompanyIdentity from './sections/CompanyIdentity';
import CompanyBranding from './sections/CompanyBranding';
import ProductPortfolio from './sections/ProductPortfolio';

const CompanyOverview = () => {
  return (
    <PageContainer
      title="Company Overview"
      icon={<BusinessIcon />}
      maxWidth={false}
      disableGutters
      sx={{ px: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Company Identity Section */}
            <Grid item xs={12}>
              <CompanyIdentity />
            </Grid>

            {/* Company Branding Section */}
            <Grid item xs={12}>
              <CompanyBranding />
            </Grid>

            {/* Product Portfolio Section */}
            <Grid item xs={12}>
              <ProductPortfolio />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CompanyOverview; 